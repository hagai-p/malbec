"""Rearrange the hero photo: Buenos Aires left, sea and sunset in the middle, Tel Aviv right.
Imported by make-hero.py. Tunable constants at the top."""
import numpy as np
from PIL import Image, ImageFilter

X0 = 744         # where the Tel Aviv slice starts (its bay faces the centre from here)
GLOW = 430       # how far the sunset glow spreads left from the join
Y0 = 404         # bottom of the rearranged band (top of the foreground foliage)
FEATHER_Y = 16

def _smooth_rows(a, sigma):
    img = Image.fromarray(np.clip(a * 64, 0, 255).astype(np.uint8)[:, None, :].repeat(3, axis=1))
    return np.asarray(img.filter(ImageFilter.GaussianBlur(sigma))).astype(np.float32)[:, 1, :] / 64

def rearrange(src: Image.Image) -> Image.Image:
    W, H = src.size
    O = np.asarray(src).astype(np.float32)
    M = O[:, ::-1].copy()                # mirrored: Buenos Aires left, Tel Aviv right, sun far right
    w = W - X0
    xx = np.arange(W, dtype=np.float32)[None, :]
    yy = np.arange(H, dtype=np.float32)[:, None]

    # 1. Let the sunset glow spread left of the join: per-row colour gain that matches the mirrored
    #    side to the Tel Aviv slice at the join and fades out over GLOW pixels.
    t_edge = O[:, 0:28].mean(axis=1)                    # colour of the Tel Aviv slice at its inner edge
    m_edge = M[:, X0 - 28:X0].mean(axis=1) + 1e-3
    gain = _smooth_rows(np.clip(t_edge / m_edge, 0.7, 3.2), 14)          # (H, 3)
    ramp = np.clip((xx - (X0 - GLOW)) / GLOW, 0, 1)
    ramp = ramp ** 2.2                                                     # mostly near the join
    band = np.clip(((Y0 - 30) - yy) / 60, 0, 1)                            # fade the effect out above the foliage
    g = 1 + (gain[:, None, :] - 1) * (ramp * band)[..., None]
    L = np.clip(M * g, 0, 255)
    # a soft additive bloom around the sun so the join reads as light, not as an edge
    sun_y = 318
    bloom = np.exp(-(((xx - X0) / 210) ** 2 + ((yy - sun_y) / 120) ** 2)) * band
    L = np.clip(L + bloom[..., None] * np.array([70, 44, 12]), 0, 255)

    # 2. Tel Aviv slice, un-mirrored. In the sky it cross-fades in over a wide band (clouds are
    #    forgiving); at the water it meets the land along a curved shoreline with a strip of sand.
    R = L.copy()
    R[:, X0:] = O[:, :w]
    REACH = 190
    ext = L.copy()
    ext[:, X0:X0 + REACH] = L[:, X0 - 1:X0 - REACH - 1:-1]        # land/sky continued to the right
    SEA_TOP = 344
    sky = np.clip((SEA_TOP - yy) / 14, 0, 1)                       # 1 in the sky, 0 at the water
    depth = np.clip((Y0 - yy) / (Y0 - SEA_TOP), 0, 1)              # 1 at the horizon, 0 at the foliage
    shore = X0 + 8 + 86 * depth ** 1.4                             # shoreline recedes up and to the right
    centre = sky * (X0 + 60) + (1 - sky) * shore
    width = sky * 170 + (1 - sky) * 7
    ax = np.clip((xx - (centre - width / 2)) / width, 0, 1)
    ax = ax * ax * (3 - 2 * ax)
    blend = ext * (1 - ax[..., None]) + R * ax[..., None]
    sand = np.exp(-((xx - shore) / 3.2) ** 2) * (1 - sky) * np.clip((yy - SEA_TOP) / 6, 0, 1)
    blend = blend * (1 - 0.8 * sand[..., None]) + np.array([226, 182, 128]) * 0.8 * sand[..., None]

    # 3. keep the mirrored foreground below the band
    ay = np.clip(((Y0 + FEATHER_Y / 2) - yy) / FEATHER_Y, 0, 1)[..., None]
    out = M * (1 - ay) + blend * ay
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))

if __name__ == "__main__":
    import sys
    rearrange(Image.open("assets/hero.png").convert("RGB")).save(sys.argv[1], quality=92)

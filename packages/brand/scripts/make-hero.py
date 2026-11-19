"""Paint oranges into the Tel Aviv (left) side of the hero photo and deepen the Malbec grapes
on the Buenos Aires (right) side.  Usage: python3 make-hero.py   (run from packages/brand)

The original photo (assets/hero.png) is never modified. Adjust ORANGES below and re-run.
Requires Pillow and numpy.
"""
import numpy as np
from PIL import Image, ImageFilter

SRC = "assets/hero.png"
OUT = ["assets/hero-orange-grape.jpg", "../../apps/web/public/brand/hero-orange-grape.jpg"]
rng = np.random.default_rng(11)

# (x, y, radius) in source pixels: clusters in front, then fruit receding up the left-hand rows.
ORANGES = [
    (182, 606, 23), (226, 590, 24), (206, 640, 25), (254, 630, 23), (176, 676, 23), (228, 690, 25), (276, 672, 22),
    (300, 626, 21), (204, 734, 23), (258, 730, 22), (306, 706, 20), (150, 640, 20),
    (48, 600, 21), (92, 628, 23), (42, 652, 21), (90, 680, 22), (24, 706, 20), (128, 716, 20),
    (352, 596, 19), (392, 622, 20), (350, 644, 18), (404, 590, 18), (440, 600, 17), (470, 632, 17), (430, 650, 16),
    (318, 524, 15), (372, 506, 14), (120, 524, 17), (72, 490, 15), (176, 492, 14), (250, 514, 15), (214, 536, 14),
    (430, 516, 12), (486, 530, 12), (520, 490, 10), (556, 506, 9), (470, 472, 9), (540, 460, 8),
    (584, 472, 7), (606, 450, 6), (150, 450, 11), (228, 456, 10), (300, 466, 10), (372, 450, 8), (430, 444, 7),
    (36, 540, 14), (10, 480, 12), (500, 566, 13), (540, 540, 10),
]

def smooth_noise(shape, sigma, seed):
    n = np.random.default_rng(seed).random(shape).astype(np.float32)
    img = Image.fromarray((n * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(sigma))
    a = np.asarray(img).astype(np.float32)
    return (a - a.min()) / (a.max() - a.min() + 1e-6)

def main():
    src = Image.open(SRC).convert("RGB")
    W, H = src.size
    S = np.asarray(src).astype(np.float32) / 255.0
    out = S.copy()
    hsv = np.asarray(src.convert("HSV")).astype(np.float32)
    hue, sat, val = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)

    # ---- right side: deepen the Malbec grapes (purple-blue, foreground only)
    purple = ((hue > 150) & (hue < 220) & (sat > 55)).astype(np.float32)
    right = purple * (xx > 700) * (yy > 520)
    right = np.asarray(Image.fromarray((right * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))).astype(np.float32) / 255
    g = out.mean(axis=2, keepdims=True)
    rich = np.clip(g + (out - g) * 1.6, 0, 1) * 0.88 + np.array([0.36, 0.07, 0.30]) * 0.12
    out = out * (1 - right[..., None]) + rich * right[..., None]

    # ---- left side: turn the existing grape bunches into shaded foliage so no purple shows through
    left = purple * (xx < 680) * (yy > 420)
    left = np.asarray(Image.fromarray((left * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(3))).astype(np.float32) / 255
    # blur first so the bunch shape disappears, then recolour as leaves in shade
    soft = np.asarray(Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(7))).astype(np.float32) / 255
    lum = soft.mean(axis=2, keepdims=True)
    mottle = smooth_noise((H, W), 5, 9)[..., None]
    foliage = np.clip(lum * np.array([0.52, 0.74, 0.26]) * (0.78 + 0.5 * mottle) + np.array([0.03, 0.05, 0.01]), 0, 1)
    out = out * (1 - left[..., None]) + foliage * left[..., None]

    # ---- oranges: lit spheres, light from the low sun at upper-left
    Lv = np.array([-0.62, -0.50, 0.60]); Lv /= np.linalg.norm(Lv)
    peel = smooth_noise((H, W), 0.7, 3)
    occl = np.zeros((H, W), np.float32)      # soft shadows cast on leaves and on neighbouring fruit
    alpha = np.zeros((H, W), np.float32)
    col = np.zeros((H, W, 3), np.float32)
    for (cx, cy, r) in sorted(ORANGES, key=lambda o: o[2]):   # far first, near on top
        d2 = (xx - (cx + r * 0.35)) ** 2 + (yy - (cy + r * 0.45)) ** 2
        occl = np.maximum(occl, np.exp(-d2 / (2 * (r * 0.95) ** 2)) * 0.55)
    for (cx, cy, r) in sorted(ORANGES, key=lambda o: o[2]):
        dx, dy = (xx - cx) / r, (yy - cy) / r
        rr = dx * dx + dy * dy
        inside = rr <= 1.0
        nz = np.sqrt(np.clip(1 - rr, 0, 1))
        diff = np.clip(dx * Lv[0] + dy * Lv[1] + nz * Lv[2], 0, 1)
        hx, hy, hz = Lv[0], Lv[1], Lv[2] + 1.0
        hn = np.sqrt(hx * hx + hy * hy + hz * hz)
        spec = np.clip((dx * hx + dy * hy + nz * hz) / hn, 0, 1) ** 14
        hue_shift = rng.uniform(-0.035, 0.035)
        base = np.array([1.0, 0.49 + hue_shift * 1.6, 0.07])
        shade = 0.50 + 0.62 * diff ** 0.85
        # bounce light from the leaves on the underside, sky tint on the shadow side
        bounce = np.clip(dy, 0, 1)[..., None] * np.array([0.03, 0.07, 0.01])
        c = base * shade[..., None] + bounce + spec[..., None] * np.array([1.0, 0.92, 0.78]) * 0.20
        c *= (0.93 + 0.14 * peel)[..., None]                    # peel texture
        c *= (1 - 0.28 * np.clip(rr, 0, 1) ** 3)[..., None]     # edge falloff
        # receding fruit: slightly hazier and softer
        haze = np.clip((26 - r) / 26, 0, 1) * 0.22
        c = c * (1 - haze) + np.array([0.80, 0.52, 0.34]) * haze
        a = np.clip((1.0 - np.sqrt(rr)) * r / 1.2, 0, 1) * inside   # anti-aliased edge
        # this fruit hides the shadow field beneath it, then receives shadow from later (nearer) fruit
        col = col * (1 - a[..., None]) + c * a[..., None]
        alpha = np.maximum(alpha * (1 - a) + a, alpha)
    # shadows on the photo (only where there is no fruit), and gentle occlusion between fruit
    out = out * (1 - (occl * (1 - alpha))[..., None] * 0.75)
    col = col * (1 - 0.30 * occl[..., None] * (1 - np.clip(alpha, 0, 1))[..., None])

    # ---- tuck fruit behind real leaves: lit leaf pixels from the photo come back over the fruit in patches
    leaf = ((hue > 28) & (hue < 95) & (val > 120) & (sat > 70)).astype(np.float32)
    leaf = np.asarray(Image.fromarray((leaf * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32) / 255
    patch = smooth_noise((H, W), 14, 5)
    patch = np.clip((patch - 0.50) * 7, 0, 1)                   # ~half of the area lets leaves overlap
    cover = np.clip(leaf * 1.5, 0, 1) * patch
    a_final = alpha * (1 - cover * 0.92)

    # match the photo's softness
    A = Image.fromarray((np.clip(a_final, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    C = Image.fromarray((np.clip(col, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5))
    base_img = Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))
    base_img.paste(C, (0, 0), A)

    # light grain so painted and photographed areas share a surface
    arr = np.asarray(base_img).astype(np.float32)
    arr += (np.random.default_rng(2).normal(0, 2.2, arr.shape[:2])[..., None]).astype(np.float32)
    final = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    for p in OUT:
        final.save(p, quality=88, optimize=True)
    print("wrote", OUT, final.size)

if __name__ == "__main__":
    main()

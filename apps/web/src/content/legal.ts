type LegalDoc = { title: string; sections: { heading: string; body: string[] }[] };

/** DRAFT wording, to be reviewed and finalised by Hagai as counsel before launch. */
export const legal: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy notice",
    sections: [
      {
        heading: "Who we are",
        body: ["This website is operated by Malbec Ventures. You can reach us at hagai@malbec.ventures."],
      },
      {
        heading: "What we collect",
        body: [
          "When you send us a message or tell us about your company, we collect the details you choose to give us: your name, email address, organisation and the content of your message.",
          "We collect basic, aggregated usage information about visits to this site in order to keep it working and improve it.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your details to reply to you, to evaluate investment opportunities you share with us, and to keep a record of our correspondence. We do not sell personal information.",
          "We share information with service providers who host this site and store its data on our behalf, and where the law requires it.",
        ],
      },
      {
        heading: "Your choices",
        body: ["You can ask us to show you, correct or delete the personal information we hold about you by writing to the address above."],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    sections: [
      {
        heading: "Information only",
        body: [
          "The content of this website is provided for general information. It is not investment, legal or tax advice, and you should not rely on it when making any decision.",
        ],
      },
      {
        heading: "No offer",
        body: [
          "Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security or any interest in any fund managed or advised by Malbec Ventures. Any such offer will be made only to qualified investors, only by means of confidential offering documents, and only in jurisdictions where it is lawful.",
        ],
      },
      {
        heading: "Portfolio companies",
        body: [
          "References to portfolio companies are for illustration and are not a recommendation of any company or security. Past performance is not a guide to future results.",
        ],
      },
      {
        heading: "Intellectual property",
        body: ["The content and design of this website belong to Malbec Ventures or its licensors. Company names and logos belong to their respective owners."],
      },
    ],
  },
};

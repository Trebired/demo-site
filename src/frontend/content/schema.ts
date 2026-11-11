import { cmsCollection, cmsField, defineContent } from "@trebired/frontend/cms";

const content = defineContent({
    fields: {
      "home.title": cmsField.text({ label: { cs: "Nadpis", en: "Title" }, maxLength: 80, required: true }),
      "home.lead": cmsField.richText({ label: { cs: "Úvod", en: "Introduction" }, marks: ["bold", "italic", "link"] }),
      "home.photo": cmsField.image({ aspect: 16 / 9, label: { cs: "Fotografie", en: "Photo" } }),
      "home.cta": cmsField.link({ label: { cs: "Tlačítko", en: "Button" } }),
      "about.body": cmsField.richText({ label: { cs: "O nás", en: "About us" }, marks: ["bold", "italic", "link", "list"] }),
      "footer.note": cmsField.text({ label: { cs: "Patička", en: "Footer" }, maxLength: 160 }),
    },
    collections: {
      posts: cmsCollection({
          label: { cs: "Články", en: "Posts" },
          max: 50,
          slugFrom: "title",
          fields: {
            title: cmsField.text({ label: { cs: "Název", en: "Title" }, maxLength: 120, required: true }),
            date: cmsField.date({ label: { cs: "Datum", en: "Date" } }),
            summary: cmsField.text({ label: { cs: "Shrnutí", en: "Summary" }, maxLength: 300, multiline: true }),
            body: cmsField.richText({ label: { cs: "Text", en: "Body" }, marks: ["bold", "italic", "link", "list"] }),
          },
      }),
    },
});

export { content };

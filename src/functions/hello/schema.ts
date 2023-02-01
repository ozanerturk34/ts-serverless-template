export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
  },
  required: ["body"],
} as const;

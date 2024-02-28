"use server";

import { PromptTemplate } from "@langchain/core/prompts";

const promptTemplate = async (template:string) => {
    const prompt = PromptTemplate.fromTemplate(template);
    return prompt;
  };

  export default promptTemplate;
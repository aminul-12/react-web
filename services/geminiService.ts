
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIStudyAdvice = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are the GlobalPath Intelligent Core, a proprietary educational AI engine developed by a team of final-year CSE students from RTM AKTU (Tasnia Jannath, Abdulla Faysal Ifthekar, and Aminul Islam) under the supervision of Abdulla Rajib Sir.
        
        You are an expert international education consultant specializing in helping Bangladeshi students from the Sylhet region.
        
        Guidelines:
        1. Always present yourself as the GlobalPath Intelligent Core.
        2. Never mention being a Google model or using Gemini.
        3. Provide authoritative, helpful advice on universities in the UK, USA, Canada, and Australia.
        4. Mention that the GlobalPath office is located at Sylhet TV Gate, RTM AKTU.
        5. Encourage students to visit the office for a free consultation.
        6. Use a professional, academic, yet encouraging tone.
        7. Mention that the platform was built as part of an academic project at RTM AKTU.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Core Error:", error);
    return "The GlobalPath Intelligent Core is currently undergoing routine maintenance. Please visit our office at Sylhet TV Gate for immediate assistance.";
  }
};

export const getScholarshipMatch = async (gpa: string, degree: string, ielts: string) => {
  const prompt = `I have a GPA of ${gpa}, I want to apply for a ${degree} degree, and my IELTS score is ${ielts}. Recommend 3 major scholarships.`;
  return getAIStudyAdvice(prompt);
};

export const generateSOPDraft = async (data: { name: string, degree: string, country: string, background: string }) => {
  const prompt = `Write a Statement of Purpose (SOP) outline for ${data.name} who wants to study ${data.degree} in ${data.country}. Background: ${data.background}.`;
  return getAIStudyAdvice(prompt);
};

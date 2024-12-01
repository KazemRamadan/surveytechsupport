import { connectToDB } from "@/mongoos";
import SurveyForm from "../models/survey.model";

export async function createSurvey(onboardingRating, valuablePart, improvementSuggestions, confidenceLevel, clearUnderstanding, unclearTopics, engagementLevel, materialsHelpful, opportunityForQuestions, futureTopics, preparedForOnCall) {
    await connectToDB();

    const survey = new SurveyForm({
        onboardingRating,
        valuablePart,
        improvementSuggestions,
        confidenceLevel,
        clearUnderstanding,
        unclearTopics,
        engagementLevel,
        materialsHelpful,
        opportunityForQuestions,
        futureTopics,
        preparedForOnCall
    });

    const savedSurvey = await survey.save();
    return savedSurvey;
}
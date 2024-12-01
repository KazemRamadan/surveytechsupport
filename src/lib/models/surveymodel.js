import { Schema } from "mongoose";

const surveySchema = new Schema(
    {
        onboardingRating: { type: Number },
        valuablePart: { type: String },
        improvementSuggestions: { type: String },
        confidenceLevel: { type: Number },
        clearUnderstanding: { type: Boolean },
        unclearTopics: { type: String },
        engagementLevel: { type: Number },
        materialsHelpful: { type: Boolean },
        opportunityForQuestions: { type: Boolean },
        futureTopics: { type: String },
        preparedForOnCall: { type: Boolean }
    },
    { timestamps: true }
);

const SurveyForm =
    mongoose.models?.SurveyForm || mongoose.model("SurveyForm", surveySchema);

export default SurveyForm;
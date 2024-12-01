import mongoose, { Schema } from "mongoose";

export async function GET() {
    return Response.json({ message: 'Hello World' })
  }

let isConnected = false

const connectToDB = async () => {
    mongoose.set(`strictQuery`, true)

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if(isConnected) return console.log('Already connected to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true;
        console.log('connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}

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


async function createSurvey(onboardingRating, valuablePart, improvementSuggestions, confidenceLevel, clearUnderstanding, unclearTopics, engagementLevel, materialsHelpful, opportunityForQuestions, futureTopics, preparedForOnCall) {
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


export async function POST(req) {
    const surveyData = await req.json();

    const mappedSurveyData = {
        onboardingRating: surveyData["How would you rate the overall onboarding session?"] || null,
        valuablePart: surveyData["What was the most valuable part of the session?"] || null,
        improvementSuggestions: surveyData["What could have been improved?"] || null,
        confidenceLevel: surveyData["How confident do you feel about the product knowledge gained in this session?"] || null,
        clearUnderstanding: surveyData["Did the session provide a clear understanding of the product?"] || null,
        unclearTopics: surveyData["Was there any topic that felt unclear or rushed?"] || null,
        engagementLevel: surveyData["How engaging did you find the session?"] || null,
        materialsHelpful: surveyData["Were the materials (slides, examples, etc.) helpful?"] || null,
        opportunityForQuestions: surveyData["Was there enough opportunity to ask questions?"] || null,
        futureTopics: surveyData["What other topics or tools would you like to see covered in future sessions?"] || null,
        preparedForOnCall: surveyData["Do you feel this session prepared you effectively for the on-call?"] || null
    };

    const requiredFields = Object.keys(mappedSurveyData);
    for (const field of requiredFields) {
        if (mappedSurveyData[field] === undefined) {
            return Response.json({ message: `${field} is required.` }, { status: 400 });
        }
    }

    try {
        const savedSurvey = await createSurvey(
            mappedSurveyData.onboardingRating,
            mappedSurveyData.valuablePart,
            mappedSurveyData.improvementSuggestions,
            mappedSurveyData.confidenceLevel,
            mappedSurveyData.clearUnderstanding,
            mappedSurveyData.unclearTopics,
            mappedSurveyData.engagementLevel,
            mappedSurveyData.materialsHelpful,
            mappedSurveyData.opportunityForQuestions,
            mappedSurveyData.futureTopics,
            mappedSurveyData.preparedForOnCall
        );
        return Response.json(savedSurvey, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
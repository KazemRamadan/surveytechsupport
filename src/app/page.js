"use client";

import "survey-core/defaultV2.min.css";
import { ContrastDarkPanelless } from "survey-core/themes";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useEffect, useRef, useCallback } from "react";

const surveyJson = {
  completedHtml: "<h3>Thank you for your feedback</h3>",
  completedHtmlOnCondition: [
    {
      html: "<h3>Thank you for your feedback</h3>",
    },
    {
      html: "<h3>Thank you for your feedback</h3>",
    },
  ],
  pages: [
    {
      name: "page1",
      title: "General Feedback",
      elements: [
        {
          type: "rating",
          name: "How would you rate the overall onboarding session?",
          title: "How would you rate the overall onboarding session?",
          isRequired: true,
          rateCount: 10,
          rateMax: 10,
        },
        {
          type: "comment",
          name: "What was the most valuable part of the session?",
          title: "What was the most valuable part of the session?",
        },
        {
          type: "comment",
          name: "What could have been improved?",
          title: "What could have been improved?",
        },
      ],
    },
    {
      name: "page2",
      title: "Knowledge Gained",
      elements: [
        {
          type: "rating",
          name: "How confident do you feel about the product knowledge gained in this session?",
          title:
            "How confident do you feel about the product knowledge gained in this session?",
          isRequired: true,
          autoGenerate: false,
          rateValues: [
            {
              value: 1,
              text: " 1 Not confident",
            },
            2,
            3,
            4,
            {
              value: 5,
              text: "5 Very confident",
            },
          ],
        },
        {
          type: "boolean",
          name: "Did the session provide a clear understanding of the product?",
          title:
            "Did the session provide a clear understanding of the product?",
          isRequired: true,
        },
        {
          type: "comment",
          name: "Was there any topic that felt unclear or rushed?",
          title: "Was there any topic that felt unclear or rushed?",
        },
      ],
    },
    {
      name: "page3",
      title: "Engagement",
      elements: [
        {
          type: "rating",
          name: "How engaging did you find the session?",
          title: "How engaging did you find the session?",
          isRequired: true,
          autoGenerate: false,
          rateValues: [
            {
              value: 1,
              text: "1 Not engaging",
            },
            2,
            3,
            4,
            {
              value: 5,
              text: "5 Very engaging",
            },
          ],
        },
        {
          type: "boolean",
          name: "Were the materials (slides, examples, etc.) helpful?",
          title: "Were the materials (slides, examples, etc.) helpful?",
          isRequired: true,
        },
        {
          type: "boolean",
          name: "Was there enough opportunity to ask questions?",
          title: "Was there enough opportunity to ask questions?",
        },
      ],
    },
    {
      name: "page4",
      title: "Future Recommendations",
      elements: [
        {
          type: "comment",
          name: "What other topics or tools would you like to see covered in future sessions?",
          title:
            "What other topics or tools would you like to see covered in future sessions?",
        },
        {
          type: "boolean",
          name: "Do you feel this session prepared you effectively for the on-call?",
          title:
            "Do you feel this session prepared you effectively for the on-call?",
          isRequired: true,
        },
      ],
    },
  ],
  showQuestionNumbers: "off",
};

export default function App() {
  const survey = new Model(surveyJson);
  survey.applyTheme(ContrastDarkPanelless);

  const surveyComplete = useCallback(async (survey) => {
    const surveyData = {
      "How would you rate the overall onboarding session?":
        survey.data["How would you rate the overall onboarding session?"],
      "What was the most valuable part of the session?":
        survey.data["What was the most valuable part of the session?"],
      "What could have been improved?":
        survey.data["What could have been improved?"],
      "How confident do you feel about the product knowledge gained in this session?":
        survey.data[
          "How confident do you feel about the product knowledge gained in this session?"
        ],
      "Did the session provide a clear understanding of the product?":
        survey.data[
          "Did the session provide a clear understanding of the product?"
        ],
      "Was there any topic that felt unclear or rushed?":
        survey.data["Was there any topic that felt unclear or rushed?"],
      "How engaging did you find the session?":
        survey.data["How engaging did you find the session?"],
      "Were the materials (slides, examples, etc.) helpful?":
        survey.data["Were the materials (slides, examples, etc.) helpful?"],
      "Was there enough opportunity to ask questions?":
        survey.data["Was there enough opportunity to ask questions?"],
      "What other topics or tools would you like to see covered in future sessions?":
        survey.data[
          "What other topics or tools would you like to see covered in future sessions?"
        ],
      "Do you feel this session prepared you effectively for the on-call?":
        survey.data[
          "Do you feel this session prepared you effectively for the on-call?"
        ],
    };

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Survey saved successfully:", result);
    } catch (error) {
      console.error("Error saving survey:", error);
    }
  }, []);

  survey.onComplete.add(surveyComplete);

  const StarBackground = () => {
    const canvasRef = useRef(null);
    const stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1,
    }));

    const drawStars = (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
      });
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const animate = () => {
        resizeCanvas();
        updateStars();
        drawStars(ctx);
        requestAnimationFrame(animate);
      };

      window.addEventListener("resize", resizeCanvas);
      animate();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
  };

  return (
    <>
      <div className="bg-black text-center py-40 flex flex-col justify-center relative">
        <div className="w-full h-auto fixed inset-0 z-[0]">
          <StarBackground />
        </div>
        <h1 className="text-yellow-300 text-4xl flex flex-auto justify-center">
          Tech Support - Rate your Experience
        </h1>
        <p className="text-yellow-300 mt-4 flex flex-auto justify-center">
          Giving an honest feedback would help us get better
        </p>
        <div className="border-t border-black mx-auto" />
      </div>
      <Survey className="h-screen" model={survey} />
    </>
  );
}

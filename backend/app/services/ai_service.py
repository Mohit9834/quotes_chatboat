from typing import Optional
from app.config import settings

class AIService:
    """
    Service for AI-generated responses using OpenAI API
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.openai_api_key
        self.model = settings.openai_model
        self.temperature = settings.openai_temperature
        self.max_tokens = settings.openai_max_tokens

    def generate_response(self, prompt: str, context: Optional[str] = None,
                         temperature: Optional[float] = None) -> str:
        """
        Generate AI response using OpenAI GPT

        Args:
            prompt: User's input/question
            context: Additional context for better response
            temperature: Creativity level (0-1)

        Returns:
            Generated response

        Raises:
            ValueError: If API key is not configured
            Exception: If OpenAI API call fails
        """
        if not self.api_key:
            raise ValueError("OpenAI API key not configured")

        try:
            from openai import OpenAI, APIError

            client = OpenAI(api_key=self.api_key)

            # Build the full prompt with context
            full_prompt = prompt
            if context:
                full_prompt = f"Context: {context}\n\nUser: {prompt}"

            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": """You are a compassionate and insightful quote recommendation assistant.
                        You help users find meaningful quotes based on their emotional state and needs.
                        Keep responses concise, warm, and encouraging."""
                    },
                    {"role": "user", "content": full_prompt}
                ],
                temperature=temperature or self.temperature,
                max_tokens=self.max_tokens,
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            error_msg = f"OpenAI API error: {str(e)}"
            print(error_msg)
            raise

    def generate_quote_explanation(self, quote_text: str, emotion: str) -> str:
        """
        Generate explanation for why a quote is relevant to user's emotion
        """
        prompt = f"""Explain why this quote might resonate with someone feeling {emotion}:

"{quote_text}"

Keep the explanation brief (1-2 sentences) and empathetic."""

        return self.generate_response(prompt)

    def generate_follow_up_questions(self, user_input: str) -> list:
        """
        Generate follow-up questions to understand user better
        """
        prompt = f"""Based on the user saying "{user_input}", generate 2-3 brief follow-up questions
        to better understand their emotional state or needs. Format as a simple list."""

        response = self.generate_response(prompt)
        questions = [q.strip().strip('•-').strip() for q in response.split('\n') if q.strip()]
        return questions[:3]

    def enhance_chatbot_response(self, intent: str, detected_emotion: str,
                                quote_text: str) -> str:
        """
        Enhance chatbot response with AI
        """
        prompt = f"""Create a warm, personalized response for someone who just said they are {detected_emotion.lower()}.
        They're interested in a {intent.replace('_', ' ')} quote.

        Include the following quote naturally in your response:
        "{quote_text}"

        Keep it to 2-3 sentences maximum."""

        return self.generate_response(prompt)

    def summarize_conversation(self, messages: list) -> str:
        """
        Summarize a conversation
        """
        conversation = "\n".join([f"- {msg}" for msg in messages])
        prompt = f"""Summarize the emotional journey in this conversation in 2-3 sentences:

{conversation}"""

        return self.generate_response(prompt, temperature=0.5)

    def health_check(self) -> bool:
        """Check if OpenAI API is accessible"""
        if not self.api_key:
            return False

        try:
            from openai import OpenAI
            client = OpenAI(api_key=self.api_key)
            
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": "Hi"}],
                max_tokens=10
            )
            return True
        except Exception as e:
            print(f"Health check failed: {e}")
            return False


# Create singleton instance
try:
    ai_service = AIService()
except Exception as e:
    print(f"Failed to initialize AI Service: {e}")
    ai_service = None

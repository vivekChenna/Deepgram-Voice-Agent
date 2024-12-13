const PromptSuggestion = ({ icon, purpose, question }) => (
  <div className="flex-shrink-0 flex gap-2 p-4 pr-8 bg-[#88888C33;] rounded-lg">
    {icon}
    <div className="text-sm text-gray-200">
      {purpose}
      <div className="text-gray-450">{question}</div>
    </div>
  </div>
);

export default function PromptSuggestions() {
  return (
    <>
      <PromptSuggestion
        icon="🔍"
        purpose="Looking to leverage AndaiHub's AI plugins, AI Agents, and AI Workflows for your next big project?"
        question="Let’s dive into the details!"
      />
      <PromptSuggestion
        icon="💼"
        purpose="Excited to explore how AndaiHub’s AI solutions can streamline your business operations?"
        question="Let’s start the conversation!"
      />
      <PromptSuggestion
        icon="🤖"
        purpose="Curious about the endless possibilities of AndaiHub's custom-tailored AI plugins?"
        question="Let’s uncover how they can transform your enterprise!"
      />
    </>
  );
}

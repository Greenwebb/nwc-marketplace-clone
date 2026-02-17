import type { OnboardingQuestion, VendorOnboardingDraft } from "@/types/vendorOnboarding";
import { TextQuestion } from "./questions/TextQuestion";
import { SelectQuestion } from "./questions/SelectQuestion";
import { CardSelectQuestion } from "./questions/CardSelectQuestion";
import { TextareaQuestion } from "./questions/TextareaQuestion";
import { FileUploadQuestion } from "./questions/FileUploadQuestion";
import { MultiFileUploadQuestion } from "./questions/MultiFileUploadQuestion";
import { CombinedQuestion } from "./questions/CombinedQuestion";
import { ReviewQuestion } from "./questions/ReviewQuestion";
import { IntroQuestion } from "./questions/IntroQuestion";
import { AddressMapQuestion } from "./questions/AddressMapQuestion";

interface QuestionRendererProps {
  question: OnboardingQuestion;
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
  setError: (error: string | null) => void;
  checkpoint: "needs_auth" | "needs_upgrade" | "ready_to_complete";
}

export function QuestionRenderer({
  question,
  formData,
  setField,
  setError,
  checkpoint,
}: QuestionRendererProps) {
  switch (question.inputType) {
    case "intro":
      return <IntroQuestion questionId={question.id} heading={question.heading} subtitle={question.subtitle} />;
    case "text":
      return <TextQuestion questionId={question.id} formData={formData} setField={setField} />;
    case "select":
      return <SelectQuestion questionId={question.id} formData={formData} setField={setField} />;
    case "card-select":
      return <CardSelectQuestion questionId={question.id} formData={formData} setField={setField} />;
    case "textarea":
      return <TextareaQuestion questionId={question.id} formData={formData} setField={setField} />;
    case "file-upload":
      return <FileUploadQuestion questionId={question.id} formData={formData} setField={setField} setError={setError} />;
    case "file-upload-multi":
      return <MultiFileUploadQuestion formData={formData} setField={setField} setError={setError} />;
    case "address-map":
      return <AddressMapQuestion formData={formData} setField={setField} />;
    case "combined":
      return <CombinedQuestion questionId={question.id} formData={formData} setField={setField} setError={setError} />;
    case "review":
      return <ReviewQuestion formData={formData} checkpoint={checkpoint} />;
    default:
      return null;
  }
}

import { defaultVoice } from "app/lib/constants";
import type { StsConfig } from "app/utils/deepgramUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { defaultInstructions } from "app/components/InstructionInput";

export const useStsQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State to manage query parameters
  const [params, setParams] = useState<{
    voice: string;
    instructions: string;
    provider: string | null;
    model: string | null;
    temp: string | null;
    rep_penalty: string | null;
  }>({
    voice: searchParams.get("voice") || defaultVoice.canonical_name,
    instructions: searchParams.get("instructions") || defaultInstructions,
    provider: searchParams.get("provider"),
    model: searchParams.get("model"),
    temp: searchParams.get("temp"),
    rep_penalty: searchParams.get("rep_penalty"),
  });

  // Function to update the URL parameters without reloading the page
  const updateUrlParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const url = new URL(window.location.href);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        } else {
          url.searchParams.delete(key);
        }
      });

      router.replace(url.toString(), { scroll: false });
    },
    [router]
  );

  // Effect to ensure defaultInstructions is set in the URL if missing
  useEffect(() => {
    const currentInstructions = searchParams.get("instructions");
    if (!currentInstructions) {
      updateUrlParams({ instructions: defaultInstructions });
    }

    setParams({
      voice: searchParams.get("voice") || defaultVoice.canonical_name,
      instructions: currentInstructions || defaultInstructions,
      provider: searchParams.get("provider"),
      model: searchParams.get("model"),
      temp: searchParams.get("temp"),
      rep_penalty: searchParams.get("rep_penalty"),
    });
  }, [searchParams, updateUrlParams]);

  // Function to apply params to a given config object
  const applyParamsToConfig = useCallback(
    (config: StsConfig) => {
      const { voice, instructions, provider, model, temp, rep_penalty } = params;
      return {
        ...config,
        agent: {
          ...config.agent,
          think: {
            ...config.agent.think,
            ...(provider && model && { provider: { type: provider }, model }),
            ...(instructions && {
              instructions: `${config.agent.think.instructions}\n${instructions}`,
            }),
          },
          speak: {
            ...config.agent.speak,
            ...(voice && { model: voice }),
            ...(temp && { temp: parseFloat(temp) }),
            ...(rep_penalty && { rep_penalty: parseFloat(rep_penalty) }),
          },
        },
      };
    },
    [params]
  );

  // Functions to update specific parameters
  const updateInstructionsUrlParam = useCallback(
    (text: string | null) => updateUrlParams({ instructions: text }),
    [updateUrlParams]
  );

  const updateVoiceUrlParam = useCallback(
    (voice: string) => updateUrlParams({ voice }),
    [updateUrlParams]
  );

  return {
    ...params,
    applyParamsToConfig,
    updateInstructionsUrlParam,
    updateVoiceUrlParam,
  };
};

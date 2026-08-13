export interface PromptRequest {
  concept: string
  mode: 'DTF' | 'Sublimation'
  styleNotes: string[]
}

export interface PromptResult {
  prompt: string
  source: 'local' | 'api'
}

export interface CreativeEngine {
  composePrompt(request: PromptRequest): Promise<PromptResult>
}

// The local engine keeps this first build fully offline. A future server route can
// implement the same interface without changing any composer or dashboard UI.
export const localCreativeEngine: CreativeEngine = {
  async composePrompt(request) {
    return {
      prompt: `${request.concept}. ${request.mode} apparel artwork. ${request.styleNotes.join(', ')}. Original, production-ready composition.`,
      source: 'local',
    }
  },
}

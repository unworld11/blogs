export type Media =
  | {
      kind: "image";
      src: string;
      alt: string;
      w: number;
      h: number;
      caption?: string;
      phone?: boolean;
    }
  | { kind: "code"; file: string; code: string; caption?: string };

export type Section = {
  id?: string;
  heading: string;
  body: string[];
  media?: Media[];
  layout?: "wide" | "side" | "pair" | "code" | "stills";
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  line: string;
  status: string;
  action?: { label: string; href: string };
  links: { label: string; href: string }[];
  stack: string[];
  lead?: Media;
  intro: string[];
  sections: Section[];
};

const W = 1600;

export const PROJECTS: Project[] = [
  {
    slug: "adforge",
    name: "adforge",
    year: "2026",
    line: "Describe an ad in a sentence and get back a finished vertical film up to three minutes long, with one cast throughout.",
    status: "Private repo, in use",
    links: [],
    stack: ["Next.js 16", "fal.ai", "Seedance 2.5", "nano-banana", "Sarvam Bulbul v3", "ElevenLabs", "Claude Sonnet 4.5", "trigger.dev", "ffmpeg", "Neon", "Vercel Blob"],
    lead: { kind: "image", src: "/work/adforge/create.jpg", alt: "adforge brief screen: a creative director chat with tabs for Describe it, Winning formula and Fill the form", w: W, h: 844 },
    intro: [
      "adforge is an ad studio that takes a brief written the way you'd say it out loud, in English or Hindi, and turns it into a storyboard, a cast, locations, voiceover, music and captions, then renders every shot and stitches them into one 9:16 film.",
      "Most video models give you five or ten good seconds. The hard part of a long ad is everything between the shots: the same face in shot one and shot twenty-nine, the same kitchen when the story comes back to it, a voice that matches the lips. adforge exists to manage that, and to stop and ask before it spends money on a script nobody approved.",
    ],
    sections: [
      {
        id: "stills",
        heading: "One cast, held across a render",
        body: [
          "Five frames from one 29-second render of a Hindi brief for a smart water bottle. She's the same person in the same top and watch every time the story comes back to her, and the bottle keeps its shape from the desk to the kitchen.",
        ],
        media: [
          { kind: "image", src: "/work/adforge/still-1.jpg", alt: "The presenter, a woman in a navy top and silver watch, in a bright apartment", w: 720, h: 1260 },
          { kind: "image", src: "/work/adforge/still-2.jpg", alt: "The bottle on a white desk beside a laptop and phone", w: 720, h: 1260 },
          { kind: "image", src: "/work/adforge/still-3.jpg", alt: "The same woman again, a few shots later, in the same top and watch", w: 720, h: 1260 },
          { kind: "image", src: "/work/adforge/still-4.jpg", alt: "The same woman holding the bottle up at chest height and smiling", w: 720, h: 1260 },
          { kind: "image", src: "/work/adforge/still-5.jpg", alt: "The bottle on a kitchen counter beside fruit and coffee", w: 720, h: 1260 },
        ],
        layout: "stills",
      },
      {
        id: "brief",
        heading: "It starts as a conversation",
        body: [
          "The brief is a chat with a creative director that offers two or three concepts to pick from, and has a tough-love switch for when you want it to push back on a weak idea. You can skip the chat and fill a form instead, or write the whole thing in Hindi.",
          "Length runs from 15 seconds to three minutes. The storyboard writer sizes every shot to how long its line takes to say, about two and a half words a second, so a 60-second brief comes back with roughly 150 words of script split across the shots.",
        ],
        layout: "wide",
      },
      {
        id: "reference",
        heading: "Or bring an ad that already works",
        body: [
          "The Winning formula tab takes a reference video, either uploaded or linked. adforge breaks it down shot by shot into its formula, the hook, the pacing, who says what and where, then reshoots that structure for your product, changing the script only as much as it has to.",
          "Analysed references are saved, so a format that worked for one brand can be reused for the next one without analysing the video again.",
        ],
        media: [{ kind: "image", src: "/work/adforge/formula.jpg", alt: "Winning formula tab with an upload reference video button and a list of saved formulas", w: W, h: 1000, caption: "Saved formulas from earlier references sit under the upload." }],
        layout: "side",
      },
      {
        id: "gates",
        heading: "Three gates before anything is rendered",
        body: [
          "Video is the expensive step, so adforge stops twice before it. At the script gate every shot is editable: its type, scene, spoken line, camera and length. Approving the script builds the world, which means a cast sheet, the locations and any app screens, each of which you can regenerate or swap for a real photo. Then it draws one reference frame per shot, locked to that cast and style.",
          "Frames are where you catch a wrong face or a wrong room for the price of an image. Approving them shows the running cost against a ceiling, and if the estimate is over the cap the app asks you to confirm before it renders any video.",
        ],
        media: [
          { kind: "image", src: "/work/adforge/nimbus.jpg", alt: "Script gate for a mattress ad: 31 shots, about 159 seconds, with character and style notes", w: W, h: 1000, caption: "Script gate for a mattress ad: 31 shots, about 159 seconds." },
          { kind: "image", src: "/work/adforge/nimbus-world.jpg", alt: "World panel with generated cast references and locations, each with a regenerate button", w: W, h: 1000, caption: "The world: cast and locations, generated or uploaded before any frame is drawn." },
        ],
        layout: "wide",
      },
      {
        id: "long",
        heading: "Long renders that hold together",
        body: [
          "Every shot renders on Seedance 2.5 with the cast sheet and its reference frame passed in. When one shot has to continue into the next, like a camera that keeps moving across the same desk, it's told to end on the next shot's approved frame. That frame exists before any video does, so even a chain of continuous shots renders in parallel, and the two clips meet on a clean generated frame instead of a motion-blurred one. Presenter shots get their dialogue in the prompt, so the model generates the voice and the lip movement together, with the TTS take passed in as a voice reference.",
          "As each shot lands it gets normalised straight away on trigger.dev, so the stitch at the end is mostly a stream copy. One final encode burns in captions built from the script, which works for Devanagari where auto-transcription doesn't, adds the brand mark, and ducks the music under the voiceover. If any of that degrades, the ad still ships and the warning goes into a banner.",
        ],
        media: [
          { kind: "image", src: "/work/adforge/nimbus-shots.jpg", alt: "Script editor rows: shot type, location tag, scene text and voiceover line for each shot", w: W, h: 1000, caption: "Shot rows in the long script, each tied to a location from the world." },
        ],
        layout: "side",
      },
      {
        id: "final",
        heading: "The cut, captions and all",
        body: [
          "The last gate hands over the MP4 and a caption file. Finished films are copied to durable storage, because the model host's links expire after three days.",
          "Every stage keeps a running cost estimate against a ceiling, which is what makes a three-minute brief something you can run without checking a bill afterwards.",
        ],
      },
    ],
  },
  {
    slug: "manycode",
    name: "manycode",
    year: "2026",
    line: "Multiplayer Claude Code and Codex: share a live terminal session with a six-character code.",
    status: "Live, #17 on Product Hunt",
    action: { label: "Open manycode", href: "https://manycode.vercel.app" },
    links: [
      { label: "manycode.vercel.app", href: "https://manycode.vercel.app" },
      { label: "github.com/unworld11/manycode", href: "https://github.com/unworld11/manycode" },
      { label: "Product Hunt", href: "https://www.producthunt.com/products/ccshare" },
    ],
    stack: ["Node", "PTY", "UDP discovery", "WebSockets", "macOS menubar app", "MIT"],
    lead: { kind: "image", src: "/work/manycode/site.jpg", alt: "manycode landing page: multiplayer coding agents, with a Download for Mac button", w: W, h: 1000 },
    intro: [
      "manycode host wraps your agent in a real PTY and prints a code. Your friend runs manycode join with that code, or opens a link in their browser, and they're looking at the same screen with a working keyboard. Claude Code is the default, but anything that runs in a terminal works: Codex, opencode, kimi, aider.",
      "It was called ccshare until July 2026. The old command still works and existing installs update in place.",
    ],
    sections: [
      {
        heading: "Say the code out loud, that's the setup",
        body: [
          "On the same wifi there's nothing else to do. Discovery is a UDP broadcast that carries a hash of the code, never the code itself, so a neighbour on the network can't join by listening. Away from each other it goes through a free tunnel instead.",
          "Ctrl-] detaches without killing the session, so a guest can step out and come back. There are no accounts and no telemetry, and the app bundles nothing extra: it drives the same CLI the one-line installer does.",
        ],
        media: [{ kind: "image", src: "/work/manycode/how.jpg", alt: "Two terminals side by side: one hosting with code 7KQ 2FM, the other joining it", w: W, h: 1000, caption: "Host and guest terminals from the landing page." }],
        layout: "wide",
      },
      {
        heading: "A seat in the browser",
        body: [
          "The browser viewer shows the shared conversation rather than raw terminal output. The host picks which chat is shared and tool approvals stay with the host, so a guest can prompt but can't approve a command on someone else's machine.",
        ],
        media: [
          { kind: "image", src: "/work/manycode/viewer.jpg", alt: "manycode browser viewer showing host, assistant and teammate messages in one conversation", w: 1280, h: 900, caption: "The viewer, from the UI review." },
          { kind: "image", src: "/work/manycode/mobile.jpg", alt: "manycode viewer at phone width", w: 390, h: 844, caption: "The same seat on a phone.", phone: true },
        ],
        layout: "pair",
      },
      {
        heading: "Two people, one context",
        body: [
          "The backend acceptance test is a small proof that both people really are in one session. Alice gives the assistant a codename, Bob asks for it from another seat, and then a third prompt asks from a separate coding app. All three get the same answer.",
        ],
        media: [{ kind: "image", src: "/work/manycode/contributor.jpg", alt: "Acceptance test transcript where Alice, Bob and a CLI client all get the codename Mango", w: 1280, h: 900, caption: "Alice, Bob and the CLI all read back Mango." }],
        layout: "side",
      },
    ],
  },
  {
    slug: "ads-codex",
    name: "ads-codex",
    year: "2026",
    line: "A Mac app that runs Codex and Claude Code behind one interface, sharing media tools over MCP.",
    status: "In progress, internal",
    links: [],
    stack: ["Electron", "Next.js", "TypeScript", "Codex app server", "Claude Agent SDK", "MCP"],
    lead: {
      kind: "code",
      file: "docs/ARCHITECTURE.md, condensed",
      caption: "Runtime events, as the app sees them. Both agents are translated into this one union.",
      code: `type RuntimeId = "codex" | "claude"

type RuntimeEvent =
  | { type: "text.delta"; text: string }
  | { type: "reasoning.delta"; text: string }
  | { type: "tool.start"; id: string; name: string; args: JsonValue }
  | { type: "tool.progress"; id: string; note: string }
  | { type: "tool.end"; id: string; ok: boolean; output?: JsonValue }
  | { type: "file.changed"; path: string }
  | { type: "approval.request"; request: RuntimeApproval }`,
    },
    intro: [
      "ads-codex, which ships as Draper, runs ad production entirely on your own Mac. Both agents are local command-line backends billed to subscriptions you already pay for: Codex through its app server over JSON-RPC on stdio, and Claude Code through the Claude Agent SDK. There are no inference API keys, no gateway and no server the product depends on.",
      "Electron's main process owns the application state, and each runtime adapter owns its provider's protocol. The renderer never talks to an agent directly. It sends commands through a fixed preload bridge and reads one ordered event feed back.",
    ],
    sections: [
      {
        heading: "One bridge, one event feed",
        body: [
          "A command acknowledges a durable intent, and the changes arrive afterwards as events with a cursor, so the window can reload in the middle of a turn and pick up where it left off. App thread IDs are kept apart from each runtime's own session IDs through an opaque binding, so nothing in the interface depends on which agent is underneath.",
        ],
        media: [
          {
            kind: "code",
            file: "docs/ARCHITECTURE.md",
            code: `const page = await window.ads.jobs.open(jobId)
const stop = await window.ads.events.follow(
  { scope: { type: "job", jobId }, after: page.cursor },
  (batch) => {
    store.apply(batch.events)
    void window.ads.events.ack(batch.subscriptionId, batch.through)
  },
)

await window.ads.turns.start({
  requestId: crypto.randomUUID(),
  threadId: page.thread.id,
  input: [{ type: "text", text }],
})`,
          },
        ],
        layout: "code",
      },
      {
        heading: "Pinned backends and shared tools",
        body: [
          "Codex is pinned to one version and installed into the app's own data folder rather than picked up from Homebrew. Its protocol types are generated from that installed binary as a build step, 94 root types and 608 v2 types, so the app can't drift when Codex upgrades.",
          "The media providers, video understanding and generation among them, become one local MCP server that the agents load, so the same tools are there whichever agent runs the job.",
        ],
      },
    ],
  },
  {
    slug: "opensource-codex",
    name: "opensource-codex",
    year: "2026",
    line: "OpenAI's Codex desktop client, extracted from the app bundle and made runnable from a plain checkout.",
    status: "Public on GitHub",
    action: { label: "Read the code on GitHub", href: "https://github.com/unworld11/opensource-codex" },
    links: [{ label: "github.com/unworld11/opensource-codex", href: "https://github.com/unworld11/opensource-codex" }],
    stack: ["Electron", "asar", "shell"],
    lead: {
      kind: "code",
      file: "README.md, trimmed",
      caption: "The repository layout. The UI ships minified, the main process is readable.",
      code: `├── docs/                    # how it was extracted, how to modify the UI
├── scripts/
│   ├── setup-coodex.sh      # download the binaries
│   └── run.sh
├── extracted-app/           # main app, 8,908 files
│   ├── .vite/build/         # Electron main process
│   ├── webview/             # UI (minified)
│   ├── node_modules/        # runtime deps
│   └── native-menu-locales/ # 66 languages
├── app.asar.unpacked/       # native modules
└── package.json`,
    },
    intro: [
      "The Codex desktop client, version 0.152.1, is an Electron app inside ChatGPT.app. This repo is that app pulled out of its asar archive, with the committed parts arranged so a clone runs: the main process, 7,924 UI files, 471 runtime dependencies and 404 native modules.",
      "The three binaries it needs, the codex CLI, the code-mode host and chronicle, add up to 554 MB, so they aren't committed. One script downloads them and then ./codex starts the app.",
    ],
    sections: [
      {
        heading: "Why bother",
        body: [
          "Being able to read and change a production agent client is the fastest way to learn how one is put together: how it streams, how it asks for approval, how it lays out a diff. The repo's docs cover how the extraction was done and how to change the UI, and that work fed straight into how ads-codex was designed.",
        ],
      },
    ],
  },
  {
    slug: "orca",
    name: "orca",
    year: "2026",
    line: "The dashboard, API and background workers behind Parallel's Reddit distribution.",
    status: "Live, behind a sign-in",
    action: { label: "Open the dashboard", href: "https://reddit.paralleldistribution.com" },
    links: [{ label: "reddit.paralleldistribution.com", href: "https://reddit.paralleldistribution.com" }],
    stack: ["Next.js", "Supabase", "Trigger.dev", "OpenAI"],
    lead: { kind: "image", src: "/work/orca/queue.jpg", alt: "orca review queue: pending, ready and rejected counts above a draft comment card with its score and AI reasoning", w: 1510, h: 812, caption: "The review queue, filled with sample drafts for a made-up brand so no client work is shown." },
    intro: [
      "I started Parallel's Reddit distribution division from nothing. It now runs as a team of three serving four brands at over 20 million views a month, and orca is the software that team works in.",
      "The dashboard and API sit on Supabase, scheduled and long-running work runs as Trigger.dev background tasks, and agents help with the writing. The device automation lives in a separate worker repo.",
    ],
    sections: [
      {
        heading: "Every draft comes with a score",
        body: [
          "Workers watch rising threads in each brand's subreddits and draft a reply when one fits. A grader scores how well the thread matches the brand and writes down why, so a reviewer can see the case for a draft before reading it.",
          "From the card a reviewer can claim it so two people don't work the same thread, then edit, regenerate, reject or approve it.",
        ],
        media: [{ kind: "image", src: "/work/orca/queue-2.jpg", alt: "Two sample draft cards in the orca queue, each with thread stats, AI reasoning, reviewers and the draft text", w: 1510, h: 812, caption: "Further down the same queue. The drafts and the brand are sample data." }],
        layout: "side",
      },
      {
        heading: "Watching what went out",
        body: [
          "Posting isn't the end of it. A monitor runs on a schedule and checks every published comment for whether it's still visible or has been shadow-banned, how it's voting, how many people have seen it and whether it made top comment.",
        ],
        media: [{ kind: "image", src: "/work/orca/monitoring.jpg", alt: "Monitoring dashboard with totals for comments, visible, top comments and average upvotes, and a table of monitored comments with account details blurred", w: 1510, h: 812, caption: "Live monitoring, with accounts, subreddits and comment text blurred." }],
        layout: "side",
      },
      {
        heading: "Limits and prompts per client",
        body: [
          "Rate limits are set globally and can be overridden per client and per subreddit, so each account stays under a set number of comments in a time window. Every prompt the agents use, and the model behind it, can be changed per client from the same screen.",
        ],
        media: [{ kind: "image", src: "/work/orca/settings.jpg", alt: "Configuration screen with comment rate limits and an AI prompts panel, prompt text blurred", w: 1510, h: 812, caption: "Configuration, with the prompt text blurred." }],
        layout: "side",
      },
      {
        heading: "How the repo is split",
        body: [
          "One Next.js app holds the dashboard, its API routes and the Trigger.dev tasks, so a change to a queue and the screen that shows it ship together.",
        ],
        media: [
          {
            kind: "code",
            file: "README.md, trimmed",
            code: `dashboard/          Next.js app (frontend + API routes + Trigger.dev tasks)
  app/api/          API routes (Supabase-backed)
  components/       React dashboard panels
  lib/backend/      server-side helpers, queue
  trigger/          background tasks (monitoring, scraping, queue)
scripts/            one-off utility and diagnostic scripts
.github/workflows/  deploy, tests, stale branch cleanup`,
          },
        ],
        layout: "code",
      },
    ],
  },
  {
    slug: "el-gigatronius",
    name: "el gigatronius",
    year: "2026",
    line: "Paste a viral TikTok slideshow, get its slides as a grid, and let an agent turn it into a template.",
    status: "Live, needs its own backend",
    action: { label: "Open el gigatronius", href: "https://el-gigatronius.vercel.app" },
    links: [{ label: "el-gigatronius.vercel.app", href: "https://el-gigatronius.vercel.app" }],
    stack: ["Next.js", "Claude Opus 4.7", "OpenAI", "sharp"],
    lead: {
      kind: "code",
      file: "lib/agent/tools.js, condensed",
      caption: "The agent's tools, with their input schemas left out. It can look at a page, zoom into a region and search the web, and the only thing it can write is a template.",
      code: `export const toolDefinitions = [
  {
    name: "screenshot",
    description:
      "Navigate a headless browser to a URL and capture a PNG screenshot. " +
      "Returns the image inline so you can see it, plus an image_id you can pass to \`zoom\` " +
      "for closer inspection. Use this whenever you need to visually inspect a page.",
  },
  {
    name: "zoom",
    description:
      "Crop and upscale a region of a previously captured screenshot so you can read fine details " +
      "(small text, icons, spacing). Coordinates are in the original screenshot's pixel space.",
  },
  {
    name: "save_template",
    description:
      "Persist a finished template to disk. Call this exactly once per run when you are confident " +
      "the template is complete. ...",
  },
  { type: "web_search_20260209", name: "web_search" },
];`,
    },
    intro: [
      "Slideshow posts are the cheapest format on TikTok to make and the hardest to copy well, because what works lives in small details like the order of the slides, the text placement and the hook on slide one.",
      "el gigatronius scrapes a post into a numbered image grid and keeps every output in a small library with a link back to the original. The agent then studies the grid, looking closely wherever it needs to, and saves a template. Around that sit three runners: Batch 50 templates, a daily remix runner and remix analytics.",
    ],
    sections: [],
  },
  {
    slug: "virtuchat",
    name: "virtuchat",
    year: "2025",
    line: "A personalised chatbot on two uncensored local models, with personalities you write yourself.",
    status: "Public on GitHub",
    action: { label: "Read the code on GitHub", href: "https://github.com/unworld11/virtuchat" },
    links: [{ label: "github.com/unworld11/virtuchat", href: "https://github.com/unworld11/virtuchat" }],
    stack: ["Python", "Streamlit", "Ollama", "Docker", "AWS EC2"],
    lead: {
      kind: "code",
      file: "app.py, condensed",
      code: `client = Client()

model = st.selectbox(
    'Model',
    ['artifish/llama3.2-uncensored', 'wizard-vicuna-uncensored'],
    index=1
)

def save_custom_personality():
    personality_data = {
        "name": st.session_state.personality_name,
        "traits": st.session_state.personality_traits,
        "tone": st.session_state.personality_tone,
        "background": st.session_state.personality_background
    }`,
    },
    intro: [
      "Both models run on Ollama on a single EC2 instance, and you choose which one to talk to. A personality is a name, traits, a tone and a background story, and it gets folded into the system prompt for every turn.",
      "The whole thing ships as a Docker Compose setup, so the same app and models that run locally run on the server.",
    ],
    sections: [],
  },
  {
    slug: "tiktok-trend-analyser",
    name: "tiktok trend analyser",
    year: "2025",
    line: "Search TikTok, pull a batch of videos, and have Gemini cluster them by what they're actually about.",
    status: "Live",
    action: { label: "Open the analyser", href: "https://tiktok-trend-analyser.vercel.app" },
    links: [
      { label: "tiktok-trend-analyser.vercel.app", href: "https://tiktok-trend-analyser.vercel.app" },
      { label: "github.com/unworld11/tiktokTrendAnalyser", href: "https://github.com/unworld11/tiktokTrendAnalyser" },
    ],
    stack: ["Next.js", "TypeScript", "Apify", "Google Gemini"],
    lead: { kind: "image", src: "/work/tiktok-trend-analyser/search.jpg", alt: "TikTok Semantics Analysis search form with keyword, region, sort and time filters", w: W, h: 1000 },
    intro: [
      "Trend reports tell you which hashtags are up. This tool works from the videos themselves. It searches by keyword, hashtag, user or trend through Apify, sends the batch to Gemini for analysis, and groups the results by meaning rather than by tag, so ten videos with different hashtags making the same joke end up in one cluster.",
    ],
    sections: [
      {
        heading: "Batches, a dashboard and clusters",
        body: [
          "Fetched videos can also be pasted in as JSON, which skips scraping when the data already exists. The semantic dashboard shows word usage and patterns across the batch, and the clustering tab shows the groups. There's a comment generator in the same toolbox.",
        ],
        media: [{ kind: "image", src: "/work/tiktok-trend-analyser/batch.jpg", alt: "Batch video analysis panel with tabs for fetched videos, JSON input, semantic dashboard and clustering", w: W, h: 1000 }],
        layout: "wide",
      },
    ],
  },
  {
    slug: "make-videos-like-3b1b",
    name: "make-videos-like-3b1b",
    year: "2025",
    line: "Type a topic and get a multi-scene Manim animation written by an LLM in the spirit of 3Blue1Brown.",
    status: "Public on GitHub",
    action: { label: "Read the code on GitHub", href: "https://github.com/unworld11/make-videos-like-3b1b" },
    links: [{ label: "github.com/unworld11/make-videos-like-3b1b", href: "https://github.com/unworld11/make-videos-like-3b1b" }],
    stack: ["Python", "Streamlit", "Groq", "Llama 3.3 70B", "manimlib"],
    lead: {
      kind: "code",
      file: "app.py, condensed",
      code: `completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{
        "role": "user",
        "content": (
            "Generate an extensive ManimLib code in the style of 3Blue1Brown "
            "that explains the following topic as if it were a multi-Scene video:"
            f"\\n\\n{prompt}\\n\\n"
            "Please output only valid Python code ..."
        ),
    }],
    max_completion_tokens=32768,
    stream=True,
)`,
    },
    intro: [
      "Llama 3.3 70B on Groq streams out a complete manimlib script with several scenes. Models wrap code in markdown fences and polite chatter, so a cleaner strips both and trims everything above the first real line of Python before the file is written and rendered.",
      "When a render fails, the error points back at the generated file, so you can fix one line instead of generating the whole thing again.",
    ],
    sections: [],
  },
  {
    slug: "tinygrad",
    name: "tinygrad",
    year: "2025",
    line: "A small autograd engine after Karpathy's micrograd, with the pieces you need to train something real.",
    status: "Public on GitHub",
    action: { label: "Read the code on GitHub", href: "https://github.com/unworld11/tinygrad" },
    links: [{ label: "github.com/unworld11/tinygrad", href: "https://github.com/unworld11/tinygrad" }],
    stack: ["Python", "graphviz"],
    lead: {
      kind: "code",
      file: "engine.py, two methods of Value",
      code: `    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

    def backward(self):
        topo = []
        visited = set()
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
        build_topo(self)
        self.grad = 1
        for v in reversed(topo):
            v._backward()`,
    },
    intro: [
      "Every Value remembers the values it came from and how to pass a gradient back to them. backward sorts the graph topologically and runs those closures in reverse, and that's all backpropagation is.",
      "On top of micrograd it adds sigmoid and tanh, type hints, mini-batches through the MLP, a training loop, L1 and L2 regularisation, dropout, and a draw_dot that labels the whole computation graph.",
    ],
    sections: [],
  },
  {
    slug: "dragarys",
    name: "dRAGarys",
    year: "2024",
    line: "Self-RAG as a state graph that grades its own documents and answers, and rewrites the question when they fail.",
    status: "Public on GitHub",
    action: { label: "Read the code on GitHub", href: "https://github.com/unworld11/dRAGarys" },
    links: [{ label: "github.com/unworld11/dRAGarys", href: "https://github.com/unworld11/dRAGarys" }],
    stack: ["Python", "LangGraph", "LangChain"],
    lead: {
      kind: "code",
      file: "main.py, condensed",
      code: `def decide_to_generate(state):
    filtered_documents = state["documents"]
    if not filtered_documents:
        # All documents have been filtered check_relevance
        # We will re-generate a new query
        return "transform_query"
    return "generate"

workflow = StateGraph(GraphState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("grade_documents", grade_documents)
workflow.add_node("generate", generate)
workflow.add_node("transform_query", transform_query)`,
    },
    intro: [
      "The Self-RAG paper asks four questions on every turn: should I retrieve, is this passage relevant, is my answer supported by it, and is the answer useful. dRAGarys makes each question a node in a LangGraph state machine.",
      "Documents that fail the relevance grade are dropped. If none survive, the question is rewritten and retrieval runs again. An answer that isn't supported by its documents is generated again, and one that's supported but doesn't answer the question sends the graph back to rewrite the question.",
    ],
    sections: [],
  },
  {
    slug: "sisyphus",
    name: "sisyphus",
    year: "2024",
    line: "Ask questions about a CSV or a Google Sheet in plain English, with web search folded in when the data isn't enough.",
    status: "Public on GitHub",
    action: { label: "Read the code on GitHub", href: "https://github.com/unworld11/sisyphus" },
    links: [
      { label: "github.com/unworld11/sisyphus", href: "https://github.com/unworld11/sisyphus" },
      { label: "Loom walkthrough", href: "https://www.loom.com/share/8159c85d39bd4e9d9d28abd4997317d5" },
    ],
    stack: ["Python", "Streamlit", "Groq", "Llama 3 8B", "SerpAPI", "Google Sheets API"],
    lead: {
      kind: "code",
      file: "app.py, condensed",
      code: `system_context = (
    f"Analyzing a dataset with {stats['rows']} rows "
    f"and columns: {', '.join(stats['columns'])}."
)
if use_web_search:
    results = web_search(question)
    system_context += "\\nWeb search results:\\n" + "\\n".join(
        f"- {r['snippet']}" for r in results
    )

completion = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[{"role": "system", "content": system_context},
              {"role": "user", "content": question}],
)`,
    },
    intro: [
      "Upload a CSV or paste a sheet link and sisyphus shows a preview, column statistics and charts for the columns you choose. Questions go to Llama 3 on Groq with the shape of the dataset as context, and when the answer needs the outside world, three search results from SerpAPI go along with it.",
      "Every answer is kept in a running table with its question and timestamp, so an analysis session leaves a record behind.",
    ],
    sections: [],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

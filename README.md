<div align="center">

# 🏦 Loan Operation Intelligence

### ROSPL Lab · Mini Project

*An AI voice assistant for loan servicing that answers from a real knowledge base, built by our team to learn modern AI and full-stack tools end to end.*

<br/>

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Pinecone](https://img.shields.io/badge/Pinecone-VectorDB-0A0A23?style=for-the-badge&logo=pinecone&logoColor=white)](https://www.pinecone.io/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Vapi](https://img.shields.io/badge/Vapi-Voice_AI-6E56CF?style=for-the-badge&logoColor=white)](https://vapi.ai/)

<br/>

[Run It Locally](#-running-it-locally) · [What We Learned](#-what-we-learned)

</div>

---

## 👥 Team

| Roll No. | Name |
| :---: | --- |
| 02 | Hardik Agarwal |
| 08 | Ashmit Rawat |
| 12 | Kavya Bhansali |
| 21 | Deepmalika Das |

---

## 🎯 About the Project

We built this project for our **ROSPL Lab** to get hands-on with technologies we hadn't used before: large language models, vector databases, voice AI, and real-time streaming. We picked a concrete problem so the learning had something real to attach to.

**The problem:** banks and lenders make many reminder calls to borrowers ("your EMI is due on the 5th"). Borrowers ask real questions during those calls: *What happens if I pay late? Can I restructure my loan? I already paid, why are you calling?* A scripted phone menu can't answer those questions, and a plain chatbot might make up an answer, which is risky for a financial product.

**Our approach:** a voice agent that looks up every answer in a knowledge base of loan policies before replying. This is called **RAG (Retrieval-Augmented Generation)**. Alongside it, a dashboard shows calls, the knowledge base, search results and analytics as they happen.

---

## ✨ What It Does

| Feature | What it means |
| --- | --- |
| 🎙️ **AI Voice Agent** | Talk to the assistant from the browser. It can look up a borrower, check eligibility, schedule a callback, or escalate to a human. |
| 📚 **Knowledge Base** | Add, edit and delete loan policies, FAQs and compliance rules. Each record is stored in PostgreSQL and indexed in Pinecone. |
| 🔍 **Semantic Search** | Search by meaning, not just keywords. "What if I miss a payment?" finds the *Late Payment Penalty* policy. |
| 🧪 **Retrieval Test** | Runs a set of test questions and shows which knowledge-base record was retrieved for each, so we can check whether search is working well. |
| 🛡️ **PII Filtering** | Personal data (phone numbers, IDs, emails) is detected and flagged before content goes into the knowledge base. |
| ⚖️ **Business Rules** | Escalation and compliance rules are stored in the database and checked separately from the AI, so they always apply. |
| ⚡ **Live Nudges** | During a call, the system can suggest tips to a supervisor, such as a missed disclosure or a frustrated borrower. |
| 📈 **Analytics** | Call outcomes, response times and nudge activity on one dashboard. |
| 🌏 **Multilingual Assistants** | Separate voice assistants set up for India (English), the Philippines (Taglish) and Indonesia (Bahasa). |

---

## 🧰 Tech We Learned

The main goal of the project was learning these tools. Here is each one and how we used it.

| Technology | What it is | How we used it |
| --- | --- | --- |
| **FastAPI** | Python web framework for building APIs | Backend with 30+ REST endpoints for knowledge, calls, nudges, tools and evaluation |
| **Next.js 15 + TypeScript** | React framework for web apps | The dashboard: ops console, knowledge base, search, voice and analytics pages |
| **Tailwind CSS** | Utility-first CSS | All styling, including light and dark themes |
| **PostgreSQL + SQLAlchemy** | Relational database + Python ORM | Stores knowledge records, calls, events and business rules |
| **Redis** | In-memory data store with pub/sub | Sends live call events and nudges to the dashboard |
| **Pinecone** | Vector database | Stores embeddings of knowledge records for semantic search |
| **OpenAI** | LLMs + embeddings | `text-embedding-3-small` for embeddings, GPT-4o / 4o-mini for answers |
| **LangGraph** | Library for building AI workflows as graphs | Conversation tracking and the nudge pipeline |
| **Vapi** | Voice AI platform | Speech-to-text, text-to-speech, and tool calling during voice conversations |
| **Deepgram** | Streaming speech recognition | Real-time transcription for the nudge pipeline |
| **Microsoft Presidio** | PII detection library | Finds and flags personal data during ingestion |
| **Langfuse** | LLM observability | Logs each AI call so we could debug and measure it |
| **Docker** | Containers | Runs PostgreSQL and Redis locally |
| **Pytest** | Python testing | 72 automated backend tests |

---

## 🏛️ How It Works

```mermaid
flowchart LR
    User([👤 Borrower / User]) -->|voice| Vapi[🎙️ Vapi Voice Agent]
    User -->|browser| FE[💻 Next.js Dashboard]

    Vapi -->|tool calls| BE[⚙️ FastAPI Backend]
    FE -->|REST + SSE| BE

    BE --> PG[(🐘 PostgreSQL<br/>records, calls, rules)]
    BE --> PC[(🌲 Pinecone<br/>vector search)]
    BE --> RD[(🔴 Redis<br/>live events)]
    BE --> OAI[🧠 OpenAI<br/>embeddings + GPT-4o]
    BE -.traces.-> LF[📊 Langfuse]
```

**When someone asks a question:**
1. The question is converted into an **embedding** (a list of numbers that captures its meaning) using OpenAI.
2. **Pinecone** finds the knowledge-base records whose embeddings are closest to the question.
3. The backend loads the full records from **PostgreSQL** and passes them to **GPT-4o**.
4. GPT-4o answers **using only those records** and cites the source. If nothing relevant is found, it says so and offers to connect the borrower to a human.

**When a record is added to the knowledge base:**
validate → detect PII → split into chunks → create embeddings → save to PostgreSQL + Pinecone

---

## 🚀 Running It Locally

### Prerequisites

- **Python 3.12**
- **Node.js 18+**
- **Docker Desktop** (for PostgreSQL and Redis)
- API keys for **OpenAI**, **Pinecone** and **Vapi** (Deepgram and Langfuse are optional)

### 1. Clone and configure

```bash
git clone https://github.com/Ashmit-A-Rawat/Loan-Operation-Intelligence.git
cd Loan-Operation-Intelligence
cp .env.example .env              # then fill in your API keys
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key
NEXT_PUBLIC_VAPI_INDIA_ASSISTANT=assistant-id
NEXT_PUBLIC_VAPI_PH_ASSISTANT=assistant-id
NEXT_PUBLIC_VAPI_ID_ASSISTANT=assistant-id
```

> 💡 In `.env`, write `DATABASE_URL` out in full (e.g. `postgresql+asyncpg://loi_user:changeme@localhost:5432/loan_operation_intelligence`). `${VAR}`-style references are not expanded.

### 2. Start PostgreSQL and Redis

```bash
docker compose up -d postgres redis
```

> ⚠️ If you already have PostgreSQL installed on port 5432, the container won't start. Either stop your local Postgres, or run the container on another port (e.g. `-p 5433:5432`) and change the port in `DATABASE_URL`.

### 3. Backend

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate          # Windows: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Tables are created automatically on first start.

### 4. Load sample data (first time only)

From the project root, in another terminal:

```bash
backend/.venv/bin/python -m scripts.ingest_kb      # 15 knowledge-base records
backend/.venv/bin/python -m scripts.seed_rules     # 8 business rules
```

### 5. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** 🎉

### ✅ Check that everything works

| Check | How |
| --- | --- |
| Backend health | `curl localhost:8000/api/health/ready` → Postgres, Redis and Pinecone should all be `ok` |
| API docs | http://localhost:8000/docs |
| Semantic search | Search page → *"What happens if I miss an EMI payment?"* |
| Tests | `cd backend && pytest tests/ -q` (uses a `loan_operation_intelligence_test` database; set `LOI_TEST_DATABASE_URL` if your Postgres isn't on 5432) |

### 🛠️ Troubleshooting

| Problem | Fix |
| --- | --- |
| `address already in use` on port 8000 or 3000 | `lsof -ti:8000 \| xargs kill` (or `:3000`) |
| Knowledge Base page is empty | Run the two data-loading commands from step 4 |
| Pages take a long time on first load | The dev script uses Turbopack (`next dev --turbopack`). The first visit to each page compiles it; after that it's instant. |
| `ModuleNotFoundError` | Activate the `.venv` before running `uvicorn` or `pip` |

---

## 📁 Project Structure

```text
Loan-Operation-Intelligence/
├── backend/
│   ├── app/
│   │   ├── agents/       # LangGraph workflows (conversation tracker, nudge pipeline)
│   │   ├── core/         # Database, Redis, Pinecone, Langfuse clients
│   │   ├── models/       # SQLAlchemy database models
│   │   ├── routes/       # API endpoints
│   │   ├── schemas/      # Request/response formats (Pydantic)
│   │   ├── services/     # Main logic: RAG, rules, compliance, voice tools
│   │   ├── utils/        # Chunking, PII redaction, latency tracking
│   │   ├── config.py
│   │   └── main.py
│   ├── alembic/          # Database migrations
│   └── tests/            # Pytest suite
├── frontend/
│   ├── app/              # Pages: dashboard, operations, knowledge, search, retrieval, voice, analytics
│   ├── components/       # Sidebar, navbar, cards, voice assistant, etc.
│   └── lib/api.ts        # All calls from the frontend to the backend
├── data/knowledge_base/  # Sample loan policies & FAQs (JSON)
├── scripts/              # Ingestion, rule seeding, Vapi setup, evaluation
├── evaluation/           # Test cases for retrieval, voice, and nudges
├── docs/                 # Design notes (architecture, KB, voice, multilingual, nudges)
└── docker-compose.yml
```

---

## 📡 API Overview

Full interactive docs are available at **http://localhost:8000/docs** while the backend is running.

| Group | Base path | Examples |
| --- | --- | --- |
| Health | `/api/health` | liveness, readiness (checks Postgres / Redis / Pinecone) |
| Knowledge | `/api/knowledge` | records CRUD, bulk ingest, semantic search, stats, retrieval test |
| Voice tools | `/api/tools` | borrower lookup, eligibility, callback, payment commitment, escalation |
| Calls | `/api/calls` | call list, transcript, event timeline, analytics summary |
| Nudges | `/api/nudges` | start/stop session, analysis, latency report |
| Evaluation | `/api/eval` | run evaluations, fetch results |
| Voice | `/api/voice` | Vapi webhook, start an outbound call |

---

## 💡 What We Learned

- **How RAG works in practice.** An LLM on its own will confidently make things up. Having it answer only from retrieved records, with a source, made the answers much more reliable.
- **Embeddings and vector search.** How text becomes vectors, why similar meanings end up close together, and how Pinecone searches millions of vectors quickly.
- **Two databases, two jobs.** PostgreSQL is the source of truth; Pinecone is only the search index. Keeping them in sync (same record IDs, upserts on re-ingest) was a lesson in itself.
- **Async Python.** FastAPI with async SQLAlchemy, asyncpg and async Redis, and why blocking calls hurt an async server.
- **Real-time updates.** Using Redis pub/sub and Server-Sent Events to push live data to the browser instead of refreshing the page.
- **Voice AI.** How Vapi chains speech-to-text, an LLM and text-to-speech, and how the voice agent calls our backend as *tools* mid-conversation.
- **Keeping AI in check.** Business and compliance rules run separately from the LLM, so an important rule can't be skipped because of how the model phrases an answer.
- **Debugging real setups.** Port conflicts with an existing Postgres, `.env` variables that don't expand, an empty database making a page look broken, and slow dev builds fixed by switching to Turbopack.

---

## 🗺️ Future Scope

- Replace the mock borrower data with a real borrowers/loans table
- Log in with user roles (agent, supervisor, admin)
- More languages and regional voice models
- Automatic retrieval evaluation on every knowledge-base change
- Deploy the whole stack with one `docker compose up`

---

## 🙏 Acknowledgements

Built as our **ROSPL Lab Mini Project**. Thanks to our faculty for the guidance, and to the open-source communities behind FastAPI, Next.js, LangGraph and Presidio, whose documentation taught us most of this.

<div align="center">

**Hardik Agarwal · Ashmit Rawat · Kavya Bhansali · Deepmalika Das**

</div>

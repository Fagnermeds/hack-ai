from langchain.agents import create_sql_agent
from langchain.tools.retriever import create_retriever_tool
from langchain_community.utilities import SQLDatabase
from langchain.schema import Document
from langchain_community.vectorstores import FAISS
from langchain.agents.agent_types import AgentType
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from config_chain import few_shots, tool_description, custom_suffix, custom_prefix
import os

async def chain(question):
  embeddings = OpenAIEmbeddings()

  few_shot_docs = [
      Document(page_content=question, metadata={"sql_query": few_shots[question]})
      for question in few_shots.keys()
  ]
  vector_db = FAISS.from_documents(few_shot_docs, embeddings)
  retriever = vector_db.as_retriever()

  retriever_tool = create_retriever_tool(
      retriever, name="sql_get_similar_examples", description=tool_description
  )
  custom_tool_list = [retriever_tool]

  db = SQLDatabase.from_uri(
    os.environ.get('DB_CONNECTION_STRING'),
    include_tables=[
      "Collaborator",
      "CollaboratorSkills",
      "CollaboratorSchedule",
      "Tower",
      "Team",
      "Allocation",
      "AllocationStatus",
      "Seniority",
      "Permission",
      "Skills",
      "Project",
      "ProjectStatus",
    ],
    sample_rows_in_table_info=2,
  )
  
  llm = ChatOpenAI(model_name="gpt-4",temperature=0)
  toolkit=SQLDatabaseToolkit(db=db, llm=llm)

  agent = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=False,
    agent_type=AgentType.OPENAI_FUNCTIONS,
    extra_tools=custom_tool_list,
    suffix=custom_suffix,
    prefix=custom_prefix,
  )

  result = await executor(agent, question)

  return {'answer':result[len(result)-1]['output']}

async def executor(agent, question):
  chunks = []
  async for chunk in agent.astream({"input": question}):
    chunks.append(chunk)
  return chunks
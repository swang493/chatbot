from langchain.prompts.prompt import PromptTemplate
from langchain_openai import ChatOpenAI
import os
from pypdf import PdfReader
from dotenv import load_dotenv

def fetch_policy_docs_info(policy_dir):
    policy_docs = os.listdir(policy_dir)
    doc_info = ""
    for doc in policy_docs:
        reader = PdfReader(os.path.join(policy_dir, doc))
        doc_info = doc_info + doc + " contains the following content "
        for page in reader.pages[:21]:
            doc_info += page.extract_text()
    return doc_info


def LLM_Query(question):
    # Read the open_API_key and create an .env file with the content as OPENAI_API_KEY=<KEY> in it.
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    load_dotenv(dotenv_path)

    # Make sure to change this.
    policy_dir = r"D:\Learning\LangChain\LangChain101\policy_docs"
    doc_info = fetch_policy_docs_info(policy_dir)

    summary_template = """
        given the document content "{information}" from coastal bank employee handbook, I want you to answer the following question: 
    """ + question

    summary_prompt_template = PromptTemplate(
        input_variables="information", template=summary_template
    )

    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    # Temperature parameter is a measure of how creative the model.

    chain = summary_prompt_template | llm

    result = chain.invoke(input={"information": doc_info})

    print(result)

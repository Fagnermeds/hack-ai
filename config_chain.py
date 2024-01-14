few_shots = {
  'List the collaborators names': 'SELECT "FullName" from "Collaborator"',
  'What the name Skills?': 'SELECT "Id", "Description" FROM public."Skills"',
  'What the teams?': 'SELECT "Id", "Description", "TowerId", FROM "Team"',
  'What is the team description that the collaborator Ígor Moreira is allocated?': 'SELECT "Description" FROM "Team" WHERE "Id" IN (SELECT "TeamId" FROM "Collaborator" WHERE "FullName" = "Ígor Moreira");',
  'How many collaborators are in the team Tribo 2 - Multiverso?': 'SELECT COUNT(*) FROM "Collaborator" WHERE "TeamId" IN (SELECT "Id" FROM "Team" WHERE "Description" = "Tribo 2 - Multiverso")',
  'Get a list of collaborators and their technical skills': 'SELECT c."Id" AS "CollaboratorId", c."FullName" AS "CollaboratorName", s."Description" AS "SkillDescription"FROM "Collaborator" c JOIN  "CollaboratorSkills" cs ON c."Id" = cs."CollaboratorId"JOIN "Skills" s ON cs."SkillsId" = s."Id";',
  'What are the technical skills of the user Igor Moreira?': 'SELECT s."Description" FROM "Collaborator" c JOIN  "CollaboratorSkills" cs ON c."Id" = cs."CollaboratorId"JOIN "Skills" s ON cs."SkillsId" = s."Id" WHERE c."FullName" = "Igor Moreira";',
  'What projects is team Tribo 2 - Multiverso allocated to?': 'SELECT p."Name" FROM "Project" p JOIN "Team" t ON p."TeamId" = t."Id" WHERE t."Description" = "Tribo 2 - Multiverso"',
  'What are the allocation date start and end to collaborator Ígor Moreira?': 'SELECT a."StartDate", a."EndDate" FROM "Allocation" a JOIN "Collaborator" c ON a."CollaboratorId" = c."Id" WHERE c."FullName" = "Ígor Moreira"',
  'When the allocation of collaborator Ígor Moreira end? give me the last month.': 'SELECT MAX("EndDate") AS last_month FROM "Allocation" WHERE "CollaboratorId" = (SELECT "Id" FROM "Collaborator" WHERE "FullName" = "Ígor Moreira")',
  'When will collaborator Ígor Moreira be available for new allocations? Give the end week (the last week)': 'SELECT MAX("EndDate") AS end_week FROM "Allocation" WHERE "CollaboratorId" = (SELECT "Id" FROM "Collaborator" WHERE "FullName" = \'Ígor Moreira\')',
  'Where is Ígor Moreira allocated?': 'SELECT t.Description FROM "Team" t JOIN "Collaborator" c ON t."Id" = c."TeamId" WHERE c."FullName" = "Ígor Moreira"',
  'What is Cauã Barros has team?': 'SELECT t.Description FROM "Team" t JOIN "Collaborator" c ON t."Id" = c."TeamId" WHERE c."FullName" = "Cauã Barros"',
  'What is Cauã Barros team and what project the team have allocation?': 'SELECT t."Description", p."Name" FROM "Team" t JOIN "Project" p ON t."Id" = p."TeamId" JOIN "Collaborator" c ON t."Id" = c."TeamId" WHERE c."FullName" = "Cauã Barros" LIMIT 10',
  'List all collaborators and their respective teams': 'SELECT c."FullName" AS "CollaboratorName", t."Description" AS "TeamDescription" FROM "Collaborator" c LEFT JOIN "Team" t ON c."TeamId" = t."Id";',
  'Find collaborators with skills in both Java and Python': 'SELECT c."FullName" AS "CollaboratorName" FROM "Collaborator" c JOIN "CollaboratorSkills" cs ON c."Id" = cs."CollaboratorId" JOIN "Skills" s ON cs."SkillsId" = s."Id" WHERE s."Description" IN ("Java", "Python") GROUP BY c."FullName" HAVING COUNT(DISTINCT s."Description") = 2;',
  'Retrieve the teams with the highest number of collaborators': 'SELECT t."Description" AS "TeamDescription", COUNT(c."Id") AS "NumberOfCollaborators" FROM "Team" t LEFT JOIN "Collaborator" c ON t."Id" = c."TeamId" GROUP BY t."Description" ORDER BY "NumberOfCollaborators" DESC LIMIT 5;',
  'Identify the projects without any allocations': 'SELECT p."Name" AS "ProjectName" FROM "Project" p LEFT JOIN "Allocation" a ON p."Id" = a."ProjectId" WHERE a."ProjectId" IS NULL;',
  'Retrieve collaborators who have been continuously allocated for the last three months': 'SELECT c."FullName" AS "CollaboratorName" FROM "Collaborator" c JOIN "Allocation" a ON c."Id" = a."CollaboratorId" WHERE a."StartDate" >= CURRENT_DATE - INTERVAL \'3 months\' GROUP BY c."FullName" HAVING COUNT(DISTINCT EXTRACT(MONTH FROM a."StartDate")) = 3;',
  'List teams with at least one collaborator available for new allocations': 'SELECT t."Description" AS "TeamDescription" FROM "Team" t JOIN "Collaborator" c ON t."Id" = c."TeamId" WHERE c."Id" NOT IN (SELECT "CollaboratorId" FROM "Allocation" WHERE CURRENT_DATE BETWEEN "StartDate" AND "EndDate") GROUP BY t."Description";',
  'Find the most requested technical skill among collaborators': 'SELECT s."Description" AS "SkillDescription", COUNT(cs."CollaboratorId") AS "NumberOfCollaborators" FROM "Skills" s LEFT JOIN "CollaboratorSkills" cs ON s."Id" = cs."SkillsId" GROUP BY s."Description" ORDER BY "NumberOfCollaborators" DESC LIMIT 1;',
  'Retrieve collaborators with the earliest and latest allocation dates': 'SELECT c."FullName" AS "CollaboratorName", MIN(a."StartDate") AS "EarliestAllocationDate", MAX(a."EndDate") AS "LatestAllocationDate" FROM "Collaborator" c JOIN "Allocation" a ON c."Id" = a."CollaboratorId" GROUP BY c."FullName";',
  'Find projects with allocations exceeding a specified duration': 'SELECT p."Name" AS "ProjectName", MAX(a."EndDate" - a."StartDate") AS "AllocationDuration" FROM "Project" p JOIN "Allocation" a ON p."Id" = a."ProjectId" GROUP BY p."Name" HAVING MAX(a."EndDate" - a."StartDate") > INTERVAL \'6 months\';',
  'Quais colaboradores não estão alocados na primeira semana de 2024':'SELECT "FullName" FROM "Collaborator" WHERE "Id" NOT IN (SELECT "CollaboratorId" FROM "Allocation" WHERE "StartDate" >= "2024-01-01" AND "EndDate" <= "2024-01-05")',
  'Which employees are not allocated in the first week of 2024':'SELECT "FullName" FROM "Collaborator" WHERE "Id" NOT IN (SELECT "CollaboratorId" FROM "Allocation" WHERE "StartDate" >= "2024-01-01" AND "EndDate" <= "2024-01-05")',
  'Quais colaboradores não estão alocados em 2024':'SELECT "FullName" FROM "Collaborator" WHERE "Id" NOT IN (SELECT "CollaboratorId" FROM "Allocation" WHERE "StartDate" <= "2024-01-01" AND "EndDate" >= "2024-12-31")',
  'Which employees are not allocated in 2024':'SELECT "FullName" FROM "Collaborator" WHERE "Id" NOT IN (SELECT "CollaboratorId" FROM "Allocation" WHERE "StartDate" <= "2024-01-01" AND "EndDate" >= "2024-12-31")',
  'Quais projetos o colaborador Silas Costa está alocado': 'SELECT p."Name" FROM "Allocation" a JOIN "Collaborator" c ON c."Id" = a."CollaboratorId" JOIN "Project" p ON p."Id" = a."ProjectId" WHERE c."FullName" LIKE \'Silas Costa\'',
}

tool_description = """
  Respond in natural language according to the data in the table.
  Be an expert and do the joins correctly.
  If a query was generated and is valid, I should execute the query.
  Be expert and dont be repetitive in your answers.
"""

custom_suffix = """
  I should first get the similar examples I know.
  If the examples are enough to construct the query, I can build it.
  Otherwise, I can then look at the tables in the database to see what I can query.
  Then I should query the schema of the most relevant tables.
"""
custom_prefix="""
  Given an input question, first create a syntactically correct postgresql query to run, then look at the results of the query and return the answer.
  Return clear, simple and objective answers
"""
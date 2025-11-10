// boilerplateGenerator.ts
export function getBoilerplate(
  language: string,
  problem: any,
  GlobalProblems: any
) {
  const input = GlobalProblems.inputArguments;
  const output = GlobalProblems.outputDataType;
  const funcName = (problem.slug || "solution").replace(/[^a-zA-Z0-9_]/g, "_");

  switch (language) {
    case "javascript":
      return `// Write your code below. Types and names are illustrative only.\n// @params: ${input}\n// Return type: ${output}\n\nvar ${funcName} = function(${input
        .split(",")
        .map((a) => a.split(":")[0].trim())
        .join(", ")}){\n\t//Your code goes here.\n};`;

    case "python":
      return `class Solution:\n\tdef ${funcName}(self, ${input}) -> ${output}:\n\t\t#Your solution goes here`;

    case "cpp":
      return `// Write your code below. Types and names are illustrative only.\n\nclass Solution{\npublic:\n\t${output} ${funcName}(${input}) {\n\t\t//Your solution goes here\n\t}\n};`;

    case "java":
      return `// Write your code below. Types and names are illustrative only.\n\nclass Solution{\npublic ${output} ${funcName}(${input}) {\n\t\t//Your solution goes here\n\t}\n}`;

    case "typescript":
      return `// Write your code below. Types and names are illustrative only.\n// @params: ${input}\n// Return type: ${output}\n\nfunction ${funcName}(${input
        .split(",")
        .map((a) => a.split(":")[0].trim())
        .join(", ")}){\n\t//Your code goes here.\n};`;

    default:
      return "// language not supported yet";
  }
}

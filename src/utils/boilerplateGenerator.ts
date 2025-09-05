// boilerplateGenerator.ts
export function getBoilerplate(
  language: string,
  problem: any,
  GlobalProblems: any
) {
  const input = GlobalProblems.input;
  const output = GlobalProblems.output;
  const funcName = (problem.slug || "solution").replace(/[^a-zA-Z0-9_]/g, "_");

  switch (language) {
    case "javascript":
      return `function ${funcName}() {
    /* 
    Ex: Test Case
    Input: ${input}
    Output: ${output}
    */

    // Write your solution here
}`;

    case "python":
      return `def ${funcName}():
    """
    Ex:: Test Case
    Input: ${input}
    Output: ${output}
    """
    #Write your solution here`;

    case "cpp":
      return `auto ${funcName}() {
    /* 
    Ex:: Test Case
    Input: ${input}
    Output: ${output}
    */

    // Write your solution here
}`;

    case "java":
      return `Result ${funcName}() {
    /* 
    Ex:: Test Case
    Input: ${input}
    Output: ${output}
    */
    
    // Write your solution here
}`;
    case "typescript":
      return `function ${funcName}() : any {
    /* 
    Ex:: Test Case
    Input: ${input}
    Output: ${output}
    */
    
    // Write your solution here
}`;

    default:
      return "// language not supported yet";
  }
}

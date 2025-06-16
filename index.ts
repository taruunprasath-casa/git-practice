import { data } from "./data";

enum Delimeters{
  UNDERSCORE = "_",
  DOT = ".",
  SLASH = "/"
}

function split(parts: string[], value: any): Record<string, any> {
  const result: Record<string, any> = {};
  let current = result;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = value; 
    } else {
      if (typeof current[part] !== 'object' || current[part] === null) {
        current[part] = {};
      }
      current = current[part];
    }
  });

  return result;
}


function setPathToTheKey(target: Record<string, any>, source: Record<string, any>): void {
  for (const key in source) {
    if (
      key in target &&
      typeof target[key] === "object" &&
      typeof source[key] === "object"
    ) {
      setPathToTheKey(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

function splitObject(object: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in object) {
    const nested = split(key.split(Delimeters.UNDERSCORE), object[key]);
    setPathToTheKey(result, nested);
  }

  return result;
}

const main = () => {
  console.log(JSON.stringify(splitObject(data), null, 2));
};

main();

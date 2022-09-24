export type Rules = Array<[string, string]>;

export const rules: Rules = [
  // NoParse
  ["/{3}\\s?([^\\n]+)", "$1"],
  //   //bold, italics and paragragh rules
  //   [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
  //   [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
  //   [/__([^_]+)__/g, "<b>$1</b>"],
  //   [/_([^_`]+)_/g, "<i>$1</i>"],
  //   [/([^\n]+\n?)/g, "<p>$1</p>"],

  //   //links
  //   [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>'],

  //   //highlights
  //   [
  //     /(`)(\s?[^\n,]+\s?)(`)/g,
  //     '<a style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</a>',
  //   ],

  //   //Lists
  //   [/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$3</li></ul>"],
  //   [/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$3</li></ul>"],

  //   //Image
  //   [/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g, '<img src="$2" alt="$1" title="$3" />'],
];

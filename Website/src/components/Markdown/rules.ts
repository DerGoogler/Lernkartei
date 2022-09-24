export const rules = [
  // Headers
  [/#{6}\s?(([^\n]+)?\s)#{6}(?:\n|$)/g, "<divider><h6>$2</h6></divider>"],
  [/#{5}\s?(([^\n]+)?\s)#{5}(?:\n|$)/g, "<divider><h5>$2</h5></divider>"],
  [/#{4}\s?(([^\n]+)?\s)#{4}(?:\n|$)/g, "<divider><h4>$2</h4></divider>"],
  [/#{3}\s?(([^\n]+)?\s)#{3}(?:\n|$)/g, "<divider><h3>$2</h3></divider>"],
  [/#{2}\s?(([^\n]+)?\s)#{2}(?:\n|$)/g, "<divider><h2>$2</h2></divider>"],
  [/#{1}\s?(([^\n]+)?\s)#{1}(?:\n|$)/g, "<divider><h1>$2</h1></divider>"],

  // Marks
  [/{{checkmark}}/g, "<checkmark/>"],
  [/{{warnmark}}/g, "<warnmark/>"],
  [/{{dangermark}}/g, "<dangermark/>"],

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

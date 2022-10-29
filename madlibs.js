/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

function parseStory(rawStory) {
  // Your code here.

  let dataArr = [];

  let noun = /\[n\]/;
  let adjective = /\[adj\]/;
  let verb = /\[v\]/;
  let allSigns = /[.,;\s]/g;
  let allText = rawStory.split(" ");

  allText.forEach((singleText) => {
    let updatedText = singleText.replace(allSigns, "");
    if (noun.test(updatedText)) {
      let singleObject = {};
      singleObject.word = updatedText.slice(0, -3);
      singleObject.pos = "noun";
      dataArr.push(singleObject);
    } else if (adjective.test(updatedText)) {
      let singleObject = {};
      singleObject.word = updatedText.slice(0, -5);
      singleObject.pos = "adjective";
      dataArr.push(singleObject);
    } else if (verb.test(updatedText)) {
      let singleObject = {};
      singleObject.word = updatedText.slice(0, -3);
      singleObject.pos = "verb";
      dataArr.push(singleObject);
    } else {
      let singleObject = {};
      singleObject.word = updatedText;
      dataArr.push(singleObject);
    }
  });
  return dataArr; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    /*Defining variables for HTML */
    const paragraphElEdit = document.createElement("p");
    const paragraphElPrev = document.createElement("p");

    const madLibsEditDiv = document.querySelector(".madLibsEdit");
    const madLibsPreviewDiv = document.querySelector(".madLibsPreview");

    const headingforEditDiv = document.createElement("h2");
    const headingforPrevDiv = document.createElement("h2");

    headingforEditDiv.innerText = "Welcome to Halloween Mad Libs";
    headingforPrevDiv.innerHTML = "Welcome to Halloween Mad Libs";

    madLibsEditDiv.append(headingforEditDiv);
    madLibsPreviewDiv.append(headingforPrevDiv);

    processedStory.map((singleWord, index) => {
      const spanElEdit = document.createElement("span");
      const spanElPrev = document.createElement("span");
      const { word, pos } = singleWord;
      /*Adding words into both prev and Edit*/
      if (word) {
        spanElEdit.innerText += ` ${word}  `;
        spanElPrev.innerText += ` ${word}  `;
        paragraphElEdit.append(spanElEdit);
        paragraphElPrev.append(spanElPrev);

        madLibsEditDiv.append(paragraphElEdit);
        madLibsPreviewDiv.append(paragraphElPrev);
      }
      /*Replacing  nouns,adj and verbs with input field*/
      if (pos) {
        spanElEdit.innerHTML = `<input type="text" placeholder=${pos} class="input-edit" id='input-${index}'>`;

        spanElPrev.innerHTML = `<input type="text" placeholder="fill mee" class="input-preview"  id='input-${index}'>`;
      }
    });

    /* Defining all input field for Edit &Prev*/
    const allSpanElEdit = document.querySelectorAll(".input-edit");
    const allSpanPrev = document.querySelectorAll(".input-preview");

    allSpanElEdit.forEach((oneSpanEl, indexEdit) => {
      oneSpanEl.addEventListener("input", (e) => {
        allSpanPrev.forEach((allPrev, indexPrev) => {
          if (indexEdit === indexPrev) {
            allPrev.setAttribute("value", e.target.value);
          }
        });
      });
    });
  });

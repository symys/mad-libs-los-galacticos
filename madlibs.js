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
    convertToParagraph(processedStory);
    //console.log(processedStory)
  });

function convertToParagraph(rawStory) {
  const headEdit = document.createElement("h2");
  const headPreview = document.createElement("h2");
  const editingClass = document.querySelector(".madLibsEdit");
  const editingParagraph = document.createElement("p");
  headEdit.innerText = "Halloween";
  editingClass.appendChild(headEdit);
  editingClass.appendChild(editingParagraph);

  const previewClass = document.querySelector(".madLibsPreview");
  const previewParagraph = document.createElement("p");
  headPreview.innerText = "Halloween";
  previewClass.appendChild(headPreview);
  previewClass.appendChild(previewParagraph);

  rawStory.forEach((element, index) => {
    if (element.pos) {
      const input = document.createElement("input");
      // input.setAttribute("id", `${index}Edit`);
      input.className = "editInput";
      const inputPreview = document.createElement("input");
      inputPreview.setAttribute("id", `${index}Preview`);
      inputPreview.className = "inputPreview";
      input.type = "text";
      input.placeholder = `write a ${element.pos}`;

      editingParagraph.appendChild(input);
      //document.addEventListener("change", previewParagraph.append(getValue(input)))
      previewParagraph.appendChild(inputPreview);
    } else {
      editingParagraph.append(`${element.word} `);
      previewParagraph.append(` ${element.word} `);
    }
  });

  const allEditedIput = document.querySelectorAll(".editInput");
  const allPreviewInput = document.querySelectorAll(".inputPreview");

  allEditedIput.forEach((inputField, indexEdit) => {
    inputField.setAttribute("id", `${indexEdit}Edit`);
    inputField.addEventListener("input", (e) => {
      allPreviewInput.forEach((previewInputField, indexPreview) => {
        if (indexEdit === indexPreview) {
          previewInputField.value = e.target.value;
        }
      });
    });
    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const getNextEditedInput = document.getElementById(
          `${indexEdit + 1}Edit`
        );

        if (allEditedIput.length > indexEdit + 1) {
          getNextEditedInput.focus();
        } else {
          alert("There are no other Inputs to be filled sorry");
        }
      }
    });
  });
}

function getValue(element) {
  element.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    return inputValue;
  });
}

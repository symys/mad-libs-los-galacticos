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

  let dot = /[.]/g;
  let comma = /[,] /g;

  rawStory.replace(dot, " .");
  rawStory.replace(comma, " , ");
  let allText = rawStory.split(" ");

  allText.forEach((singleText) => {
    if (noun.test(singleText)) {
      let singleObject = {};
      singleObject.word = singleText.slice(0, -3);
      singleObject.pos = "noun";
      dataArr.push(singleObject);
    } else if (adjective.test(singleText)) {
      let singleObject = {};
      singleObject.word = singleText.slice(0, -5);
      singleObject.pos = "adjective";
      dataArr.push(singleObject);
    } else if (verb.test(singleText)) {
      let singleObject = {};
      singleObject.word = singleText.slice(0, -3);
      singleObject.pos = "verb";
      dataArr.push(singleObject);
    } else {
      let singleObject = {};
      singleObject.word = singleText;
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

//!! Globally declared DOM elements
const previewClass = document.querySelector(".madLibsPreview");
const editingClass = document.querySelector(".madLibsEdit");
const btnWelcome = document.querySelector(".btn-welcome");

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    convertToParagraph(processedStory);
  });

function convertToParagraph(rawStory) {
  //!created html elements
  const headerEdit = document.createElement("h2");
  const headerPreview = document.createElement("h2");

  const resetBtn = document.createElement("button");
  const editingParagraph = document.createElement("p");

  headerEdit.innerText = "Story of Untold";
  resetBtn.innerText = "Reset";

  editingClass.appendChild(headerEdit);
  headerEdit.appendChild(resetBtn);
  editingClass.appendChild(editingParagraph);

  const previewParagraph = document.createElement("p");
  headerPreview.innerText = "Story of Untold";
  previewClass.appendChild(headerPreview);
  previewClass.appendChild(previewParagraph);

  rawStory.forEach((element, index) => {
    if (element.pos) {
      //!INPUTS for EditMadLibs
      const editInput = document.createElement("input");
      editInput.className = "editInput";
      editInput.type = "text";
      editInput.placeholder = `write ${
        element.pos === "adjective" ? "an" : "a"
      } ${element.pos}`;
      editingParagraph.appendChild(editInput);

      //!INPUTS for PreviewMadLibs
      const inputPreview = document.createElement("input");
      inputPreview.setAttribute("id", `${index}Preview`);
      inputPreview.className = "inputPreview";
      previewParagraph.appendChild(inputPreview);
    } else {
      //!If there is no pos we automatically append words..
      editingParagraph.append(`${element.word} `);
      previewParagraph.append(` ${element.word} `);
    }
  });

  //?Defining All inputs for both edit&preview part
  const allEditedIput = document.querySelectorAll(".editInput");
  const allPreviewInput = document.querySelectorAll(".inputPreview");

  //!first looping through allEditedInputs
  allEditedIput.forEach((inputField, indexEdit) => {
    inputField.setAttribute("id", `${indexEdit}Edit`);
    inputField.setAttribute("maxlength", "20");

    /*RESET button for edit input field  */
    resetBtn.addEventListener("click", () => {
      inputField.value = "";
    });

    inputField.addEventListener("input", (e) => {
      allPreviewInput.forEach((previewInputField, indexPreview) => {
        //!we dynamically eject editInput value to previewInputField value
        if (indexEdit === indexPreview) {
          previewInputField.value = e.target.value;
        }
      });
    });

    /*HOTKEYS */
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

  //!second looping through allPreviewInputFields
  allPreviewInput.forEach((previewInputField) => {
    /*Reset Button for preview input field */
    resetBtn.addEventListener("click", () => {
      previewInputField.value = "";
    });

    //! making previewInputs read only, users not allowed to make changes
    previewInputField.setAttribute("readonly", "");
  });
}

function getStarted() {
  document.getElementById("my-audio").play();
  previewClass.style.display = "block";
  editingClass.style.display = "block";
  btnWelcome.style.display = "none";
}
btnWelcome.addEventListener("click", getStarted);

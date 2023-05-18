"use strict";
(() => {
var exports = {};
exports.id = 838;
exports.ids = [838];
exports.modules = {

/***/ 2606:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Game)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./pages/Game/game.js
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../Components/GameHeader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());






const arr = [];
function Game() {
    const { 0: score , 1: setScore  } = (0,external_react_.useState)(0);
    const { 0: word , 1: setWord  } = (0,external_react_.useState)("");
    const { 0: wordArr , 1: setWordArr  } = (0,external_react_.useState)([]);
    const { 0: selectedWord , 1: setSelectedWord  } = (0,external_react_.useState)(arr);
    const { 0: clickLetter , 1: setClickLetter  } = (0,external_react_.useState)(false);
    const { 0: wordDisplay , 1: setWordDisplay  } = (0,external_react_.useState)("");
    const { 0: disabledButtons , 1: setDisabledButtons  } = (0,external_react_.useState)([]);
    const { 0: apiWords , 1: setApiWords  } = (0,external_react_.useState)([]);
    const { 0: alert , 1: setAlert  } = (0,external_react_.useState)("");
    const { 0: congrats , 1: setCongrats  } = (0,external_react_.useState)("");
    const { 0: fiveLetterWord , 1: setFiveLetterWord  } = (0,external_react_.useState)([
        "",
        "",
        "",
        "",
        ""
    ]);
    const { 0: fourLetterWord , 1: setFourLetterWord  } = (0,external_react_.useState)([
        "",
        "",
        "",
        ""
    ]);
    const { 0: threeLetterWord , 1: setThreeLetterWord  } = (0,external_react_.useState)([
        "",
        "",
        ""
    ]);
    const { 0: twoLetterWord , 1: setTwoLetterWord  } = (0,external_react_.useState)([
        "",
        ""
    ]);
    const { 0: btnText , 1: setBtnText  } = (0,external_react_.useState)("Start Game");
    const { 0: stage , 1: setStage  } = (0,external_react_.useState)(1);
    const fiveArr = [
        0,
        1,
        2,
        3,
        4
    ];
    const fourArr = [
        0,
        1,
        2,
        3
    ];
    const threeArr = [
        0,
        1,
        2
    ];
    const twoArr = [
        0,
        1
    ];
    const fetchWords = async ()=>{
        const response = await external_axios_default().get("https://raw.githubusercontent.com/IdyUkpong/Words-Api/main/index.json");
        setApiWords(response.data);
    };
    const fiveLetterWords = apiWords.filter((word)=>word.length === 5);
    const startGame = ()=>{
        const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
        const randomWord = fiveLetterWords[randomIndex];
        const characters = randomWord.split("");
        for(let i = characters.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [characters[i], characters[j]] = [
                characters[j],
                characters[i]
            ];
        }
        const scrambledWord = characters.join("");
        const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        setWord(scrambledWord.toUpperCase() + randomLetter.toUpperCase());
        setWordArr((scrambledWord.toUpperCase() + randomLetter.toUpperCase()).split(""));
        setBtnText("Restart Game");
        if (btnText === "Restart Game") {
            setScore(score - score % 14);
            setFiveLetterWord([
                "",
                "",
                "",
                "",
                ""
            ]);
            setFourLetterWord([
                "",
                "",
                "",
                ""
            ]);
            setThreeLetterWord([
                "",
                "",
                ""
            ]);
            setTwoLetterWord([
                "",
                ""
            ]);
        }
    };
    const rearrangeWord = ()=>{
        const characters = word.split("");
        for(let i = characters.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [characters[i], characters[j]] = [
                characters[j],
                characters[i]
            ];
        }
        const scrambledWord = characters.join("");
        setWordArr(scrambledWord.toUpperCase().split(""));
    };
    const selectLetter = (letter, index)=>{
        if (wordDisplay.length === 5) {
            return;
        }
        arr.push(letter);
        setSelectedWord(arr);
        setWordDisplay(selectedWord.join(""));
        setClickLetter(true);
        setDisabledButtons([
            ...disabledButtons,
            index
        ]);
    };
    const submitWord = ()=>{
        if (!apiWords.includes(wordDisplay.toLowerCase()) && selectedWord.length > 1) {
            setAlert("Invalid word");
            setTimeout(function() {
                setAlert("");
            }, 2000);
        } else {
            if (selectedWord.length < 2) {
                return;
            } else if (selectedWord.length === 2 && twoLetterWord.includes("")) {
                setTwoLetterWord(wordDisplay.split(""));
                setScore(score + 2);
            } else if (selectedWord.length === 3 && threeLetterWord.includes("")) {
                setThreeLetterWord(wordDisplay.split(""));
                setScore(score + 3);
            } else if (selectedWord.length === 4 && fourLetterWord.includes("")) {
                setFourLetterWord(wordDisplay.split(""));
                setScore(score + 4);
            } else if (selectedWord.length === 5 && fiveLetterWord.includes("")) {
                setFiveLetterWord(wordDisplay.split(""));
                setScore(score + 5);
            }
        }
        arr.length = 0;
        setClickLetter(false);
        setDisabledButtons([]);
        setWordDisplay("");
    };
    const newGame = ()=>{
        if (!fiveLetterWord.includes("") && !fourLetterWord.includes("") && !threeLetterWord.includes("") && !twoLetterWord.includes("")) {
            setCongrats("Congratulations you can now proceed to the next stage");
            setTimeout(function() {
                setWordArr([]);
                setDisabledButtons([]);
                setFiveLetterWord([
                    "",
                    "",
                    "",
                    "",
                    ""
                ]);
                setFourLetterWord([
                    "",
                    "",
                    "",
                    ""
                ]);
                setThreeLetterWord([
                    "",
                    "",
                    ""
                ]);
                setTwoLetterWord([
                    "",
                    ""
                ]);
                setCongrats("");
                setStage(stage + 1);
                startGame();
            }, 3000);
        }
    };
    const clearWord = ()=>{
        arr.length = 0;
        setSelectedWord(arr);
        setWordDisplay(selectedWord.join(""));
        setDisabledButtons([]);
    };
    (0,external_react_.useEffect)(()=>{
        newGame();
        fetchWords();
    }, [
        newGame
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "game-ctn",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../Components/GameHeader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "game-body-ctn",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: !congrats && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "score",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                children: [
                                    score,
                                    " SMC"
                                ]
                            })
                        })
                    }),
                    !congrats && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        className: "stage",
                        children: [
                            "Stage ",
                            stage
                        ]
                    }),
                    !congrats && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "input-container",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "first-row",
                                children: fiveArr.map((index)=>/*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        value: fiveLetterWord[index],
                                        className: "input-field",
                                        disabled: true
                                    }, index))
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "second-row",
                                children: fourArr.map((index)=>/*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        value: fourLetterWord[index],
                                        className: "input-field",
                                        disabled: true
                                    }, index))
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "second-row",
                                children: threeArr.map((index)=>/*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        value: threeLetterWord[index],
                                        className: "input-field",
                                        disabled: true
                                    }, index))
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "second-row",
                                children: twoArr.map((index)=>/*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        value: twoLetterWord[index],
                                        className: "input-field",
                                        disabled: true
                                    }, index))
                            })
                        ]
                    }),
                    congrats && /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "congrats",
                        children: congrats
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "container",
                        children: !congrats && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "box",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: alert
                                }),
                                clickLetter && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "word-display",
                                    children: [
                                        wordDisplay,
                                        " ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: submitWord,
                                            children: "Submit"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: clearWord,
                                            children: "Clear"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "letter-btns",
                                    children: wordArr.map((letter, index)=>/*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "word-btn",
                                            onClick: ()=>{
                                                selectLetter(letter, index);
                                            },
                                            disabled: disabledButtons.includes(index),
                                            children: letter
                                        }, index))
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "btns",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "start-btn",
                                            onClick: startGame,
                                            children: btnText
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "rearrange",
                                            onClick: rearrangeWord,
                                            children: "Shuffle"
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2606));
module.exports = __webpack_exports__;

})();
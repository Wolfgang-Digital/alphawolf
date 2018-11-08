export const dummySurveyData = [
  {
    "_id": {
        "$oid": "5be1c4386f15ba4d09b14e73"
    },
    "isResolved": false,
    "userResponses": [
        {
            "$oid": "5ba7c633eb5d2454452b847e"
        }
    ],
    "_author": {
        "$oid": "5ba7c633eb5d2454452b847e",
        "username": "Fionn"
    },
    "title": "This Is A Real Survey",
    "description": "This is a description of a real survey.",
    "questions": [
        {
            "options": [],
            "isRequired": true,
            "_id": {
                "$oid": "5be1c4386f15ba4d09b14e77"
            },
            "id": "5340bc10-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": "What is your name?",
            "type": "text"
        },
        {
            "options": [
                "Male",
                "Female",
                "Other"
            ],
            "isRequired": false,
            "_id": {
                "$oid": "5be1c4386f15ba4d09b14e76"
            },
            "id": "574f8d90-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": "What is your gender?",
            "type": "multiple"
        },
        {
            "options": [
                "0 - 1 year",
                "1 - 2 years",
                "2 - 5 years",
                "5 - 10 years"
            ],
            "isRequired": true,
            "_id": {
                "$oid": "5be1c4386f15ba4d09b14e75"
            },
            "id": "5793e990-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": "How long have you been working at Wolfgang?",
            "type": "multiple"
        },
        {
            "options": [],
            "isRequired": false,
            "_id": {
                "$oid": "5be1c4386f15ba4d09b14e74"
            },
            "id": "a89d9c00-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": "What would you do to make Wolfgang better?",
            "type": "text"
        }
    ],
    "answers": [
        {
            "option": -1,
            "_id": {
                "$oid": "5be1c44b6f15ba4d09b14e7b"
            },
            "questionId": "a89d9c00-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": "Some text answer"
        },
        {
            "option": 2,
            "_id": {
                "$oid": "5be1c44b6f15ba4d09b14e7a"
            },
            "questionId": "5793e990-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": ""
        },
        {
            "option": 2,
            "_id": {
                "$oid": "5be1c44b6f15ba4d09b14e79"
            },
            "questionId": "574f8d90-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": ""
        },
        {
            "option": -1,
            "_id": {
                "$oid": "5be1c44b6f15ba4d09b14e78"
            },
            "questionId": "5340bc10-e1e2-11e8-8650-0b27ac6ac7a8",
            "text": "Fionn"
        },
        {
          "option": -1,
          "_id": {
              "$oid": "5be1c44b6f15ba4d09b14e7b"
          },
          "questionId": "a89d9c00-e1e2-11e8-8650-0b27ac6ac7a8",
          "text": "Some answer here.."
      },
      {
          "option": 1,
          "_id": {
              "$oid": "5be1c44b6f15ba4d09b14e7a"
          },
          "questionId": "5793e990-e1e2-11e8-8650-0b27ac6ac7a8",
          "text": ""
      },
      {
          "option": 1,
          "_id": {
              "$oid": "5be1c44b6f15ba4d09b14e79"
          },
          "questionId": "574f8d90-e1e2-11e8-8650-0b27ac6ac7a8",
          "text": ""
      },
      {
          "option": -1,
          "_id": {
              "$oid": "5be1c44b6f15ba4d09b14e78"
          },
          "questionId": "5340bc10-e1e2-11e8-8650-0b27ac6ac7a8",
          "text": "Jody"
      }
    ],
    "createdAt": {
        "$date": "2018-11-06T16:41:28.153Z"
    },
    "updatedAt": {
        "$date": "2018-11-06T16:41:47.429Z"
    },
    "__v": 1
  }
];
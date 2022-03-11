const surveys = [
  {
    id: 1,
    title: 'This is a test surver',
    status: 'draft',
    description: 'hi this is a survey description .',
    created_at: '2022-12-20 18:00:00',
    updated_at: '2022-12-20 18:00:00',
    expire_date: '2022-12-31 18:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'from which country are you?',
        description: 'hello baby',
        options: [{ option: 'usa' }, { option: 'germany' }, { option: 'Tunisia' }],
      },
    ],
  },
];

//       {
//         id: 2,
//         type: 'checkbox',
//         question: 'Which languages di you speek ?',
//         description: 'lorem',
//         data: {
//           options: [{ text: 'french' }, { text: 'english' }, { text: 'arabic' }],
//         },
//       },
//       {
//         id: 3,
//         question: 'which javascripti frameworks you like?',
//         type: 'checkbox',
//         description: 'some description',
//         data: {
//           options: [{ text: 'vuejs' }, { text: 'react' }, { text: 'angular' }],
//         },
//       },
//       {
//         id: 4,
//         question: 'Which backend Framwork do you love ?',
//         description: 'lorem ipsum',
//         type: 'radio',
//         data: {
//           options: [{ text: 'nodeJs' }, { text: 'laravel' }, { text: 'Ruby on rails' }],
//         },
//       },

//       { id: 5, question: 'What is your favorite youtube channel', type: 'text', description: null, data: {} },

//       {
//         id: 6,
//         question: 'Describe yourself in a few words',
//         type: 'textarea',
//         description: 'lorem Ipsum',
//         data: {},
//       },
//     ],
//   },
// ];

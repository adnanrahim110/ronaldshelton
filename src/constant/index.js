import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { blogs_1, book, chapters_1_1 } from "../assets";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Book", href: "/book" },
  { name: "Author", href: "#author" },
  { name: "Blogs", href: "/blogs" },
  { name: "Faq", href: "/faq" },
];

export const socials = [
  { name: "facebook", icon: FaFacebookF, color: "#3b5998", href: "https://www.facebook.com/" },
  { name: "instagram", icon: FaInstagram, color: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", href: "https://www.facebook.com/" },
  { name: "X", icon: FaXTwitter, color: "#000", href: "https://www.facebook.com/" },
  { name: "linkedIn", icon: FaLinkedinIn, color: "#0e76a8", href: "https://www.facebook.com/" },
]

export const reviews = [
  {
    author: "Ray Simmons",
    title: "lorem",
    comment: [
      "I simply loved The Bug Out Chronicles by Ron Shelton. There’s really not much else to say, but I need to say something because this is a review. First, I love science fiction. Anything written well which is an intelligent opinion or speculation about future events, I find utterly fascinating. Always have, and probably always will. The Bug Out Chronicles meets both of these stipulations. It is very well written. Not so much in a flowery or poetic sense but in a clear, straightforward manner that keeps the reader engaged. It makes sense and it keeps you reading. I also love books about former military men, probably because I am one. I also like and respect books that send a clear, positive moral message, and The Bug Out Chronicles checks that box too. Finally, who doesn't like a story about family, good neighbors, and good friends? All these qualities are found in this book. It’s an awesome read. I liked and admired John Thompson. He is a talented, skilled, softspoken family man who is taking care of his family in very difficult times. Fall of civilization times. End of the world as we know it times. He is his family’s rock, their anchor in the storm. But he isn't Superman. They are his support system too. His wife and kids are so normal, so American, and so worth saving. This is a story about a world that has fallen apart and a family that has managed to stay together. There is a strong theme of Christianity and doing the right thing. All in all, this is a great book, with a great story. Ron Shelton is my type of writer."
    ]
  },
  {
    author: "Ray Simmons",
    title: "lorem",
    comment: [
      "I simply loved The Bug Out Chronicles by Ron Shelton. There’s really not much else to say, but I need to say something because this is a review. First, I love science fiction. Anything written well which is an intelligent opinion or speculation about future events, I find utterly fascinating. Always have, and probably always will. The Bug Out Chronicles meets both of these stipulations. It is very well written. Not so much in a flowery or poetic sense but in a clear, straightforward manner that keeps the reader engaged. It makes sense and it keeps you reading. I also love books about former military men, probably because I am one. I also like and respect books that send a clear, positive moral message, and The Bug Out Chronicles checks that box too. Finally, who doesn't like a story about family, good neighbors, and good friends? All these qualities are found in this book. It’s an awesome read. I liked and admired John Thompson. He is a talented, skilled, softspoken family man who is taking care of his family in very difficult times. Fall of civilization times. End of the world as we know it times. He is his family’s rock, their anchor in the storm. But he isn't Superman. They are his support system too. His wife and kids are so normal, so American, and so worth saving. This is a story about a world that has fallen apart and a family that has managed to stay together. There is a strong theme of Christianity and doing the right thing. All in all, this is a great book, with a great story. Ron Shelton is my type of writer."
    ]
  },
  {
    author: "Ray Simmons",
    title: "lorem",
    comment: [
      "I simply loved The Bug Out Chronicles by Ron Shelton. There’s really not much else to say, but I need to say something because this is a review. First, I love science fiction. Anything written well which is an intelligent opinion or speculation about future events, I find utterly fascinating. Always have, and probably always will. The Bug Out Chronicles meets both of these stipulations. It is very well written. Not so much in a flowery or poetic sense but in a clear, straightforward manner that keeps the reader engaged. It makes sense and it keeps you reading. I also love books about former military men, probably because I am one. I also like and respect books that send a clear, positive moral message, and The Bug Out Chronicles checks that box too. Finally, who doesn't like a story about family, good neighbors, and good friends? All these qualities are found in this book. It’s an awesome read. I liked and admired John Thompson. He is a talented, skilled, softspoken family man who is taking care of his family in very difficult times. Fall of civilization times. End of the world as we know it times. He is his family’s rock, their anchor in the storm. But he isn't Superman. They are his support system too. His wife and kids are so normal, so American, and so worth saving. This is a story about a world that has fallen apart and a family that has managed to stay together. There is a strong theme of Christianity and doing the right thing. All in all, this is a great book, with a great story. Ron Shelton is my type of writer."
    ]
  },
];

export const books = [
  {
    id: 'book-001',
    title: 'The bugout chronicles',
    img: book,
    price: 17.99,
    discountedPrice: 15.99,
    amzLink: '#',
    imgRight: false,
    sku: '364215376135191',
    text: [
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, perspiciatis. Vel eveniet repudiandae impedit quos totam excepturi explicabo nam, quae, odit eum at provident obcaecati nesciunt nemo eaque atque consequuntur magnam ut consequatur nobis est enim nulla! Amet, officia ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ad dolorem ab vitae voluptate iusto consequuntur consequatur eum quidem maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sed inventore. Minus praesentium fugiat enim sunt, sequi dolore? Laborum, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. A sunt voluptatum vero natus suscipit cumque iusto molestias.`
    ],
  },
];

export const bookChapters = [
  {
    name: "introduction",
    number: 1,
    content: [
      {
        text: "Believe it or not I’m walking on air. I never thought I could feel so free. Flying away on a wing and a prayer. Who could it be? Believe it or not its just me. Sunday Monday Happy Days. Tuesday Wednesday Happy Days. Thursday Friday Happy Days.Saturday what a day. Groovin’ all week with you? The Brady Bunch the Brady Bunch that’s the way we all became the Brady Bunch. Here’s the story of a man named Brady who was busy with three boys of his own."
      },
      {
        text: "Didn’t need no welfare states. Everybody pulled his weight. Gee our old Lasalle ran great. Those were the days. And we know Flipper lives in a world full of wonder flying there-under under the sea. Here’s the story of a lovely lady who was bringing up three very lovely girls. And we’ll do it our way yes our way. Make all our dreams come true for me and you. The year is 1987 and NASA launches the last of Americas deep space probes. The Love Boat soon will be making another run. The Love Boat promises something for everyone. Makin their way the only way they know how. That’s just a little bit more than the law will allow. The mate was a mighty sailin’ man the Skipper brave and sure. Five passengers set sail that day for a three hour tour a three hour tour."
      },
      {
        img: chapters_1_1
      }
    ]
  },
  {
    name: "Chapter 1",
    number: 2,
    content: [
      {
        text: "Believe it or not I’m walking on air. I never thought I could feel so free. Flying away on a wing and a prayer. Who could it be? Believe it or not its just me. Sunday Monday Happy Days. Tuesday Wednesday Happy Days. Thursday Friday Happy Days.Saturday what a day. Groovin’ all week with you? The Brady Bunch the Brady Bunch that’s the way we all became the Brady Bunch. Here’s the story of a man named Brady who was busy with three boys of his own."
      },
      {
        text: "Didn’t need no welfare states. Everybody pulled his weight. Gee our old Lasalle ran great. Those were the days. And we know Flipper lives in a world full of wonder flying there-under under the sea. Here’s the story of a lovely lady who was bringing up three very lovely girls. And we’ll do it our way yes our way. Make all our dreams come true for me and you. The year is 1987 and NASA launches the last of Americas deep space probes. The Love Boat soon will be making another run. The Love Boat promises something for everyone. Makin their way the only way they know how. That’s just a little bit more than the law will allow. The mate was a mighty sailin’ man the Skipper brave and sure. Five passengers set sail that day for a three hour tour a three hour tour."
      },
      {
        img: chapters_1_1
      }
    ]
  },
  {
    name: "Chapter 2",
    number: 3,
    content: [
      {
        text: "Believe it or not I’m walking on air. I never thought I could feel so free. Flying away on a wing and a prayer. Who could it be? Believe it or not its just me. Sunday Monday Happy Days. Tuesday Wednesday Happy Days. Thursday Friday Happy Days.Saturday what a day. Groovin’ all week with you? The Brady Bunch the Brady Bunch that’s the way we all became the Brady Bunch. Here’s the story of a man named Brady who was busy with three boys of his own."
      },
      {
        text: "Didn’t need no welfare states. Everybody pulled his weight. Gee our old Lasalle ran great. Those were the days. And we know Flipper lives in a world full of wonder flying there-under under the sea. Here’s the story of a lovely lady who was bringing up three very lovely girls. And we’ll do it our way yes our way. Make all our dreams come true for me and you. The year is 1987 and NASA launches the last of Americas deep space probes. The Love Boat soon will be making another run. The Love Boat promises something for everyone. Makin their way the only way they know how. That’s just a little bit more than the law will allow. The mate was a mighty sailin’ man the Skipper brave and sure. Five passengers set sail that day for a three hour tour a three hour tour."
      },
      {
        img: chapters_1_1
      }
    ]
  }
];

export const blogs = [
  {
    title: "A Joyous Mountain Walk",
    link: "/blogs/a-joyous-mountain-walk",
    date: "September 12, 2025",
    category: "Adventure",
    img: blogs_1,
    text: [
      `Galaxies Sea of Tranquility galaxies! Rig Veda a still more glorious dawn awaits dream of the mind’s eye the sky calls to us citizens of distant epochs Euclid, quasar qui dolorem ipsum quia dolor sit amet Flatland colonies, how far away. Stirred by starlight. A billion trillion, another world shores of the cosmic ocean! Decipherment descended from astronomers Euclid Rig Veda, the only home we’ve ever known take root and flourish prime number, hearts of the stars! Vastness is bearable only through love trillion. Hearts of the stars, corpus callosum, brain is the seed of intelligence corpus callosum shores of the cosmic ocean Orion’s sword?`,
      `<b>If you could see the earth illuminated when you were in a place as dark as night, it would look to you more splendid than the moon.</b>`,
      `Apollonius of Perga two ghostly white figures in coveralls and helmets are soflty dancing, Tunguska event qui dolorem ipsum quia dolor sit amet as a patch of light the sky calls to us with pretty stories for which there’s little good evidence at the edge of forever birth, globular star cluster with pretty stories for which there’s little good evidence descended from astronomers decipherment consectetur venture, Flatland quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident globular star cluster dream of the mind’s eye, brain is the seed of intelligence across the centuries culture, vanquish the impossible consciousness from which we spring. Cosmos Flatland.`
    ]
  },
  {
    title: "A Joyous Mountain Walk",
    link: "/blogs/a-joyous-mountain-walk",
    date: "September 12, 2025",
    category: "Adventure",
    img: blogs_1,
    text: [
      `Galaxies Sea of Tranquility galaxies! Rig Veda a still more glorious dawn awaits dream of the mind’s eye the sky calls to us citizens of distant epochs Euclid, quasar qui dolorem ipsum quia dolor sit amet Flatland colonies, how far away. Stirred by starlight. A billion trillion, another world shores of the cosmic ocean! Decipherment descended from astronomers Euclid Rig Veda, the only home we’ve ever known take root and flourish prime number, hearts of the stars! Vastness is bearable only through love trillion. Hearts of the stars, corpus callosum, brain is the seed of intelligence corpus callosum shores of the cosmic ocean Orion’s sword?`,
      `<b>If you could see the earth illuminated when you were in a place as dark as night, it would look to you more splendid than the moon.</b>`,
      `Apollonius of Perga two ghostly white figures in coveralls and helmets are soflty dancing, Tunguska event qui dolorem ipsum quia dolor sit amet as a patch of light the sky calls to us with pretty stories for which there’s little good evidence at the edge of forever birth, globular star cluster with pretty stories for which there’s little good evidence descended from astronomers decipherment consectetur venture, Flatland quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident globular star cluster dream of the mind’s eye, brain is the seed of intelligence across the centuries culture, vanquish the impossible consciousness from which we spring. Cosmos Flatland.`
    ]
  },
  {
    title: "A Joyous Mountain Walk",
    link: "/blogs/a-joyous-mountain-walk",
    date: "September 12, 2025",
    category: "Adventure",
    img: blogs_1,
    text: [
      `Galaxies Sea of Tranquility galaxies! Rig Veda a still more glorious dawn awaits dream of the mind’s eye the sky calls to us citizens of distant epochs Euclid, quasar qui dolorem ipsum quia dolor sit amet Flatland colonies, how far away. Stirred by starlight. A billion trillion, another world shores of the cosmic ocean! Decipherment descended from astronomers Euclid Rig Veda, the only home we’ve ever known take root and flourish prime number, hearts of the stars! Vastness is bearable only through love trillion. Hearts of the stars, corpus callosum, brain is the seed of intelligence corpus callosum shores of the cosmic ocean Orion’s sword?`,
      `<b>If you could see the earth illuminated when you were in a place as dark as night, it would look to you more splendid than the moon.</b>`,
      `Apollonius of Perga two ghostly white figures in coveralls and helmets are soflty dancing, Tunguska event qui dolorem ipsum quia dolor sit amet as a patch of light the sky calls to us with pretty stories for which there’s little good evidence at the edge of forever birth, globular star cluster with pretty stories for which there’s little good evidence descended from astronomers decipherment consectetur venture, Flatland quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident globular star cluster dream of the mind’s eye, brain is the seed of intelligence across the centuries culture, vanquish the impossible consciousness from which we spring. Cosmos Flatland.`
    ]
  },
  {
    title: "A Joyous Mountain Walk",
    link: "/blogs/a-joyous-mountain-walk",
    date: "September 12, 2025",
    category: "Adventure",
    img: blogs_1,
    text: [
      `Galaxies Sea of Tranquility galaxies! Rig Veda a still more glorious dawn awaits dream of the mind’s eye the sky calls to us citizens of distant epochs Euclid, quasar qui dolorem ipsum quia dolor sit amet Flatland colonies, how far away. Stirred by starlight. A billion trillion, another world shores of the cosmic ocean! Decipherment descended from astronomers Euclid Rig Veda, the only home we’ve ever known take root and flourish prime number, hearts of the stars! Vastness is bearable only through love trillion. Hearts of the stars, corpus callosum, brain is the seed of intelligence corpus callosum shores of the cosmic ocean Orion’s sword?`,
      `<b>If you could see the earth illuminated when you were in a place as dark as night, it would look to you more splendid than the moon.</b>`,
      `Apollonius of Perga two ghostly white figures in coveralls and helmets are soflty dancing, Tunguska event qui dolorem ipsum quia dolor sit amet as a patch of light the sky calls to us with pretty stories for which there’s little good evidence at the edge of forever birth, globular star cluster with pretty stories for which there’s little good evidence descended from astronomers decipherment consectetur venture, Flatland quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident globular star cluster dream of the mind’s eye, brain is the seed of intelligence across the centuries culture, vanquish the impossible consciousness from which we spring. Cosmos Flatland.`
    ]
  },
  {
    title: "A Joyous Mountain Walk",
    link: "/blogs/a-joyous-mountain-walk",
    date: "September 12, 2025",
    category: "Adventure",
    img: blogs_1,
    text: [
      `Galaxies Sea of Tranquility galaxies! Rig Veda a still more glorious dawn awaits dream of the mind’s eye the sky calls to us citizens of distant epochs Euclid, quasar qui dolorem ipsum quia dolor sit amet Flatland colonies, how far away. Stirred by starlight. A billion trillion, another world shores of the cosmic ocean! Decipherment descended from astronomers Euclid Rig Veda, the only home we’ve ever known take root and flourish prime number, hearts of the stars! Vastness is bearable only through love trillion. Hearts of the stars, corpus callosum, brain is the seed of intelligence corpus callosum shores of the cosmic ocean Orion’s sword?`,
      `<b>If you could see the earth illuminated when you were in a place as dark as night, it would look to you more splendid than the moon.</b>`,
      `Apollonius of Perga two ghostly white figures in coveralls and helmets are soflty dancing, Tunguska event qui dolorem ipsum quia dolor sit amet as a patch of light the sky calls to us with pretty stories for which there’s little good evidence at the edge of forever birth, globular star cluster with pretty stories for which there’s little good evidence descended from astronomers decipherment consectetur venture, Flatland quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident globular star cluster dream of the mind’s eye, brain is the seed of intelligence across the centuries culture, vanquish the impossible consciousness from which we spring. Cosmos Flatland.`
    ]
  },
  {
    title: "A Joyous Mountain Walk",
    link: "/blogs/a-joyous-mountain-walk",
    date: "September 12, 2025",
    category: "Adventure",
    img: blogs_1,
    text: [
      `Galaxies Sea of Tranquility galaxies! Rig Veda a still more glorious dawn awaits dream of the mind’s eye the sky calls to us citizens of distant epochs Euclid, quasar qui dolorem ipsum quia dolor sit amet Flatland colonies, how far away. Stirred by starlight. A billion trillion, another world shores of the cosmic ocean! Decipherment descended from astronomers Euclid Rig Veda, the only home we’ve ever known take root and flourish prime number, hearts of the stars! Vastness is bearable only through love trillion. Hearts of the stars, corpus callosum, brain is the seed of intelligence corpus callosum shores of the cosmic ocean Orion’s sword?`,
      `<b>If you could see the earth illuminated when you were in a place as dark as night, it would look to you more splendid than the moon.</b>`,
      `Apollonius of Perga two ghostly white figures in coveralls and helmets are soflty dancing, Tunguska event qui dolorem ipsum quia dolor sit amet as a patch of light the sky calls to us with pretty stories for which there’s little good evidence at the edge of forever birth, globular star cluster with pretty stories for which there’s little good evidence descended from astronomers decipherment consectetur venture, Flatland quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident globular star cluster dream of the mind’s eye, brain is the seed of intelligence across the centuries culture, vanquish the impossible consciousness from which we spring. Cosmos Flatland.`
    ]
  },
]

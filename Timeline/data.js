// All the content lives here. To add a philosopher, copy one block and edit it.
// Era boundaries are conventional and vary by textbook.

var ERAS = [
  {
    id: 'ancient',
    name: 'Ancient',
    dates: 'c. 600 BCE – 400 CE',
    color: '#cd7100',
    blurb: 'From the first philosophers to the Roman Empire. The focus on inquiry was (generally): what the world is made of, how we know things, and how to live well in accordance with society.',
    philosophers: [
      {
        id: 'Enheduanna', name: 'Enheduanna', years: 'c. 2286 – c. 2251 BCE',
        about: 'She was the first author to be named in all recorded history: a Mesopotamian poet, princess, and priestess.',
        works: [
          { title: 'The Exaltation of Inanna', year: '', note: 'a song-like tribute/hymn to Inana—the goddess of Love, War, and Fertility—in which Enheduana likens the goddess to the forces of the natural world' },
          { title: 'The Sumerian Temple Hymns', year: '', note: 'A collection of 42 hymns mapping major temples across Sumer, defining their divine presence, cities, and character'},
          { title: 'Inanna and Ebih', year: '', note: ': A narrative poem depicting the confrontation and subjugation of the proud mountain range Ebih by Inanna' },
      
        ]
      },
      {
        id: 'The Milesian School', name: 'The Milesian School', years: 'c.  – c.  BCE',
        about: 'ABOUT THE MILESIANS---',
        works: [
          { title: 'WORKS', year: '---', note: '---' }
        ]
      },
      {
        id: 'Other pre-socratics', name: 'Other Pre-Socratics', years: ' a – a BCE',
        about: 'info abt him',
        works: [
          { title: 'ideas or works', year: '', note: 'important info' }
        ]
      },
      {
        id: 'Socrates', name: 'Socrates', years: 'c. --- – c. --- BCE',
        about: 'about',
        works: [
          { title: 'works', year: 'early', note: 'Socrates\' defense at his trial.' },
        ],
        note: 'Dates for Plato\'s dialogues are uncertain, so scholars group them as early, middle, and late.'
      },
      {
        id: 'plato', name: 'Plato', years: 'c. 428 – c. 348 BCE',
        about: 'Socrates\' student and founder of the Academy in Athens. He argued that true knowledge concerns the unchanging Forms.',
        works: [
          { title: 'Apology', year: 'early', note: 'Socrates\' defense at his trial.' },
          { title: 'Republic', year: 'c. 375 BCE', note: 'On justice, the ideal city, and the philosopher-ruler. Includes the allegory of the cave.' },
          { title: 'Symposium', year: 'middle', note: 'A banquet of speeches on the nature of love.' },
          { title: 'Timaeus', year: 'late', note: 'An account of the making of the cosmos, with the Forms as its model.' }
        ],
        note: 'Dates for Plato\'s dialogues are uncertain, so scholars group them as early, middle, and late.'
      },
      {
        id: 'aristotle', name: 'Aristotle', years: '384 – 322 BCE',
        about: 'Plato\'s student and tutor to Alexander the Great. He founded formal logic and wrote across biology, ethics, politics, and metaphysics.',
        works: [
          { title: 'Organon', year: '', note: 'A collection of logical treatises, including the Prior Analytics, which presents the syllogism.' },
          { title: 'Nicomachean Ethics', year: '', note: 'On happiness (eudaimonia) and the virtues.' },
          { title: 'Politics', year: '', note: 'On the city-state, citizenship, and constitutions.' },
          { title: 'Metaphysics', year: '', note: 'On being, substance, and first causes.' }
        ],
        note: 'Most of Aristotle\'s surviving works are lecture notes compiled after his death, so exact dates are uncertain.'
      },
      {
        id: 'epicurus', name: 'Epicurus', years: '341 – 270 BCE',
        about: 'Founded a community in Athens known as the Garden. He taught that the good life is pleasure understood as peace of mind and freedom from pain.',
        works: [
          { title: 'Letter to Menoeceus', year: '', note: 'A short guide to living well and not fearing death or the gods.' },
          { title: 'Principal Doctrines', year: '', note: 'Forty brief maxims summarizing his ethics.' },
          { title: 'On Nature', year: '', note: 'His major work, in 37 books. Only fragments survive.' }
        ],
        note: 'The surviving letters are preserved in Diogenes Laërtius\' Lives of the Eminent Philosophers.'
      },
      {
        id: 'marcus-aurelius', name: 'Marcus Aurelius', years: '121 – 180 CE',
        about: 'Roman emperor and Stoic philosopher. He wrote private notes to himself on duty, reason, and accepting what he could not control.',
        works: [
          { title: 'Meditations', year: 'c. 170 – 180 CE', note: 'Twelve books of personal reflections, written in Greek, probably during military campaigns.' }
        ]
      }
    ]
  },

  {
    id: 'medieval',
    name: 'Medieval',
    dates: 'c. 400 – 1500',
    color: '#822f41',
    blurb: 'From the late Roman world to the Renaissance: philosophy joined with Christian, Islamic, and Jewish thought, and Aristotle was recovered and debated.',
    philosophers: [
      {
        id: 'augustine', name: 'Augustine', years: '354 – 430 CE',
        about: 'Bishop of Hippo in North Africa. He joined Christian belief with Platonist philosophy and wrote on the will, time, and evil.',
        works: [
          { title: 'On Free Choice of the Will', year: 'c. 388 – 395', note: 'A dialogue on the origin of evil and human freedom.' },
          { title: 'Confessions', year: 'c. 397 – 400', note: 'A spiritual autobiography that also explores memory and time.' },
          { title: 'The City of God', year: '413 – 426', note: 'A response to the sack of Rome, contrasting the earthly and heavenly cities.' }
        ]
      },
      {
        id: 'boethius', name: 'Boethius', years: 'c. 477 – 524 CE',
        about: 'Roman statesman and scholar who translated Aristotle\'s logic into Latin. He wrote his best-known work in prison before his execution.',
        works: [
          { title: 'Translations and commentaries on Aristotle\'s logic', year: 'early 500s', note: 'Passed Aristotle\'s logical works to the Latin-speaking West for centuries.' },
          { title: 'The Consolation of Philosophy', year: 'c. 524', note: 'A dialogue with Lady Philosophy on fortune, happiness, and divine providence.' }
        ]
      },
      {
        id: 'avicenna', name: 'Avicenna (Ibn Sina)', years: 'c. 980 – 1037 CE',
        about: 'Persian polymath and one of the most influential philosophers of the Islamic world. Known for his "floating man" thought experiment and for distinguishing essence from existence.',
        works: [
          { title: 'The Book of Healing (Kitab al-Shifa)', year: 'c. 1014 – 1020', note: 'A vast philosophical encyclopedia covering logic, natural science, mathematics, and metaphysics.' },
          { title: 'The Canon of Medicine', year: 'c. 1025', note: 'A medical encyclopedia used in Europe and the Islamic world for centuries.' },
          { title: 'Pointers and Reminders (al-Isharat wa-l-tanbihat)', year: '', note: 'A late, condensed statement of his mature thought.' }
        ]
      },
      {
        id: 'anselm', name: 'Anselm of Canterbury', years: '1033 – 1109 CE',
        about: 'Benedictine monk and Archbishop of Canterbury. He is remembered for the ontological argument for God\'s existence.',
        works: [
          { title: 'Monologion', year: '1076', note: 'A meditation on God\'s nature, argued from reason alone.' },
          { title: 'Proslogion', year: '1077 – 78', note: 'Contains the ontological argument, built on the idea of that than which nothing greater can be thought.' },
          { title: 'Cur Deus Homo', year: '1098', note: 'On why God became human.' }
        ]
      },
      {
        id: 'averroes', name: 'Averroes (Ibn Rushd)', years: '1126 – 1198 CE',
        about: 'Philosopher and judge from Córdoba, Spain. His commentaries on Aristotle were so thorough that medieval Europeans called him "the Commentator."',
        works: [
          { title: 'Commentaries on Aristotle', year: '1170s – 1190s', note: 'Short, middle, and long commentaries that shaped how Aristotle was read in Europe.' },
          { title: 'Decisive Treatise (Fasl al-Maqal)', year: 'c. 1179', note: 'Argues that philosophy and religious law are compatible.' },
          { title: 'The Incoherence of the Incoherence', year: 'c. 1180', note: 'His reply to al-Ghazali\'s attack on the philosophers.' }
        ]
      },
      {
        id: 'aquinas', name: 'Thomas Aquinas', years: '1225 – 1274 CE',
        about: 'Dominican friar and theologian who brought Aristotle\'s philosophy into Christian thought. He gave five arguments for God\'s existence, the "Five Ways."',
        works: [
          { title: 'On Being and Essence', year: 'c. 1252 – 56', note: 'An early treatise on the difference between what a thing is and that it is.' },
          { title: 'Summa contra Gentiles', year: 'c. 1259 – 65', note: 'A reasoned defense of Christian belief aimed at non-believers.' },
          { title: 'Summa Theologiae', year: '1265 – 74', note: 'His masterwork on God, ethics, and law, left unfinished at his death. Its treatise on law shaped natural law theory.' }
        ]
      },
      {
        id: 'ockham', name: 'William of Ockham', years: 'c. 1287 – 1347 CE',
        about: 'English Franciscan friar. He defended nominalism and a preference for simple explanations, later called "Ockham\'s razor."',
        works: [
          { title: 'Commentary on the Sentences', year: '1317 – 19', note: 'Lectures at Oxford, where his philosophical views took shape.' },
          { title: 'Summa Logicae', year: 'c. 1323', note: 'A major textbook on logic and the philosophy of language.' },
          { title: 'Dialogus', year: 'c. 1334 – 46', note: 'A long work on papal authority and the limits of political power.' }
        ]
      }
    ]
  },

  {
    id: 'modern',
    name: 'Modern',
    dates: '1500 – 1800',
    color: '#325cb1',
    blurb: 'From the Renaissance to the Enlightenment: the new science, the search for certainty, and fresh questions about knowledge, the state, and the self.',
    philosophers: [
      {
        id: 'hobbes', name: 'Thomas Hobbes', years: '1588 – 1679',
        about: 'English philosopher who argued that without a strong sovereign, life is a war of all against all.',
        works: [
          { title: 'The Elements of Law', year: '1640', note: 'Circulated in manuscript and printed in 1650. An early version of his political theory.' },
          { title: 'De Cive', year: '1642', note: 'On citizenship and government.' },
          { title: 'Leviathan', year: '1651', note: 'His masterpiece: a social contract argument for strong sovereign authority.' }
        ]
      },
      {
        id: 'descartes', name: 'René Descartes', years: '1596 – 1650',
        about: 'French philosopher and mathematician who tried to rebuild knowledge on certain foundations, beginning with radical doubt.',
        works: [
          { title: 'Discourse on the Method', year: '1637', note: 'Presents his method and the cogito: "I think, therefore I am."' },
          { title: 'Meditations on First Philosophy', year: '1641', note: 'Six meditations on doubt, the self, God, and the material world.' },
          { title: 'Principles of Philosophy', year: '1644', note: 'A systematic textbook of his philosophy and physics.' }
        ]
      },
      {
        id: 'locke', name: 'John Locke', years: '1632 – 1704',
        about: 'English philosopher of empiricism and liberalism. He argued that knowledge comes from experience and that government rests on consent.',
        works: [
          { title: 'A Letter Concerning Toleration', year: '1689', note: 'A case for religious toleration.' },
          { title: 'Two Treatises of Government', year: '1690', note: 'Natural rights, property, and limits on political power.' },
          { title: 'An Essay Concerning Human Understanding', year: '1690', note: 'On the origins and limits of human knowledge, starting from the claim that the mind has no innate ideas.' }
        ]
      },
      {
        id: 'spinoza', name: 'Baruch Spinoza', years: '1632 – 1677',
        about: 'Dutch philosopher of Portuguese-Jewish descent who identified God with nature. He was expelled from his community for his views.',
        works: [
          { title: 'Principles of Cartesian Philosophy', year: '1663', note: 'The only book published under his own name in his lifetime.' },
          { title: 'Theological-Political Treatise', year: '1670', note: 'Argues for freedom of thought and a historical reading of scripture.' },
          { title: 'Ethics', year: '1677', note: 'Published after his death. Argued from definitions and axioms, like geometry.' }
        ]
      },
      {
        id: 'hume', name: 'David Hume', years: '1711 – 1776',
        about: 'Scottish philosopher and historian who questioned our grasp of causation, the self, and the role of reason in morality.',
        works: [
          { title: 'A Treatise of Human Nature', year: '1739 – 40', note: 'His first and most ambitious work, which went largely unnoticed when it appeared.' },
          { title: 'An Enquiry Concerning Human Understanding', year: '1748', note: 'A shorter, clearer recasting of the Treatise\'s ideas on knowledge. Includes his discussion of miracles.' },
          { title: 'Dialogues Concerning Natural Religion', year: '1779', note: 'Published after his death. A debate about arguments for God\'s existence.' }
        ]
      },
      {
        id: 'berkeley', name: 'george berkeley', years: ' – ',
        about: '---.',
        works: [
          { title: '---', year: '---', note: '---' },
        ]
      },
      {
        id: 'kant', name: 'Immanuel Kant', years: '1724 – 1804',
        about: 'German philosopher who argued that the mind actively structures experience and that morality rests on duties we give ourselves as rational beings.',
        works: [
          { title: 'Critique of Pure Reason', year: '1781', note: 'On the limits and conditions of human knowledge.' },
          { title: 'Groundwork of the Metaphysics of Morals', year: '1785', note: 'Introduces the categorical imperative.' },
          { title: 'Critique of Practical Reason', year: '1788', note: 'Develops his moral philosophy and the idea of freedom.' },
          { title: 'Critique of the Power of Judgment', year: '1790', note: 'On beauty, the sublime, and purpose in nature.' },
          { title: 'The Metaphysics of Morals', year: '1797', note: 'Includes the Doctrine of Right, his philosophy of law and the state.' }
        ]
      }
    ]
  },

  {
    id: 'contemporary',
    name: 'Contemporary',
    dates: '1800 – today',
    color: '#34a04a',
    blurb: 'From the nineteenth century to today: history and society, logic and language, existence and justice, in many competing traditions.',
    philosophers: [
      {
        id: '--', name: '', years: ' – ',
        about: '',
        works: [
          { title: '', year: '', note: '' },

        ]
      },
      {
        id: '', name: '', years: ' – ',
        about: '.',
        works: [
          { title: 'c', year: '', note: '' },
        ]
      },
      {
        id: 'mrx', name: '', years: ' – ',
        about: '',
        works: [
          { title: '', year: '', note: '' },
        ]
      },
      {
        id: '', name: ' ', years: ' – ',
        about: '',
        works: [
          { title: '', year: '', note: '' },

        ]
      },
      {
        id: '', name: ' ', years: ' – ',
        about: '',
        works: [
          { title: '', year: '', note: '' },

        ]
      },
      {
        id: 'wittgenstein', name: 'Ludwig Wittgenstein', years: '1889 – 1951',
        about: 'Austrian-British philosopher who changed the philosophy of language twice: first with a logical picture of meaning, then with an account based on how words are used.',
        works: [
          { title: 'Tractatus Logico-Philosophicus', year: '1921', note: 'The only philosophical book he published in his lifetime. German edition 1921, English 1922.' },
          { title: 'Philosophical Investigations', year: '1953', note: 'Published after his death. On meaning, rules, and "language games."' },
          { title: 'On Certainty', year: '1969', note: 'Notes from his last year and a half on knowledge and doubt.' }
        ]
      },
      {
        id: 'beauvoir', name: 'Simone de Beauvoir', years: '1908 – 1986',
        about: 'French existentialist philosopher, novelist, and feminist thinker.',
        works: [
          { title: 'The Ethics of Ambiguity', year: '1947', note: 'An existentialist ethics built on freedom and responsibility.' },
          { title: 'The Second Sex', year: '1949', note: 'A landmark analysis of women\'s situation. Argues that one is not born, but becomes, a woman.' },
          { title: 'The Mandarins', year: '1954', note: 'A novel about postwar French intellectuals. It won the Prix Goncourt.' }
        ]
      },
      {
        id: 'rawls', name: 'John Rawls', years: '1921 – 2002',
        about: 'American political philosopher who revived social contract theory with his idea of justice as fairness.',
        works: [
          { title: 'A Theory of Justice', year: '1971', note: 'Argues for principles of justice chosen behind a "veil of ignorance."' },
          { title: 'Political Liberalism', year: '1993', note: 'On how a diverse society can agree on a shared political conception of justice.' },
          { title: 'The Law of Peoples', year: '1999', note: 'Extends his ideas to international relations.' }
        ]
      }
    ]
  }
];

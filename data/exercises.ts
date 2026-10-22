export type SourceType = 'Umum' | 'Teks klasik' | "Al-Qur'an";
export type WordKind = 'Isim' | 'Fi‘il' | 'Huruf';
export type CaseState = 'Marfū‘' | 'Manṣūb' | 'Majrūr' | 'Majzūm' | 'Mabnī' | 'Tidak berlaku';
export type Sign = 'Ḍammah' | 'Fatḥah' | 'Kasrah' | 'Sukūn' | 'Alif' | 'Wāw' | 'Yā’' | 'Mabnī' | 'Tidak berlaku';
export type Position = string;
export interface WordAnalysis { token: string; kind: WordKind; position: Position; state: CaseState; sign: Sign; explanation: string; fullIrab: string }
export interface Exercise { id: string; source: SourceType; title: string; sentence: string; translation: string; topic: string; context: string; words: WordAnalysis[]; reference?: string }
export const exercises: Exercise[] = [
  {
    "id": "u01",
    "source": "Umum",
    "title": "Jumlah fi‘liyyah: fā‘il dan maf‘ūl",
    "sentence": "كَتَبَ الطَّالِبُ الدَّرْسَ",
    "translation": "Siswa itu menulis pelajaran.",
    "topic": "Fi‘il, fā‘il, maf‘ūl bih",
    "context": "Kalimat verbal dasar.",
    "words": [
      {
        "token": "كَتَبَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Fi‘il māḍī menunjukkan pekerjaan lampau dan mabnī di atas fatḥah.",
        "fullIrab": "كَتَبَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "الطَّالِبُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari pekerjaan menulis; fā‘il marfū‘ dengan ḍammah.",
        "fullIrab": "الطَّالِبُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ."
      },
      {
        "token": "الدَّرْسَ",
        "kind": "Isim",
        "position": "Maf‘ūl bih",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Objek yang ditulis; maf‘ūl bih berstatus manṣūb.",
        "fullIrab": "الدَّرْسَ: مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u02",
    "source": "Umum",
    "title": "Jumlah ismiyyah: mubtada’ dan khabar",
    "sentence": "الْعِلْمُ نَافِعٌ",
    "translation": "Ilmu itu bermanfaat.",
    "topic": "Mubtada’ dan khabar",
    "context": "Khabar memberi informasi tentang mubtada’.",
    "words": [
      {
        "token": "الْعِلْمُ",
        "kind": "Isim",
        "position": "Mubtada’",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pokok pembicaraan dalam jumlah ismiyyah.",
        "fullIrab": "الْعِلْمُ: مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      },
      {
        "token": "نَافِعٌ",
        "kind": "Isim",
        "position": "Khabar",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Informasi tentang mubtada’ dan berstatus marfū‘.",
        "fullIrab": "نَافِعٌ: خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u03",
    "source": "Umum",
    "title": "Na‘t dan man‘ūt",
    "sentence": "جَاءَ الطَّالِبُ الْمُجْتَهِدُ",
    "translation": "Siswa yang rajin itu telah datang.",
    "topic": "Na‘t–man‘ūt",
    "context": "Na‘t mengikuti man‘ūt dalam i‘rab dan kesesuaian lainnya.",
    "words": [
      {
        "token": "جَاءَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Menunjukkan peristiwa lampau.",
        "fullIrab": "جَاءَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "الطَّالِبُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari جَاءَ.",
        "fullIrab": "الطَّالِبُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      },
      {
        "token": "الْمُجْتَهِدُ",
        "kind": "Isim",
        "position": "Na‘t",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Sifat yang mengikuti الطَّالِبُ; karena man‘ūt marfū‘, na‘t juga marfū‘.",
        "fullIrab": "الْمُجْتَهِدُ: نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u04",
    "source": "Umum",
    "title": "Iḍāfah: muḍāf dan muḍāf ilaih",
    "sentence": "كِتَابُ الطَّالِبِ جَدِيدٌ",
    "translation": "Buku siswa itu baru.",
    "topic": "Muḍāf–muḍāf ilaih",
    "context": "Muḍāf ilaih selalu majrūr; kata pertama menjadi mubtada’.",
    "words": [
      {
        "token": "كِتَابُ",
        "kind": "Isim",
        "position": "Mubtada’",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Muḍāf yang menjadi mubtada’ dalam kalimat.",
        "fullIrab": "كِتَابُ: مُبْتَدَأٌ مَرْفُوعٌ وَهُوَ مُضَافٌ."
      },
      {
        "token": "الطَّالِبِ",
        "kind": "Isim",
        "position": "Muḍāf ilaih",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Menjadi muḍāf ilaih dan berstatus majrūr.",
        "fullIrab": "الطَّالِبِ: مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ."
      },
      {
        "token": "جَدِيدٌ",
        "kind": "Isim",
        "position": "Khabar",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Khabar yang menerangkan buku.",
        "fullIrab": "جَدِيدٌ: خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u05",
    "source": "Umum",
    "title": "Huruf jar dan isim majrūr",
    "sentence": "ذَهَبْتُ إِلَى الْمَدْرَسَةِ",
    "translation": "Aku pergi ke sekolah.",
    "topic": "Jar–majrūr",
    "context": "Huruf إِلَى menyebabkan isim sesudahnya majrūr.",
    "words": [
      {
        "token": "ذَهَبْتُ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Sukūn",
        "explanation": "Fi‘il lampau yang bersambung dengan tā’ fā‘il.",
        "fullIrab": "ذَهَبْتُ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ."
      },
      {
        "token": "إِلَى",
        "kind": "Huruf",
        "position": "Huruf jar",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Huruf jar yang menjadikan isim setelahnya majrūr.",
        "fullIrab": "إِلَى: حَرْفُ جَرٍّ."
      },
      {
        "token": "الْمَدْرَسَةِ",
        "kind": "Isim",
        "position": "Isim majrūr",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Isim setelah إِلَى; tanda jarnya kasrah.",
        "fullIrab": "الْمَدْرَسَةِ: اسْمٌ مَجْرُورٌ بِإِلَى وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u06",
    "source": "Umum",
    "title": "Inna wa akhawātuhā",
    "sentence": "إِنَّ الطَّالِبَ مُجْتَهِدٌ",
    "translation": "Sesungguhnya siswa itu rajin.",
    "topic": "Inna dan isim-khabarnya",
    "context": "إِنَّ menashabkan isim dan merafa‘kan khabar.",
    "words": [
      {
        "token": "إِنَّ",
        "kind": "Huruf",
        "position": "Huruf nāsikh",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Huruf taukid dan naṣb yang bekerja pada isim dan khabar.",
        "fullIrab": "إِنَّ: حَرْفُ تَوْكِيدٍ وَنَصْبٍ."
      },
      {
        "token": "الطَّالِبَ",
        "kind": "Isim",
        "position": "Isim إنّ",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Isim إِنَّ berstatus manṣūb dengan fatḥah.",
        "fullIrab": "الطَّالِبَ: اسْمُ إِنَّ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ."
      },
      {
        "token": "مُجْتَهِدٌ",
        "kind": "Isim",
        "position": "Khabar إنّ",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Khabar إِنَّ tetap marfū‘.",
        "fullIrab": "مُجْتَهِدٌ: خَبَرُ إِنَّ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u07",
    "source": "Umum",
    "title": "Kāna wa akhawātuhā",
    "sentence": "كَانَ الْجَوُّ جَمِيلًا",
    "translation": "Cuacanya dahulu indah.",
    "topic": "Kāna dan isim-khabarnya",
    "context": "كَانَ merafa‘kan isim dan menashabkan khabar.",
    "words": [
      {
        "token": "كَانَ",
        "kind": "Fi‘il",
        "position": "Fi‘il nāqiṣ",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Fi‘il nāqiṣ yang mengubah susunan mubtada’-khabar.",
        "fullIrab": "كَانَ: فِعْلٌ مَاضٍ نَاقِصٌ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "الْجَوُّ",
        "kind": "Isim",
        "position": "Isim كان",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Isim كَانَ tetap marfū‘.",
        "fullIrab": "الْجَوُّ: اسْمُ كَانَ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      },
      {
        "token": "جَمِيلًا",
        "kind": "Isim",
        "position": "Khabar كان",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Khabar كَانَ berstatus manṣūb.",
        "fullIrab": "جَمِيلًا: خَبَرُ كَانَ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u08",
    "source": "Umum",
    "title": "Fi‘il muḍāri‘ marfū‘",
    "sentence": "يَكْتُبُ الْوَلَدُ",
    "translation": "Anak laki-laki itu sedang menulis.",
    "topic": "Fi‘il muḍāri‘",
    "context": "Fi‘il muḍāri‘ tidak didahului nāṣib atau jāzim pada contoh ini.",
    "words": [
      {
        "token": "يَكْتُبُ",
        "kind": "Fi‘il",
        "position": "Fi‘il muḍāri‘",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Fi‘il muḍāri‘ marfū‘ karena tidak didahului amil naṣb atau jazm.",
        "fullIrab": "يَكْتُبُ: فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      },
      {
        "token": "الْوَلَدُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari يَكْتُبُ.",
        "fullIrab": "الْوَلَدُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u09",
    "source": "Umum",
    "title": "Fi‘il muḍāri‘ manṣūb setelah لن",
    "sentence": "لَنْ يُهْمِلَ الطَّالِبُ وَاجِبَهُ",
    "translation": "Siswa itu tidak akan mengabaikan tugasnya.",
    "topic": "Fi‘il muḍāri‘ manṣūb",
    "context": "لَنْ menashabkan fi‘il muḍāri‘ setelahnya.",
    "words": [
      {
        "token": "لَنْ",
        "kind": "Huruf",
        "position": "Huruf naṣb",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Huruf naṣb dan penafian untuk masa depan.",
        "fullIrab": "لَنْ: حَرْفُ نَصْبٍ وَنَفْيٍ وَاسْتِقْبَالٍ."
      },
      {
        "token": "يُهْمِلَ",
        "kind": "Fi‘il",
        "position": "Fi‘il muḍāri‘",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Fi‘il muḍāri‘ menjadi manṣūb karena didahului لَنْ.",
        "fullIrab": "يُهْمِلَ: فِعْلٌ مُضَارِعٌ مَنْصُوبٌ بِلَنْ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ."
      },
      {
        "token": "الطَّالِبُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari يُهْمِلَ.",
        "fullIrab": "الطَّالِبُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ"
      },
      {
        "token": "وَاجِبَهُ",
        "kind": "Isim",
        "position": "Maf‘ūl bih",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Objek dari يُهْمِلَ; dhamir ـهُ menjadi muḍāf ilaih.",
        "fullIrab": "وَاجِبَهُ: مَفْعُولٌ بِهِ مَنْصُوبٌ وَهُوَ مُضَافٌ وَالْهَاءُ مُضَافٌ إِلَيْهِ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u10",
    "source": "Umum",
    "title": "Fi‘il muḍāri‘ majzūm setelah لم",
    "sentence": "لَمْ يَذْهَبْ مُحَمَّدٌ",
    "translation": "Muhammad belum pergi.",
    "topic": "Fi‘il muḍāri‘ majzūm",
    "context": "لَمْ menjazmkan fi‘il muḍāri‘.",
    "words": [
      {
        "token": "لَمْ",
        "kind": "Huruf",
        "position": "Huruf jazm",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Huruf nafy, qalb, dan jazm.",
        "fullIrab": "لَمْ: حَرْفُ نَفْيٍ وَجَزْمٍ وَقَلْبٍ."
      },
      {
        "token": "يَذْهَبْ",
        "kind": "Fi‘il",
        "position": "Fi‘il muḍāri‘",
        "state": "Majzūm",
        "sign": "Sukūn",
        "explanation": "Fi‘il muḍāri‘ majzūm karena didahului لَمْ.",
        "fullIrab": "يَذْهَبْ: فِعْلٌ مُضَارِعٌ مَجْزُومٌ بِلَمْ وَعَلَامَةُ جَزْمِهِ السُّكُونُ."
      },
      {
        "token": "مُحَمَّدٌ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari يَذْهَبْ.",
        "fullIrab": "مُحَمَّدٌ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u11",
    "source": "Umum",
    "title": "Maf‘ūl fīh (ẓarf makān)",
    "sentence": "جَلَسَ الطَّالِبُ أَمَامَ الْمُعَلِّمِ",
    "translation": "Siswa duduk di depan guru.",
    "topic": "Ẓarf makān",
    "context": "أَمَامَ menunjukkan keterangan tempat dan menjadi muḍāf.",
    "words": [
      {
        "token": "جَلَسَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Fi‘il lampau.",
        "fullIrab": "جَلَسَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "الطَّالِبُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari جَلَسَ.",
        "fullIrab": "الطَّالِبُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      },
      {
        "token": "أَمَامَ",
        "kind": "Isim",
        "position": "Ẓarf makān",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Keterangan tempat yang berstatus manṣūb dan menjadi muḍāf.",
        "fullIrab": "أَمَامَ: ظَرْفُ مَكَانٍ مَنْصُوبٌ وَهُوَ مُضَافٌ."
      },
      {
        "token": "الْمُعَلِّمِ",
        "kind": "Isim",
        "position": "Muḍāf ilaih",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Muḍāf ilaih setelah أَمَامَ.",
        "fullIrab": "الْمُعَلِّمِ: مُضَافٌ إِلَيْهِ مَجْرُورٌ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u12",
    "source": "Umum",
    "title": "Ḥāl",
    "sentence": "جَاءَ الطَّالِبُ مُبْتَسِمًا",
    "translation": "Siswa itu datang sambil tersenyum.",
    "topic": "Ḥāl",
    "context": "مُبْتَسِمًا menerangkan keadaan pelaku ketika datang.",
    "words": [
      {
        "token": "جَاءَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Menunjukkan kejadian lampau.",
        "fullIrab": "جَاءَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "الطَّالِبُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari جَاءَ.",
        "fullIrab": "الطَّالِبُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      },
      {
        "token": "مُبْتَسِمًا",
        "kind": "Isim",
        "position": "Ḥāl",
        "state": "Manṣūb",
        "sign": "Fatḥah",
        "explanation": "Menerangkan keadaan pelaku saat peristiwa terjadi.",
        "fullIrab": "مُبْتَسِمًا: حَالٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ."
      }
    ],
    "reference": ""
  },
  {
    "id": "u13",
    "source": "Teks klasik",
    "title": "Jumlah ismiyyah: khabar mufrad",
    "sentence": "الصَّبْرُ مِفْتَاحُ الْفَرَجِ",
    "translation": "Kesabaran adalah kunci kelapangan.",
    "topic": "Mubtada’, khabar, iḍāfah",
    "context": "Contoh susunan yang lazim dijumpai dalam nasihat dan teks klasik; bukan kutipan kitab tertentu.",
    "words": [
      {
        "token": "الصَّبْرُ",
        "kind": "Isim",
        "position": "Mubtada’",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pokok pembicaraan kalimat.",
        "fullIrab": "الصَّبْرُ: مُبْتَدَأٌ مَرْفُوعٌ."
      },
      {
        "token": "مِفْتَاحُ",
        "kind": "Isim",
        "position": "Khabar",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Khabar dan sekaligus muḍāf.",
        "fullIrab": "مِفْتَاحُ: خَبَرٌ مَرْفُوعٌ وَهُوَ مُضَافٌ."
      },
      {
        "token": "الْفَرَجِ",
        "kind": "Isim",
        "position": "Muḍāf ilaih",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Muḍāf ilaih dari مِفْتَاحُ.",
        "fullIrab": "الْفَرَجِ: مُضَافٌ إِلَيْهِ مَجْرُورٌ."
      }
    ],
    "reference": ""
  },
  {
    "id": "c14",
    "source": "Teks klasik",
    "title": "Na‘t man‘ūt majrūr",
    "sentence": "مَرَرْتُ بِطَالِبٍ مُجْتَهِدٍ",
    "translation": "Aku melewati seorang siswa yang rajin.",
    "topic": "Huruf jar, man‘ūt, na‘t",
    "context": "Na‘t mengikuti man‘ūt dalam status i‘rab; keduanya majrūr di sini.",
    "words": [
      {
        "token": "مَرَرْتُ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Sukūn",
        "explanation": "Fi‘il lampau yang bersambung dengan tā’ fā‘il.",
        "fullIrab": "مَرَرْتُ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ."
      },
      {
        "token": "بِ",
        "kind": "Huruf",
        "position": "Huruf jar",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Bā’ adalah huruf jar.",
        "fullIrab": "بِ: حَرْفُ جَرٍّ."
      },
      {
        "token": "طَالِبٍ",
        "kind": "Isim",
        "position": "Isim majrūr",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Isim setelah bā’ menjadi majrūr.",
        "fullIrab": "طَالِبٍ: اسْمٌ مَجْرُورٌ بِالْبَاءِ."
      },
      {
        "token": "مُجْتَهِدٍ",
        "kind": "Isim",
        "position": "Na‘t",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Na‘t mengikuti man‘ūt طَالِبٍ yang majrūr.",
        "fullIrab": "مُجْتَهِدٍ: نَعْتٌ مَجْرُورٌ."
      }
    ],
    "reference": ""
  },
  {
    "id": "c15",
    "source": "Teks klasik",
    "title": "‘Aṭaf",
    "sentence": "حَضَرَ زَيْدٌ وَعَمْرٌو",
    "translation": "Zaid dan Amr telah hadir.",
    "topic": "‘Aṭaf dan ma‘ṭūf",
    "context": "Ma‘ṭūf mengikuti ma‘ṭūf ‘alaih dalam i‘rab.",
    "words": [
      {
        "token": "حَضَرَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Fi‘il lampau.",
        "fullIrab": "حَضَرَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "زَيْدٌ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku dari حَضَرَ.",
        "fullIrab": "زَيْدٌ: فَاعِلٌ مَرْفُوعٌ."
      },
      {
        "token": "وَ",
        "kind": "Huruf",
        "position": "Huruf ‘aṭaf",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Menghubungkan kata dengan kata sebelumnya.",
        "fullIrab": "وَ: حَرْفُ عَطْفٍ."
      },
      {
        "token": "عَمْرٌو",
        "kind": "Isim",
        "position": "Ma‘ṭūf",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Mengikuti زَيْدٌ dalam i‘rab.",
        "fullIrab": "عَمْرٌو: مَعْطُوفٌ مَرْفُوعٌ."
      }
    ],
    "reference": ""
  },
  {
    "id": "c16",
    "source": "Teks klasik",
    "title": "Badal",
    "sentence": "جَاءَ أَخُوكَ زَيْدٌ",
    "translation": "Saudaramu, Zaid, telah datang.",
    "topic": "Badal",
    "context": "Pada contoh ini زَيْدٌ dapat dianalisis sebagai badal dari أَخُوكَ.",
    "words": [
      {
        "token": "جَاءَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Fi‘il lampau.",
        "fullIrab": "جَاءَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "أَخُوكَ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Wāw",
        "explanation": "Termasuk al-asmā’ al-khamsah; marfū‘ dengan wāw dan menjadi muḍāf.",
        "fullIrab": "أَخُوكَ: فَاعِلٌ مَرْفُوعٌ بِالْوَاوِ وَهُوَ مُضَافٌ."
      },
      {
        "token": "زَيْدٌ",
        "kind": "Isim",
        "position": "Badal",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Badal yang mengikuti kata sebelumnya dalam i‘rab.",
        "fullIrab": "زَيْدٌ: بَدَلٌ مَرْفُوعٌ."
      }
    ],
    "reference": ""
  },
  {
    "id": "q17",
    "source": "Al-Qur'an",
    "title": "QS Al-Ikhlāṣ: mubtada’ dan khabar",
    "sentence": "اللَّهُ الصَّمَدُ",
    "translation": "Allah tempat meminta segala sesuatu.",
    "topic": "Mubtada’ dan khabar",
    "context": "Potongan QS Al-Ikhlāṣ ayat 2.",
    "words": [
      {
        "token": "اللَّهُ",
        "kind": "Isim",
        "position": "Mubtada’",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Lafẓ al-jalālah sebagai mubtada’.",
        "fullIrab": "اللَّهُ: لَفْظُ الْجَلَالَةِ مُبْتَدَأٌ مَرْفُوعٌ."
      },
      {
        "token": "الصَّمَدُ",
        "kind": "Isim",
        "position": "Khabar",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Khabar yang menyempurnakan makna kalimat.",
        "fullIrab": "الصَّمَدُ: خَبَرٌ مَرْفُوعٌ."
      }
    ],
    "reference": "QS. Al-Ikhlāṣ [112]: 2"
  },
  {
    "id": "q18",
    "source": "Al-Qur'an",
    "title": "QS Al-Fātiḥah: jar-majrūr",
    "sentence": "بِسْمِ اللَّهِ",
    "translation": "Dengan nama Allah.",
    "topic": "Jar–majrūr dan iḍāfah",
    "context": "Potongan basmalah; analisis di sini dibatasi pada struktur kata yang ditampilkan.",
    "words": [
      {
        "token": "بِ",
        "kind": "Huruf",
        "position": "Huruf jar",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Bā’ adalah huruf jar.",
        "fullIrab": "بِ: حَرْفُ جَرٍّ."
      },
      {
        "token": "اسْمِ",
        "kind": "Isim",
        "position": "Isim majrūr",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Isim setelah bā’ majrūr dan menjadi muḍāf.",
        "fullIrab": "اسْمِ: اسْمٌ مَجْرُورٌ بِالْبَاءِ وَهُوَ مُضَافٌ."
      },
      {
        "token": "اللَّهِ",
        "kind": "Isim",
        "position": "Muḍāf ilaih",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Lafẓ al-jalālah menjadi muḍāf ilaih.",
        "fullIrab": "اللَّهِ: لَفْظُ الْجَلَالَةِ مُضَافٌ إِلَيْهِ مَجْرُورٌ."
      }
    ],
    "reference": "Potongan basmalah"
  },
  {
    "id": "q19",
    "source": "Al-Qur'an",
    "title": "QS Al-‘Aṣr: fi‘il dan fā‘il",
    "sentence": "خَسِرَ الْإِنْسَانُ",
    "translation": "Manusia benar-benar berada dalam kerugian.",
    "topic": "Fi‘il māḍī dan fā‘il",
    "context": "Potongan dari QS Al-‘Aṣr ayat 2.",
    "words": [
      {
        "token": "خَسِرَ",
        "kind": "Fi‘il",
        "position": "Fi‘il māḍī",
        "state": "Mabnī",
        "sign": "Fatḥah",
        "explanation": "Fi‘il lampau.",
        "fullIrab": "خَسِرَ: فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ."
      },
      {
        "token": "الْإِنْسَانُ",
        "kind": "Isim",
        "position": "Fā‘il",
        "state": "Marfū‘",
        "sign": "Ḍammah",
        "explanation": "Pelaku yang disebut setelah fi‘il.",
        "fullIrab": "الْإِنْسَانُ: فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ."
      }
    ],
    "reference": "QS. Al-‘Aṣr [103]: 2"
  },
  {
    "id": "q20",
    "source": "Al-Qur'an",
    "title": "QS Al-Falaq: jar-majrūr",
    "sentence": "مِنْ شَرِّ مَا خَلَقَ",
    "translation": "Dari kejahatan makhluk yang Dia ciptakan.",
    "topic": "Jar–majrūr dan iḍāfah",
    "context": "Potongan QS Al-Falaq ayat 2. Analisis hanya mencakup kata yang ditampilkan.",
    "words": [
      {
        "token": "مِنْ",
        "kind": "Huruf",
        "position": "Huruf jar",
        "state": "Tidak berlaku",
        "sign": "Tidak berlaku",
        "explanation": "Min adalah huruf jar.",
        "fullIrab": "مِنْ: حَرْفُ جَرٍّ."
      },
      {
        "token": "شَرِّ",
        "kind": "Isim",
        "position": "Isim majrūr",
        "state": "Majrūr",
        "sign": "Kasrah",
        "explanation": "Isim setelah مِنْ; sekaligus muḍāf.",
        "fullIrab": "شَرِّ: اسْمٌ مَجْرُورٌ بِمِنْ وَهُوَ مُضَافٌ."
      },
      {
        "token": "مَا",
        "kind": "Isim",
        "position": "Isim mawṣūl",
        "state": "Mabnī",
        "sign": "Mabnī",
        "explanation": "Isim mawṣūl mabnī; kedudukannya bergantung pada susunan kalimat.",
        "fullIrab": "مَا: اسْمٌ مَوْصُولٌ مَبْنِيٌّ."
      }
    ],
    "reference": "QS. Al-Falaq [113]: 2"
  }
];
export const wordKinds: WordKind[] = ['Isim', 'Fi‘il', 'Huruf'];
export const positions: Position[] = [...new Set(exercises.flatMap(e => e.words.map(w => w.position)))].sort();
export const caseStates: CaseState[] = ['Marfū‘', 'Manṣūb', 'Majrūr', 'Majzūm', 'Mabnī', 'Tidak berlaku'];
export const signs: Sign[] = ['Ḍammah', 'Fatḥah', 'Kasrah', 'Sukūn', 'Alif', 'Wāw', 'Yā’', 'Mabnī', 'Tidak berlaku'];

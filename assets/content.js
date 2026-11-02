/*
 * RAMBO — 網站內容（原文照搬自 https://dogrambo.blogspot.com）
 *
 * 每章 = { title, slug, blocks: [...] }
 * block 類型：
 *   ["h",   "標題文字"]                       粗體標題（\n = 換行）
 *   ["p",   "段落文字"]
 *   ["li",  "列表項目"]
 *   ["cap", "說明文字"]                       相片／信件說明
 *   ["img", "<圖片ID>", "<檔名>"]             Blogger 圖片
 *   ["audio", "<Blogger影片token>", "標籤"]   旁述錄音
 *   ["video", "<Blogger影片token>"]           影片
 */
const IMG_BASE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/";
const MEDIA_BASE = "https://www.blogger.com/video.g?token=";

/*
 * 已下載到 assets/media/ 的影音（檔名 = 章數-種類）
 *   chNN-english.m4a / chNN-cantonese.m4a  旁述錄音
 *   chNN-video.mp4 (+ chNN-video.jpg 封面)  影片
 * 列在這裏的會用網站自己的播放器；未列出的仍然用 Blogger。
 */
const LOCAL_MEDIA = [
  "ch03-english", "ch03-cantonese",
  "ch04-english", "ch04-cantonese",
  "ch05-english", "ch05-cantonese",
  "ch06-english", "ch06-cantonese",
  "ch07-english", "ch07-cantonese",
  "ch08-english", "ch08-cantonese",
  "ch09-english", "ch09-cantonese",
  "ch10-english", "ch10-cantonese",
  "ch11-english", "ch11-cantonese",
  "ch12-english", "ch12-cantonese", "ch12-video",
  "ch13-video",
  "ch14-english", "ch14-cantonese",
  "ch15-english", "ch15-cantonese",
  "ch16-english", "ch16-cantonese",
];

const CHAPTERS = [
  {
    title: "RAMBO (chapter 1)",
    slug: "2009/08/rambo-chapter-1.html",
    blocks: [
      ["h", "RAMBO"],
      ["p", "A DOG WITH CANCER"],
      ["p", "How he was revived\nfrom a terminal cancer\nthrough a MIRACLE"],
      ["p", "一隻患了末期血癌的狗 –\n死後復生、及顯現了奇蹟"],
    ],
  },
  {
    title: "RAMBO (Chaper 2)",
    slug: "2009/08/rambo-chaper-2.html",
    blocks: [
      ["h", "Rambo & Rocky\nThe 2 Handsome Rottweiler\nBrothers"],
      ["img", "AVvXsEiH8ELco0pw1f2VHlSUXUAwApR0RDvT-2wZX4c1Rn9e6J03ZOu3AvCdJFY7WbqshkN1QN1r9c-1LIGpblN6ezx3IgUOQnWDEZtXRI1wZecRe4BM_robFsBFs_2EFUDCKN4s7kdhvIvFC6o", "photo1.JPG"],
      ["h", "洛威那狗兄弟"],
    ],
  },
  {
    title: "RAMBO (Chapter 3)",
    slug: "2009/08/rambo-chapter-3.html",
    blocks: [
      ["p", "In May 2007, my 7.5-year-old Rottweiler, Rambo, was diagnosed by my English Vet with lymphoma (lymph node cancer), which is a kind of incurable blood cancer, and he only had maximum one month to live."],
      ["p", "在2007年5月, 我的英國獸醫診斷出我的7歲半洛威拿狗, Rambo, 患上淋巴癌 (一種血癌), 屬於絕症. 最多只有一個月命."],
      ["h", "RAMBO"],
      ["img", "AVvXsEgfEu1iLMC6QiB2FQq7l1rCWYIoIF-dZs7GVOddJJ_ihsFZohyvHE4_jc8ENNIZcfO0OEoQGxRA4cBomwYIsxezWcddrwJvRatLDyTbvIz2xTZyETDltTr464iA9FU98wj6PeoUL-NnBlY", "photo2.JPG"],
      ["audio", "AD6v5dy-DrekoyzGDX6t1LmkmLy7YNgInAInJ6Kq8WMfehFchNAXw7GoZuAXuAn4XPRVdAi7KjI-SHqEyEm9g7F82OPfiyMV0WfCCEsYo5dWnfDqKuQOyXqOHrhJ2Z22B-hJckU5JqE", "Narration"],
      ["audio", "AD6v5dztvqIH0utFDvUPsGDcslE7aDt6frlJLIj2bTDZSf076qNKv2CNK9xdNxqzAOwTu5EMXPRtJiWcB20mfLHAyjJU7KBZPbeEoY1rIJjU3afk0aFOIYHIlDnRYJTv3sGqdCXT_RY", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 4)",
    slug: "2009/08/rambo-chapter-4.html",
    blocks: [
      ["p", "I gave him quality health food and best possible care. At the end of August 2007, various symptoms of Rambo's cancer started to surface – the most serious of them being non-stop bleeding from the nose, mouth and anus."],
      ["p", "我給他很好營養的食物及非常小心的照顧. 2007年8月底, Rambo 開始發病 – 其中最嚴重的病徵是口鼻及肛門不停的流血."],
      ["img", "AVvXsEg5T8c73EA4rqQTGDYsSsp-3Tfgi_QuXFErNucte-O1n9jHLZMy9un7mNBZxj1CVZA5gwiPPK-ccxOgflh20zR-whJV8Oqr2yEAy7xSE6TbIh-Ew4yyIAcaVIfFIs7kb1EzelLd96HQhKI", "photo3.JPG"],
      ["audio", "AD6v5dxTsA8aTl1ep5Ml9jdmCsA-KQh1_I_C9MNaInLNEi-tK0Okic1MgHM2GK6mDiotWrLacZKzv7Zxi_OCcNfTRsLXXOshLPfpUr6mBzN4kwCUmw_uxPyQ2OqpgFY5UJjkqIXiXBGI", "Narration"],
      ["audio", "AD6v5dz4JgDdhaYewifBGbuNMQ7PKNDi39cjmP5DMzWhXZCGN5dmolneVZ2c-5TS7nQ4cXZrZiwd0NYeItYyrQiA7xtKO1vJjB7dfN9w2qr3xn3sIB3iGLU0jNj_u-Tik5utLJs6MNI", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 5)",
    slug: "2009/08/rambo-chapter-5.html",
    blocks: [
      ["p", "Internal bleeding results in non-stop bleeding, day and night, with blood dripping from Rambo's nose and mouth as if from a faucet."],
      ["p", "內臟不斷出血令 Rambo 口鼻及肛門亦早晚不停流血, 像開了的水喉一樣."],
      ["img", "AVvXsEgx4gW46XTlJik3I5i3T_2ZplkJlY9W_PBAjmjkrK3MwNIMGnwsLeRdn15l0TAA7t6NIZed3aasfParOj1On7RFugchNQ8tRob_X-GKqc8l6Unp1_9S6INwE50Z518l4JD0eDNDeLSLgtQ", "photo4.JPG"],
      ["audio", "AD6v5dy8qMGMFxFfDT7joVI2lpZAVSP6k741thRejiJ_uL_mw3n0OS2SPRlHZOidP7C9f1k2NTodQuUIC-x24YhmQ6c9bLkksZy6ABpD_euGL2Ehgyra9K2S1FB-H1divlpl1C5LW1eC", "Narration"],
      ["audio", "AD6v5dwwaO6iPPArzvInf7gZhwDDK4MjF8w7jKz4iHP1iqagP1OyXpCgYSNNJVijoxS-BPlTEr4PG_MnbDUU1fnPK9D2huUanpSkJtqZQSTLm9U_LylKqzorQy-CyeQns1EK89R--mE", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 6)",
    slug: "2009/08/rambo-chapter-6.html",
    blocks: [
      ["h", "Rambo's Critical Symptoms of Cancer"],
      ["li", "a) Loss of appetite;"],
      ["li", "b) Great loss of weight;"],
      ["li", "c) Couldn't breathe because blood was blocking throat, nose & stomach;"],
      ["li", "d) Couldn't sleep because couldn't breathe;"],
      ["li", "e) Limbs were swollen, became a few times larger than normal due to infection and zero immunity ability, leading to loss of mobility;"],
      ["li", "f) Followed by 2 fingers being amputated at a later stage;"],
      ["li", "g) Couldn't eat blended food or drink water, not even with a syringe – choked on blood every time he tried to swallow something."],
      ["h", "Rambo 之嚴重癌症病徵"],
      ["li", "a) 沒有胃口;"],
      ["li", "b) 體重大量減輕;"],
      ["li", "c) 內出血導致口鼻喉嚨被血所封, 以致呼吸極度困難;"],
      ["li", "d) 呼吸困難, 不能入睡;"],
      ["li", "e) 腿及手部受細菌感染, 沒有免疫能力, 腫脹了數倍, 不能行走;"],
      ["li", "f) 2隻手指後來要被割除;"],
      ["li", "g) 最終因為口鼻大量出血, 而不能嚥下任何包括糊狀的食物, 甚至用針筒打些清水入口也令他大量咳血."],
      ["audio", "AD6v5dxe9nBM-UqTROmXuKf-mNnxOY8vDlMw6pRd7VlMPyIv4WkPxL5HFaoJ6XAHpxs7SjJ3xAV4g5rzb7Wj8RhCVgYAVKfAylPOCJNODsKB-k5F_PwAOoNUe68Ritjv_ufAt1IqYROP", "Narration"],
      ["audio", "AD6v5dx6WmbpGvVOrPbgn4c0N4U_c8BvGRnA2-lyTlRo8fgHMUOMaC4hXOK8Ka8o63vI8ClNBcc56z_GayJrOWp0Yw59QloWA0bi1I3Wizg9NwlnhP_ViWNp-e9HxOJY_fMCmUCB4w", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 7)",
    slug: "2009/08/rambo-chapter-7.html",
    blocks: [
      ["h", "Euthanizing Rambo"],
      ["p", "In the beginning of September 2007, I had to arrange for my Vet to euthanize Rambo at home (because he couldn't walk any more), and for the Pet Cremation Co to collect his body afterwards."],
      ["h", "替 Rambo 安樂死"],
      ["p", "到2007年9月初, 我只好決定請獸醫到家中替 Rambo 打針安樂死 (因為他已不能走動), 及安排寵物焚化公司之後把遺體帶走火化."],
      ["audio", "AD6v5dyX1nyPx0BCeaGLUITpUkHyAAJAOqx8mpKlGEjwj_ZHANlTlVSSVCVNGK6-0w8gcs6C33sNJyUCr2a_AtuUYns5KDTTm3CPxkXf2vCjppi4vbjXZT83mlOR0UBLDdTQz1fNNg", "Narration"],
      ["audio", "AD6v5dxq9mjmU-omKbl58NFPK0K9gzKCblrE4Bba9pH62Jo1hJr5TvREVOUBAJve25Jp_a76nY1JDNjJMo1m7DpTPWoCI9JCA0guXSjon1DiivoUlxGtEufWXTvGQnz8acOwkQUkzc8", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 8)",
    slug: "2009/08/rambo-chapter-8.html",
    blocks: [
      ["h", "Sifu Transferred Energy To Rambo"],
      ["p", "Before the Vet arrived, Sifu dropped by to visit Rambo for the first time.  Rambo was lying on the floor, motionless, except for some slight movements of the head, and practically an animal that was weakly struggling on the verge of death."],
      ["p", "Casting a glance at Rambo, Sifu’s first and only words were “no death energy yet….”.  Then Sifu put his hand about 2 feet above Rambo's head for no more than 2 mins, transferring energy to Rambo & reporting Rambo’s immediate death to the Gods at the same time."],
      ["p", "Within a few minutes, everyone was stunned to see that Rambo actually started to gulp down water in his bowl quickly by himself (syringe not needed).  A few hours later, Rambo even consumed a great bowl of rice with diced meat comfortably but eagerly all on his own (no help on blended food)."],
      ["h", "師父把他的氣及能量傳給 Rambo"],
      ["p", "在獸醫到達前，師父第一次來探 Rambo。師父一入門口，就見到 Rambo 躺在地上。基本上，Rambo 除了頭部還可以有微小動作之外，已經不能動彈，事實上就是一隻在死亡邊緣虛弱地彌留的動物。"],
      ["p", "師父看了Rambo 一眼，只講了一句說話，「還沒有死氣.…」，之後就把手放在Rambo 頭頂，距離不到 2 呎的距離，一面向大神報告 Rambo 的瀕死狀態，亦同時把能量傳入 Rambo 體內，前後不到 2 分鐘的過程。"],
      ["p", "幾分鐘之內，大家非常驚訝的發現，Rambo 快速地、大口大口地自行從它的碗裏面飲水 (不用針筒)；數小時後，更不可思議地、輕鬆熱切的進食一大碗米飯及小粒肉片，而不用再進食攪爛的糊狀食物。"],
      ["audio", "AD6v5dxm1QXs3vqFQLF9DFcwD24zaRAn9nOURFz_IcYD8dReNBu6M6WbFtJRwCsaHklW7GWOoVxguO6wAhDSAMCaEMvCAjBeA46Er-fIyhgl02h-StZRdsYkUtgVctRMObVpG9lGAtR0", "Narration"],
      ["audio", "AD6v5dwWSGT34BNJC6JR61fh1no3efjWsf__BpbwvVZ-coVXGFPNFQw56i2vj5Hds2D69SigBdbbTrueDjdex7WZVLpTcALkiibLJH8WWXz9PttkVnds2MvEP6TrM6Cc7uvqjNsNg1Y", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 9)",
    slug: "2009/08/rambo-chapter-9.html",
    blocks: [
      ["h", "THE GODS FIND THE SITUATION AMUSING"],
      ["p", "Sifu said the Gods must have found Rambo's situation quite amusing, as they performed something totally beyond our imagination and comprehension."],
      ["p", "The Gods had suspended Rambo's cancer, stopping it from torturing him any further. The power of the Gods and the life force of Sifu had jointly entered Rambo's body, and Rambo definitely behaved like a dog with no cancer."],
      ["h", "神可能覺得情況很有趣"],
      ["p", "師父說:神可能覺得情況很有趣,在這事上稍為顯現了我們完全想像不到的神力 – 祂們壓抑了 Rambo 的癌症, 令這病不再折磨他, 令他不用再那麼辛苦."],
      ["p", "神的力量和師父的氣同時進入了 Rambo 的體內, 以致 Rambo 完全不像一隻患有癌症的狗."],
      ["audio", "AD6v5dxttZK7qe3c_6BEkErTVDwM8M79qARRCEcBO2nTErQ4ELSCjvmlJpciTObrsbYQFhton3QvqKjbNcMZsiFKfLHF0RHEb7jc3eNiyhNbJrx2joCAGXdD9pvY15s_vshFr6JR9OdT", "Narration"],
      ["audio", "AD6v5dxIIU_5TEpIjSoloDjWlrVRPCjLsTwjSPZqAw8TDH0wR-OFQYyytLaj2Xd26bAew23BxgfvZU-iNyWdnrdPeM_ye6J2XRVEAaYH0OvXpKjA3Mfvslzla4bW72BJ4sCQYvfpc9c", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 10)",
    slug: "2009/08/rambo-chapter-10.html",
    blocks: [
      ["h", "Previous Critical Symptoms of Cancer Disappeared"],
      ["li", "a) Bleeding from nose, mouth & anus completely stopped;"],
      ["li", "b) The Vet confirmed that the egg-sized lymph node tumors on both sides of throat (initially 7-8 lumps on each side), shoulders & legs were reduced in number & size, & became much softer;"],
      ["li", "c) Blood test showed that new red blood cells were made;"],
      ["li", "d) Resumed solid food daily with huge appetite."],
      ["h", "早前非常明顯的癌症病徵消失了"],
      ["li", "a) 口鼻及肛門完全停止流血;"],
      ["li", "b) 獸醫証實, 喉嚨兩旁 (本來每面有7-8大腫瘤), 肩膀及後腿等地方的大淋巴腫瘤全部縮小, 變軟及甚至有些消失了;"],
      ["li", "c) 驗血報告顯示有新的紅血球出現;"],
      ["li", "d) 每天自行進食大量固體食物, 胃口極佳."],
      ["audio", "AD6v5dyz5a7OfXpoIYKYkiTeLvxc3zj4fxDJnYt7M2b0kG_tfww3mQwKU1a0b8A9wY3kPnwZQLg1YglqBON6sRnBko-MdbpOfiSo2XZMhxVzHnsE4HDSbSXkAootEs6XYEfAQyaddy2v", "Narration"],
      ["audio", "AD6v5dxq7OsponoiLBjd2XQ49mkoMPzpJC7_wFKeEpn8JK8VHfPqGxPRWvs91mQK_QkZYrpvfQah4wi2slz_tsGBKgIcs6j5NmYxykFhGmdYiNoigv6ZrT7ZwmgV31wVwFFOlQYKh8o", "旁述"],
      ["h", "Testimonies from 2 Vets of England 兩位英國獸醫的見証"],
      ["cap", "Vet (獸醫) - Dr. Andrew Pilling (2 letters) Letter 1 (第一封信)"],
      ["img", "AVvXsEhzgdIVLLcCjzmwED659LoRuBf1sXjUA1gF2ZSrMqf6ChzMk-0JXtPJUdJsEvVax-aH9TZDRJE-d5BXthyXyB7FgGEBXGUZOL_CeIzl3bVTF-wGRRGrsG2-ZFGwwewWjRF_-0gdlFRaDrk", "andrew+Pilling-P1-original.jpg"],
      ["cap", "Letter 1 (第一封信之親筆信)"],
      ["img", "AVvXsEjcScWQDOUvR3xrYLYjCNcBTES8xwVeI42zHH7oArHIq_meedG-y7PIaSDLW7AK_l4iaQ-2whCChEixLWZruJJ_N4G15nDKTYOpj-qw27cdN-bEJqi1bFXhUN4ODXYJCNaOo8ZK4-f204A", "handwriting=Andrew+Pilling+-P1.jpg"],
      ["img", "AVvXsEhPhFN9OO0F6qtIFrbK0XLmUWVQPGkhUgTN34MwlGDgHnbwzJ_Tu0rwlxrXNvvRYOmtIlRVWmuVhpxOIpNNiPWAigpaH6fMhB07bV5byOR6OxLqtGclGcC32v_GsKw_ogb70ZcbT8P-dn8", "handwriting=Andrew+Pilling+-P2.jpg"],
      ["cap", "Letter 2 (第二封信)"],
      ["img", "AVvXsEhbyfX-i6XQ9vgS4pwAvq_SparknAo-X1sCfMAfyBijXL9BHFZ5kNUWmBkxyvvONKoVC-NDjnEjATiwtHekz5Z9mSDdjTAaqSDwsplkD8eIJ5L0-Y0e0V82jgvNDHKnFRiBpFXDOYMtWbA", "andrew+Pilling-P2-original.jpg"],
      ["cap", "Letter 2 (第二封信之親筆信)"],
      ["img", "AVvXsEglerIGhlLdLRvHSlhul9xX2LhH43X7J-d4O8w7QCGiRi9bfwNpVjG5bs-wSPpeV9GLvAqH7cnSoNNCFBEThg-XAtRv-95sWAmzzz6RP4iT_SM_Hz0xcspIBOvvd9P_3Eef6Z9mArDewgc", "handwriting=Andrew+Pilling+-+single+page.jpg"],
      ["cap", "Vet (獸醫) - Dr. Hugh Stanley"],
      ["img", "AVvXsEhbO5su4jlxK8ExwUoxWaBDTvmSLwALNNdnPsE6NI2D2JCFqkNzuQUqG1refQxpWqFrCgjSc6knQYgwZ2Oa3KreGhH8qxnY0ZpMmvkp7MWFKps_WAOxSMa8iZa1pDyJjTvNR09zgl4YEXA", "Hugh+Stanley-original.jpg"],
      ["cap", "(親筆信)"],
      ["img", "AVvXsEgRWoB-QMk8-Siz5vOYPVA-QTKp7yJLXDsOqiL6wAoPqGH5ar-jM51-Xqd-fLkACzFW0WIbFkalbawbE79uut8FY9xW0vFrT4n5bWQl8IqCIFR7pG_MSV42ht2W61zaZqzci-IJXUrKu94", "handwriting=Hugh+Stanley+P1.jpg"],
      ["img", "AVvXsEiQK8bYXHk0hPr60bPPkkFUIN6WsFNJK24ILZtQ033QYaXyOAL5BQqqy0ILD3rBZFdqT7cNPnRhmoN7sGsm8dxhKpLotG0fq0q0koCfX5CUdy0krNxk-o6acSyQAiupvzU5NXd-FXFkibo", "handwriting=Hugh+Stanley+P2.jpg"],
      ["h", "Testimony from a senior Building Management Staff"],
      ["h", "一位大廈夜班資深管理員的見証"],
      ["cap", "魏志剛先生"],
      ["img", "AVvXsEgoBvVA1oIWMljDAbECaqDJnw1LvWo7H2zYq0NMyzObInADTiv7b45BFxcw_bwz8eEIm80He5dMY86aWZ1l14D9ycN6sPD3sHe7ORUa4NopNVsFrCSwW8F4dAaR1gKGUkgFmXgwFdncMZU", "typewritten.jpg"],
      ["cap", "(親筆信)"],
      ["img", "AVvXsEg__DDxvCGVhthoVpR1_0NKJIlASdmS9iGFlaR_keRBcAUriL-NHeYOVNMW54dnV7c3kt9Qv_8xgoljduepo92w5lsMQ8gbrgsXDbDl7yyr9llQIGfxHpRRNVNbPU0kAszELxTcsk5mXRQ", "Original+security+guard+handwritings+P1.jpg"],
      ["img", "AVvXsEiSANA5b45LtCEcXTK8GwKznciCwkE6zKRYiyaSdrTbnBBqxVzAkmqoUB16n4UXfV8oSnn1JYEiuCQQEspeCXtEy6LRDsEfatdoQgYrTXlngmQuoYzOQuY2KjX-Mv0aBOQpGEaIWES4BjY", "Original+security+guard+handwritings+P2.jpg"],
    ],
  },
  {
    title: "RAMBO (Chapter 11)",
    slug: "2009/08/rambo-chapter-11.html",
    blocks: [
      ["h", "Rambo Was Miraculously Revived!"],
      ["p", "Rambo actively lived for another 6 weeks upon the power and energy of the Gods and Sifu – this is equivalent to about 11 months in human life."],
      ["p", "Twice a week in each of those 6 weeks, I was still going with Rambo and his brother, Rocky, to hiking and picnicking, playing games such as ball-catching competition. From the videos, we can clearly see that Rambo was still every bit as bright and alert as Rocky, and in no way did he resemble a cancer patient who should have been dead by now."],
      ["h", "Rambo 神奇地起死回生了!"],
      ["p", "Rambo 活潑地用神及師父的力量, 額外生存了6星期, 即相等於人類約11個月的生命."],
      ["p", "在那 6 星期裏, 我繼續每星期 2 次帶 Rambo 及他的弟弟 Rocky 四處去行山和遊山玩水, 2兄弟又玩競逐追波遊戲等, 在以下的錄影帶裏, 大家可以看見Rambo 表現機警, 反應靈活, 跑得好快, 完全不像一個應該已經死去的癌症病人的模樣, 簡直就是一隻活潑正常的狗一樣."],
      ["audio", "AD6v5dyEwxfyCgmloqveWYI_6rDi3HC-U7uK-Q10EnwJpDhZ6w8p-iabJzKeMwCBLNoDycE6VqxCudC_kp7ykk7WXkJZ8vriRDcfx7JK-k98gvwPGJeMVtG_4nhni-kvXL8kTfbo6tM", "Narration"],
      ["audio", "AD6v5dwIa-MHNIK62S28qvpGU6AtpRxoj2TGSZGPFAnZIX3mL9XDVgIA7SBX3gQ6ACoFh-mWX_1GNwtKwY3jOyUfNVFch9dveUxr9lK2lnc5ovM0BDHPJehmolRIcz6uZ1AbKhhEyk8", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 12)",
    slug: "2009/08/rambo-chapter-12.html",
    blocks: [
      ["p", "Rambo was absolutely as bright and alert as a normal healthy dog (the one with orange collar is Rambo)."],
      ["p", "Rambo 機警, 靈活, 跑得極快; 完全像是一隻活潑正常的狗一樣 (橙色頸圈的是 Rambo)."],
      ["audio", "AD6v5dy3kNgwSRxuu3z2EshM-fT9fRpRMq8NYG6BIk7tuVbP4YddmAzx3HSSMSa1GaHem0pbtybQwAKsPT3u2Cn31_dRBE4f5F5b8cVmzzJhU4HGIzxm1k_vRW3h1Y7hmVYGPlTZvuHG", "Narration"],
      ["audio", "AD6v5dwSmiaqwnrrlXI9xxIbOKWxWqxKgNJK2b13u3jObeAnMZJAYdvz4qPsI8Uq1bmXW1NbOldDqh8zcMgsAH7AIYUWv6jUFjfLKPX1FUMp5CbekHUv-cdbg51vCrGhCUNeZ3Uma3hT", "旁述"],
      ["video", "AD6v5dwVGy-nYqOoOD-qPmY5Zrqf65APiDWAwevRs2r2xbUX33VYOOwZ0py0orntmgX9VUIPyZAdVcBeHbcVFxARGfUZL9MWXsYKDV43JBvTfF9fQNyNnrrK-KP0Xxj3HgkDvftI5z6g"],
    ],
  },
  {
    title: "RAMBO (Chapter 13)",
    slug: "2009/08/rambo-chapter-13.html",
    blocks: [
      ["h", "How Rambo could RUNNNNNN!!!!!!"],
      ["h", "Rambo 簡直是神速!!!"],
      ["video", "AD6v5dzFOBdXp_oWrCPdTwYFNMXStfE1JWRG2S-jgVgmqSpOjhKfqUokKexB5DW7Yi7yifrWnhqL9e9UnnyE41i11zjKswYxDG8RA8DA_ZEfANq3e-5Be00THumHEtfY6AyaZDXoObg"],
    ],
  },
  {
    title: "RAMBO (Chapter 14)",
    slug: "2009/09/transfer-of-energy-life-force-between.html",
    blocks: [
      ["h", "Transfer Of Energy & Life Force Between Sifu & Rambo"],
      ["p", "Sifu coughed seriously after exchanging the cancer energy with a dying dog."],
      ["p", "Then through inner energy cleansing practice, Sifu neutralized and purified the cancer energy and the dying force of Rambo. ."],
      ["h", "師父與 Rambo 之間交換了能量及生命力"],
      ["p", "師父用他的氣及能量和 Rambo 交換了之後, 自己就開始咳得很利害;"],
      ["p", "師父自己練功來淨化了 Rambo 的癌病能量及死氣."],
      ["audio", "AD6v5dzXaxnkr_wh4QAMXOHy_2nNoa87L9g1_XLKA4VjcC_ZQNPhx6aiDZHotMcYfFvI8m5CWv6-8tfsKhYk5TN8UcxlyVMwK0m6oW6ROy1NS4akLtSCyBcFtJssmN7ZgBGl4GHRdNxx", "Narration"],
      ["audio", "AD6v5dzSzdtEOwkVN6bMyJbSsolu4WhfQA4WkqKqa_op8LXec79_tTDV5zrYl4VcG19EDlzabnoaOC-dzRIKInhHPRzMcxXpGIHpITc-2GxQ8I9JyR9spXS32xiqrLw0rcTD-2PXyxiA", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 15)",
    slug: "2009/07/rambo-chapter-15.html",
    blocks: [
      ["h", "RAMBO DIED IN FRAGILITY AT HOME"],
      ["p", "Rambo died naturally in fragility at home in mid Oct 2007, after the energy transferred from Sifu had been used up and that there was no more life force remaining in him."],
      ["p", "However, Rambo did not appear to be tortured by the cancer as he was previously – he could still drink water by himself, not much bleeding from nose & mouth, and with a low level of breathing difficulties as that of a regular dying person."],
      ["p", "In conclusion, Rambo didn't die like a dog with cancer at all. ."],
      ["h", "Rambo 衰弱地在家裏死亡"],
      ["p", "當師父給 Rambo 的生命力全部用完的時候, Rambo 便很衰弱地、自然地在家裏死亡. 但 Rambo 死前仍然可以自己飲水, 口鼻只流很少量的血, 臨死前呼吸雖然有些不暢順, 但看上去較普通垂危病人的情況還要舒適. 總結來說, Rambo 絕對不像是一隻死於癌症的狗."],
      ["audio", "AD6v5dw-rREyxzvMe-vOIuAM93gSS8nErjOEPbHuPxkV1rVr8wmvwzm70ztdzU4jp2ypO03B8tP2q-AReUh1uL2RBXH4khDA8TILH1yoX8zTtWS-zN0Yk7Ar6y9GKH9WAFsRgCGNdUg", "Narration"],
      ["audio", "AD6v5dwGdo0pRGsK5A0M1EOxzKEgKQSb-29BbP7lABzy5atFLVWICO2Prlhyf2NYXuTQBIw2Gs4M785CmbImjXCW6parRQeklIwWq1_D18KU-WfsPpBUtjULs5bcCh7jJjBxWEwKg8zb", "旁述"],
    ],
  },
  {
    title: "RAMBO (Chapter 16)",
    slug: "2009/09/rambo-chapter-16.html",
    blocks: [
      ["h", "RAMBO'S REVIVAL – A MIRACLE"],
      ["p", "Even up to 3 days before Rambo's death, I was still taking the 2 Rottweiler brothers to hiking. The numerous management guards in my building and my 3 helpers marveled at this \"miracle\" and the power of Sifu as they witnessed the whole thing from beginning to end."],
      ["p", "The essence of the miracle is that the power of the Gods through Sifu can revive not only a human being, but even an animal, and bring it back to excellent physical condition for almost 1 year, or even longer, from the day that it should have died. The craving for survival of dogs or any kind of animals would not be amplified through encouragement and support, nor could their behavior, particularly revival, be manipulated under the hypnotic influence or suggestion of an old man."],
      ["h", "RAMBO 不死之奇蹟"],
      ["p", "Rambo 臨死前3天, 我還帶2隻洛威那兄弟興高采烈的去山頂遊玩，因為 Rambo 一直未有再重現任何病徵。所以大廈的很多個看更和我的3個外傭，都大大讚嘆，毫不猶疑地稱讚這件事情為絕對的奇蹟，因為他們由頭到尾，親眼目睹整件事情的經過，並不是道聽塗說。"],
      ["p", "Rambo 這個神蹟，非常之震撼性，及明顯地，絕對是大神力的表現。由Rambo應該死那一日起計算，它的壽命，不可思議地，被生生猛猛的延長了相等於人壽的接近一年。而且，在它死而復生的這段時間裏，除了它之前所顯現的癌症病徵完全消失之外，神界的大能量，進入了Rambo 的身體之後，就讓它的機能，轉化回復到它身體健康活潑、還未有任何衰老或病態出現之前，宛如一隻正常的、年青力壯的健康寵物。"],
      ["p", "普通人會覺得，能夠醫好一個人就非常厲害， 醫好一隻狗就沒有什麼大不了。但是大家不知道，要醫好一隻狗，比醫好一個人，難度要高很多。因為人會有心理作用，但一隻狗兒不會有任何心理作用，也沒有催眠成份。Rambo 完全不認識師父，而師父當日也只是第一次見它，它對師父沒有任何感情或者熟悉的信任。"],
      ["p", "讓人更加難以理解的是，師父是在和它見面之後的幾分鐘之內，便已經完成了向大神報告，及令 Rambo 即時顯現出一個純粹自然、但極之火速的神恩顯赫的反應。這個自然的反應，就一定是要靠外來的力量。而這外來的力量，亦不是師父的力量，而是來自神界的大能量。所以 Rambo 不是因為認識師父，倚賴着對師父的信任、或者基於師父和它的關係，而發生這不可思議的變化的。"],
      ["p", "Rambo 這個神蹟，比師父醫治其他所有人的個案，都顯得更加震撼，及絕非人類的邏輯分析或者認知能力所能理解的。所以師父覺得一生人，就算連驅走兇猛的惡鬼在內之個案，例如阿彩及 Lorraine，以及醫治楊小姐的肝硬化，爸爸的 cancer 等這些無數已經是超越科學及人類想像的病例，都比不上這個案例來得震撼人心、難以置信。因為這些被厲鬼或者絕症纏繞的，始終是一個人，人都可能會因為對師父的認識和自然信任，而有機會間接影響某些治療的效果。"],
      ["p", "但 Rambo 不知道師父的大能量，更沒有自己正在病危的概念，所以不會存在相信一個從未謀面的人，原來是可以絕對有能力醫好自己的。所以 Rambo 這件神蹟，可以清楚讓人知道，我們的靈魂希望被救，不用下地獄，不用輪迴，不用每一世重複死亡，靠自己是完全沒有用的，我們非靠大神力不可。我們唯一能力所及的，就是倚靠師父與高靈界之間的真確牢固關係，去完全投降及皈依師父所屬的大神國度。"],
      ["audio", "AD6v5dxHzB2sY7KuMhqp1ww7vaEzAvH55_1wCi9ucqx_RIHrqxHc8bRsDozVk-2V4UXAE5d-KAlxGCMDnzNMVmBfTwBdX3n23NbANmx4T7jdUq5H3Bu5Q89xNWz_nfaBQbEP3vb8rmbA", "Narration"],
      ["audio", "AD6v5dwM1DduEJeauonL2cEOGS8gzv5OXfRJ9SRSC8Vq_cJO-PVTkgNvTluCbDVZgd2tEXpIWnQwsVg_SPkpIYkNs2oejPxgI-mSU2IIBltFP8O_C_QBf5TETRfhQ3ET6eDrEJzXbo4", "旁述"],
    ],
  },
];

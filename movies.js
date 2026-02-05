// Movie data structure with comprehensive information
// All movies now support multilingual titles, descriptions, and ratings

const moviesData = [
    // Netflix Movies
    {
        id: 1,
        title: {
            uz: "Qizil Xabar",
            ru: "Красное уведомление",
            en: "Red Notice"
        },
        description: {
            uz: "Interpol agenti dunyodagi eng qidirilayotgan san'at o'g'risini kuzatadi.",
            ru: "Агент Интерпола выслеживает самого разыскиваемого вора произведений искусства в мире.",
            en: "An Interpol agent tracks the world's most wanted art thief."
        },
        genre: ["action", "comedy"],
        year: 2021,
        duration: "1h 58min",
        quality: "4K",
        poster: "https://i.postimg.cc/C5mrM9gh/red-notice.jpg",
        studio: "Netflix",
        trailer: "https://www.youtube.com/embed/RjNcTBXTk4I",
        cast: ["Dwayne Johnson", "Ryan Reynolds", "Gal Gadot"],
        ratings: {
            imdb: 6.3,
            rottenTomatoes: 36,
            dezo: 7.5
        }
    },
    {
        id: 21,
        title: {
            uz: "6 Underground",
            ru: "6 под землей",
            en: "6 Underground"
        },
        description: {
            uz: "Oltita professional qotil hukumatdan mustaqil bo'lib, jahonni o'zgartirishga harakat qiladi.",
            ru: "Шесть профессиональных убийц становятся независимыми от правительства и пытаются изменить мир.",
            en: "Six individuals from all around the globe become the most wanted criminals."
        },
        genre: ["action", "thriller"],
        year: 2019,
        duration: "2h 8min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/6-underground.jpg",
        studio: "Netflix",
        trailer: "https://www.youtube.com/embed/YLE85ol-jjp",
        cast: ["Ryan Reynolds", "Mélanie Laurent", "Manuel Garcia-Rulfo"],
        ratings: {
            imdb: 6.1,
            rottenTomatoes: 36,
            dezo: 6.8
        }
    },
    {
        id: 22,
        title: {
            uz: "The Irishman",
            ru: "Ирландец",
            en: "The Irishman"
        },
        description: {
            uz: "Ikkinchi jahon urushi faxriysi Frank Sheeran mafiya bilan aloqada bo'lgan hayotini hikoya qiladi.",
            ru: "Ветеран Второй мировой войны Фрэнк Ширан рассказывает о своей жизни, связанной с мафией.",
            en: "A mob hitman recalls his possible involvement with the slaying of Jimmy Hoffa."
        },
        genre: ["biography", "crime"],
        year: 2019,
        duration: "3h 29min",
        quality: "4K",
        poster: "https://i.postimg.cc/8CqJxK5L/irishman.jpg",
        studio: "Netflix",
        trailer: "https://www.youtube.com/embed/WHXxVmeGQUc",
        cast: ["Robert De Niro", "Al Pacino", "Joe Pesci"],
        ratings: {
            imdb: 7.8,
            rottenTomatoes: 95,
            dezo: 8.5
        }
    },
    
    // Marvel Movies
    {
        id: 2,
        title: {
            uz: "O'rgimchak-odam: Uyga qaytish",
            ru: "Человек-паук: Возвращение домой",
            en: "Spider-Man: Homecoming"
        },
        description: {
            uz: "Piter Parker oddiy o'rta maktab o'quvchisi va superqahramon sifatida hayotini muvozanatlashtiradi.",
            ru: "Питер Паркер балансирует между жизнью обычного старшеклассника и супергероя.",
            en: "Peter Parker balances his life as an ordinary high school student with being a superhero."
        },
        genre: ["action", "adventure"],
        year: 2017,
        duration: "2h 13min",
        quality: "4K",
        poster: "img/239534-spider-man-homecoming-poster.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/U0D3AOldjMU",
        cast: ["Tom Holland", "Michael Keaton", "Robert Downey Jr."],
        ratings: {
            imdb: 7.4,
            rottenTomatoes: 92,
            dezo: 8.0
        }
    },
    {
        id: 4,
        title: {
            uz: "Abadiylar",
            ru: "Вечные",
            en: "Eternals"
        },
        description: {
            uz: "Yerdagi abadiy mavjudotlar qabilasining afsonasi.",
            ru: "Сага о Вечных, расе бессмертных существ, живших на Земле.",
            en: "The saga of the Eternals, a race of immortal beings who lived on Earth."
        },
        genre: ["adventure", "action"],
        year: 2021,
        duration: "2h 37min",
        quality: "4K",
        poster: "https://i.postimg.cc/c4YNZM9V/eternals.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/x_me3xsvDgk",
        cast: ["Gemma Chan", "Richard Madden", "Angelina Jolie"],
        ratings: {
            imdb: 6.3,
            rottenTomatoes: 47,
            dezo: 7.0
        }
    },
    {
        id: 7,
        title: {
            uz: "Shang-Chi va O'n Uzuklar Afsonasi",
            ru: "Шан-Чи и легенда десяти колец",
            en: "Shang-Chi and the Legend of the Ten Rings"
        },
        description: {
            uz: "Jang san'ati ustasi Shang-Chi o'zining o'tmishini qoldirgan deb o'ylagan narsa bilan yuzlashadi.",
            ru: "Мастер боевых искусств Шан-Чи сталкивается с прошлым, которое он думал, что оставил позади.",
            en: "Martial-arts master Shang-Chi confronts the past he thought he left behind."
        },
        genre: ["action", "fantasy"],
        year: 2021,
        duration: "2h 12min",
        quality: "4K",
        poster: "https://i.postimg.cc/d1vhmV70/shang-chi.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/8YjFbMbfXaE",
        cast: ["Simu Liu", "Awkwafina", "Tony Leung"],
        ratings: {
            imdb: 7.4,
            rottenTomatoes: 91,
            dezo: 8.2
        }
    },
    {
        id: 10,
        title: {
            uz: "Qora Pantera",
            ru: "Черная пантера",
            en: "Black Panther"
        },
        description: {
            uz: "T'Challa Vakandaga uyga qaytib qirol bo'lishi kerak, lekin uning suvereniteti qiyinchiliklarga duch keladi.",
            ru: "Т'Чалла возвращается домой в Ваканду, чтобы стать королем, но его суверенитет подвергается сомнению.",
            en: "T'Challa returns home to Wakanda to become king, but finds his sovereignty challenged."
        },
        genre: ["action", "adventure"],
        year: 2018,
        duration: "2h 14min",
        quality: "4K",
        poster: "https://i.postimg.cc/hjjBqk6r/panther.jpg",
        studio: "Marvel",
        trailer: "https://s11.faylmovi.ru/tarjima_kinolar/Qora_pantera_1080.mp4",
        cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
        ratings: {
            imdb: 7.3,
            rottenTomatoes: 96,
            dezo: 8.7
        }
    },
    {
        id: 16,
        title: {
            uz: "Qasoskorlar: Oxirgi o'yin",
            ru: "Мстители: Финал",
            en: "Avengers: Endgame"
        },
        description: {
            uz: "Cheksizlik urushi halokatli voqealariidan keyin koinot vayron bo'lgan.",
            ru: "После разрушительных событий Войны бесконечности вселенная в руинах.",
            en: "After the devastating events of Infinity War, the universe is in ruins."
        },
        genre: ["action", "scifi"],
        year: 2019,
        duration: "3h 1min",
        quality: "4K",
        poster: "https://avatars.mds.yandex.net/i?id=7c1659452ca8d57e90f647eb8de8bd753caef8c2-5587421-images-thumbs&n=13https://cdn.marvel.com/content/2x/avengersendgame_lob_crd_05.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
        cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
        ratings: {
            imdb: 8.5,
            rottenTomatoes: 94,
            dezo: 9.2
        }
    },
    {
        id: 18,
        title: {
            uz: "Kapitan Marvel",
            ru: "Капитан Марвел",
            en: "Captain Marvel"
        },
        description: {
            uz: "Kerol Danvers koinotning eng kuchli qahramonlaridan biriga aylanadi.",
            ru: "Кэрол Дэнверс становится одним из самых могущественных героев вселенной.",
            en: "Carol Danvers becomes one of the universe's most powerful heroes."
        },
        genre: ["action", "scifi"],
        year: 2019,
        duration: "2h 4min",
        quality: "4K",
        poster: "https://i.postimg.cc/v85swtSC/captain-marvel.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/Z1BCujX3pw8",
        cast: ["Brie Larson", "Samuel L. Jackson", "Ben Mendelsohn"],
        ratings: {
            imdb: 6.8,
            rottenTomatoes: 79,
            dezo: 7.5
        }
    },
    {
        id: 23,
        title: {
            uz: "Temir odam",
            ru: "Железный человек",
            en: "Iron Man"
        },
        description: {
            uz: "Millioner ixtirochi Toni Stark o'zining eng kuchli zirhli kostyumini yaratadi va Temir odamga aylanadi.",
            ru: "Миллионер-изобретатель Тони Старк создает свой самый мощный бронекостюм и становится Железным человеком.",
            en: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
        },
        genre: ["action", "scifi"],
        year: 2008,
        duration: "2h 6min",
        quality: "4K",
        poster: "https://cdn.marvel.com/content/2x/ironman_lob_crd_01_4.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/8ugaeA-nMTc",
        cast: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"],
        ratings: {
            imdb: 7.9,
            rottenTomatoes: 94,
            dezo: 8.5
        }
    },
    {
        id: 24,
        title: {
            uz: "Kapitan Amerika: Birinchi qasoskor",
            ru: "Капитан Америка: Первый мститель",
            en: "Captain America: The First Avenger"
        },
        description: {
            uz: "Ikkinchi jahon urushi paytida zaif Stevi Rogers super askar Kapitan Amerikaga aylanadi.",
            ru: "Во время Второй мировой войны слабый Стив Роджерс становится суперсолдатом Капитаном Америкой.",
            en: "During World War II, a frail Steve Rogers is transformed into super-soldier Captain America."
        },
        genre: ["action", "adventure"],
        year: 2011,
        duration: "2h 4min",
        quality: "4K",
        poster: "https://cdn.marvel.com/content/2x/captainamericathefirstavenger_lob_crd_01_0.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/JerV8L3QdHA",
        cast: ["Chris Evans", "Hayley Atwell", "Sebastian Stan"],
        ratings: {
            imdb: 6.9,
            rottenTomatoes: 80,
            dezo: 8.0
        }
    },
    
    // DC Movies
    {
        id: 9,
        title: {
            uz: "Qora ritsar",
            ru: "Темный рыцарь",
            en: "The Dark Knight"
        },
        description: {
            uz: "Batman qolgan jinoyat tashkilotlarini yo'q qilishga kirishadi.",
            ru: "Бэтмен приступает к уничтожению оставшихся преступных организаций.",
            en: "Batman sets out to dismantle the remaining criminal organizations."
        },
        genre: ["action", "adventure"],
        year: 2008,
        duration: "2h 32min",
        quality: "4K",
        poster: "https://i.postimg.cc/Gt6rKXMj/dark-knight.jpg",
        studio: "DC",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        ratings: {
            imdb: 9.0,
            rottenTomatoes: 94,
            dezo: 9.5
        }
    },
    {
        id: 17,
        title: {
            uz: "Ajoyib ayol 1984",
            ru: "Чудо-женщина 1984",
            en: "Wonder Woman 1984"
        },
        description: {
            uz: "Diana hamkasbi va biznesmen bilan kurashishi kerak, uning haqiqiy sevgi istagi halokatlidir.",
            ru: "Диана должна бороться с коллегой и бизнесменом, чье желание настоящей любви катастрофично.",
            en: "Diana must contend with a work colleague and businessman, whose desire for true love is catastrophic."
        },
        genre: ["action", "adventure"],
        year: 2020,
        duration: "2h 31min",
        quality: "4K",
        poster: "https://i.postimg.cc/1X0h0yqy/ww84.jpg",
        studio: "DC",
        trailer: "https://www.youtube.com/embed/XW2E2Fnh52w",
        cast: ["Gal Gadot", "Chris Pine", "Kristen Wiig"],
        ratings: {
            imdb: 5.4,
            rottenTomatoes: 58,
            dezo: 6.5
        }
    },
    {
        id: 25,
        title: {
            uz: "Superman: Po'lat odam",
            ru: "Супермен: Человек из стали",
            en: "Man of Steel"
        },
        description: {
            uz: "Kriptondan kelgan Kal-El Yerda Supermenga aylanadi va o'z kuchlarini o'rganadi.",
            ru: "Кал-Эл с Криптона становится Суперменом на Земле и учится использовать свои силы.",
            en: "An alien child is evacuated from his dying world and sent to Earth, where he grows up to become his adoptive home's first and greatest superhero."
        },
        genre: ["action", "scifi"],
        year: 2013,
        duration: "2h 23min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/man-of-steel.jpg",
        studio: "DC",
        trailer: "https://www.youtube.com/embed/T6DJcgm3wNY",
        cast: ["Henry Cavill", "Amy Adams", "Michael Shannon"],
        ratings: {
            imdb: 7.1,
            rottenTomatoes: 56,
            dezo: 7.8
        }
    },
    {
        id: 26,
        title: {
            uz: "Ajoyib ayol",
            ru: "Чудо-женщина",
            en: "Wonder Woman"
        },
        description: {
            uz: "Amazon malikasi Diana birinchi jahon urushida odamlar olamiga chiqadi va to'liq qudratli qahramonga aylanadi.",
            ru: "Принцесса амазонок Диана выходит в мир людей во время Первой мировой войны и становится полностью могущественным героем.",
            en: "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war."
        },
        genre: ["action", "adventure"],
        year: 2017,
        duration: "2h 21min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/wonder-woman.jpg",
        studio: "DC",
        trailer: "https://www.youtube.com/embed/1Q8fG0TtVAY",
        cast: ["Gal Gadot", "Chris Pine", "Robin Wright"],
        ratings: {
            imdb: 7.4,
            rottenTomatoes: 93,
            dezo: 8.3
        }
    },
    {
        id: 27,
        title: {
            uz: "Aquaman",
            ru: "Аквамен",
            en: "Aquaman"
        },
        description: {
            uz: "Arthur Curry o'zining haqiqiy qismini topadi - Atlantida qiroli bo'lishi kerak.",
            ru: "Артур Карри находит свою истинную судьбу - стать королем Атлантиды.",
            en: "Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis."
        },
        genre: ["action", "adventure"],
        year: 2018,
        duration: "2h 23min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/aquaman.jpg",
        studio: "DC",
        trailer: "https://www.youtube.com/embed/WDkg3h8PCVU",
        cast: ["Jason Momoa", "Amber Heard", "Willem Dafoe"],
        ratings: {
            imdb: 6.8,
            rottenTomatoes: 65,
            dezo: 7.5
        }
    },
    {
        id: 28,
        title: {
            uz: "Shazam!",
            ru: "Шазам!",
            en: "Shazam!"
        },
        description: {
            uz: "14 yoshli o'g'il bola sehrli so'zni aytib, kattalar superqahramonga aylanadi.",
            ru: "14-летний мальчик произносит волшебное слово и превращается во взрослого супергероя.",
            en: "A newly fostered young boy in search of his mother instead finds unexpected superpowers."
        },
        genre: ["action", "comedy"],
        year: 2019,
        duration: "2h 12min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/shazam.jpg",
        studio: "DC",
        trailer: "https://www.youtube.com/embed/go6GEIrcvFY",
        cast: ["Zachary Levi", "Mark Strong", "Asher Angel"],
        ratings: {
            imdb: 7.0,
            rottenTomatoes: 90,
            dezo: 8.0
        }
    },
    
    // Paramount Pictures
    {
        id: 13,
        title: {
            uz: "Xususiy Rayanni qutqarish",
            ru: "Спасти рядового Райана",
            en: "Saving Private Ryan"
        },
        description: {
            uz: "Normandiya qo'nishidan keyin AQSh askarlari guruhi dushman chizig'i orqasiga boradi.",
            ru: "После высадки в Нормандии группа американских солдат идет за линию врага.",
            en: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines."
        },
        genre: ["war", "action"],
        year: 1998,
        duration: "2h 49min",
        quality: "4K",
        poster: "https://i.postimg.cc/VkgsQW5z/saving-private-ryan.jpg",
        studio: "Paramount Pictures",
        trailer: "https://www.youtube.com/embed/9CiW_DgxCnQ",
        cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
        ratings: {
            imdb: 8.6,
            rottenTomatoes: 93,
            dezo: 9.0
        }
    },
    {
        id: 14,
        title: {
            uz: "Yulduzlararo",
            ru: "Интерстеллар",
            en: "Interstellar"
        },
        description: {
            uz: "Tadqiqotchilar jamoasi insoniyatning omon qolishini ta'minlash uchun kosmosdagi qurt deligidan o'tadi.",
            ru: "Команда исследователей путешествует через червоточину в космосе, пытаясь обеспечить выживание человечества.",
            en: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
        },
        genre: ["scifi", "adventure"],
        year: 2014,
        duration: "2h 49min",
        quality: "4K",
        poster: "https://i.postimg.cc/cHgd3qhJ/interstaller.jpg",
        studio: "Paramount Pictures",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        ratings: {
            imdb: 8.7,
            rottenTomatoes: 72,
            dezo: 9.1
        }
    },
    {
        id: 29,
        title: {
            uz: "Transformers",
            ru: "Трансформеры",
            en: "Transformers"
        },
        description: {
            uz: "Yoshlar o'rtasidagi urush Yerga yetib keladi va odamlar o'rtasida yashirin urush boshlanadi.",
            ru: "Война между автоботами и десептиконами достигает Земли, и начинается скрытая война среди людей.",
            en: "An ancient war between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth."
        },
        genre: ["action", "scifi"],
        year: 2007,
        duration: "2h 24min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/transformers.jpg",
        studio: "Paramount Pictures",
        trailer: "https://www.youtube.com/embed/dxQxgAfNzyE",
        cast: ["Shia LaBeouf", "Megan Fox", "Josh Duhamel"],
        ratings: {
            imdb: 7.0,
            rottenTomatoes: 57,
            dezo: 7.5
        }
    },
    {
        id: 30,
        title: {
            uz: "Mission: Impossible - Fallout",
            ru: "Миссия невыполнима: Последствия",
            en: "Mission: Impossible - Fallout"
        },
        description: {
            uz: "Ethan Hunt va uning IMF jamoasi yadroviy qurollarni topish uchun vaqt bilan yugurishadi.",
            ru: "Итан Хант и его команда МВФ соревнуются со временем, чтобы найти ядерное оружие.",
            en: "Ethan Hunt and his IMF team must race against time after a mission gone wrong."
        },
        genre: ["action", "thriller"],
        year: 2018,
        duration: "2h 27min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/mission-impossible.jpg",
        studio: "Paramount Pictures",
        trailer: "https://www.youtube.com/embed/wb1-oY9N7sQ",
        cast: ["Tom Cruise", "Henry Cavill", "Ving Rhames"],
        ratings: {
            imdb: 7.7,
            rottenTomatoes: 97,
            dezo: 8.8
        }
    },
    
    // Disney Movies
    {
        id: 19,
        title: {
            uz: "Birinch boshlanish",
            ru: "Первое начало",
            en: "First Beginning"
        },
        description: {
            uz: "Jozibali fantastik sarguzasht - yangi qahramonlar dunyoni qutqarish uchun ko'tariladi.",
            ru: "Захватывающее фантастическое приключение - новые герои поднимаются, чтобы спасти мир.",
            en: "A thrilling fantasy adventure - new heroes rise to save the world."
        },
        genre: ["fantasy", "adventure"],
        year: 2025,
        duration: "2h 11min",
        quality: "4K",
        poster: "img/poster.jpg",
        studio: "Disney",
        trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        cast: ["Unknown", "Unknown", "Unknown"],
        ratings: {
            imdb: 8.5,
            rottenTomatoes: 85,
            dezo: 8.7
        }
    },
    {
        id: 31,
        title: {
            uz: "Frozen 2",
            ru: "Холодное сердце 2",
            en: "Frozen 2"
        },
        description: {
            uz: "Elsa, Anna, Kristoff va Olaf Enchanted Forestga sayohat qilishadi va ularning oila tarixini o'rganadilar.",
            ru: "Эльза, Анна, Кристофф и Олаф отправляются в Зачарованный лес и узнают историю своей семьи.",
            en: "Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest."
        },
        genre: ["animation", "adventure"],
        year: 2019,
        duration: "1h 43min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/frozen2.jpg",
        studio: "Disney",
        trailer: "https://www.youtube.com/embed/Zi4LMpSDccc",
        cast: ["Idina Menzel", "Kristen Bell", "Josh Gad"],
        ratings: {
            imdb: 6.9,
            rottenTomatoes: 77,
            dezo: 8.0
        }
    },
    {
        id: 32,
        title: {
            uz: "Moana",
            ru: "Моана",
            en: "Moana"
        },
        description: {
            uz: "Polineziyalik qiz okean orqali sayohat qiladi va qadimiy afsonani to'ldirish uchun yarim xudo bilan hamkorlik qiladi.",
            ru: "Полинезийская девушка путешествует по океану и сотрудничает с полубогом, чтобы выполнить древнюю легенду.",
            en: "In Ancient Polynesia, a young girl uses her navigational talents to set sail for a fabled island."
        },
        genre: ["animation", "adventure"],
        year: 2016,
        duration: "1h 47min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/moana.jpg",
        studio: "Disney",
        trailer: "https://www.youtube.com/embed/LKFuXETZUsI",
        cast: ["Auli'i Cravalho", "Dwayne Johnson", "Rachel House"],
        ratings: {
            imdb: 7.6,
            rottenTomatoes: 95,
            dezo: 8.5
        }
    },
    {
        id: 33,
        title: {
            uz: "Yulduzlar urushi: Kuch uyg'onadi",
            ru: "Звездные войны: Пробуждение силы",
            en: "Star Wars: The Force Awakens"
        },
        description: {
            uz: "Yulduzlar urushi davom etadi - yangi qahramonlar va eski do'stlar birga.",
            ru: "Звездные войны продолжаются - новые герои и старые друзья вместе.",
            en: "Three decades after the defeat of the Galactic Empire, a new threat arises."
        },
        genre: ["action", "scifi"],
        year: 2015,
        duration: "2h 18min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/star-wars.jpg",
        studio: "Disney",
        trailer: "https://www.youtube.com/embed/sGbxmsDFVnE",
        cast: ["Daisy Ridley", "John Boyega", "Harrison Ford"],
        ratings: {
            imdb: 7.8,
            rottenTomatoes: 93,
            dezo: 8.5
        }
    },
    
    // 20th Century Fox
    {
        id: 34,
        title: {
            uz: "Avatar",
            ru: "Аватар",
            en: "Avatar"
        },
        description: {
            uz: "Jake Sully Pandoraga sayohat qiladi va Na'vi xalqi bilan aloqa o'rnatadi.",
            ru: "Джейк Салли отправляется на Пандору и устанавливает связь с народом На'ви.",
            en: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders."
        },
        genre: ["action", "scifi"],
        year: 2009,
        duration: "2h 42min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/avatar.jpg",
        studio: "20th Century Fox",
        trailer: "https://www.youtube.com/embed/5PSNL1qE6VY",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
        ratings: {
            imdb: 7.8,
            rottenTomatoes: 82,
            dezo: 8.5
        }
    },
    {
        id: 35,
        title: {
            uz: "Deadpool",
            ru: "Дэдпул",
            en: "Deadpool"
        },
        description: {
            uz: "Mutant Wade Wilson Deadpool sifatida o'zining super kuchlarini topadi va qasos olishga kirishadi.",
            ru: "Мутант Уэйд Уилсон обретает сверхспособности как Дэдпул и начинает мстить.",
            en: "A wisecracking mercenary gets experimented on and becomes immortal but ugly."
        },
        genre: ["action", "comedy"],
        year: 2016,
        duration: "1h 48min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/deadpool.jpg",
        studio: "20th Century Fox",
        trailer: "https://www.youtube.com/embed/ONHBaC-pfsk",
        cast: ["Ryan Reynolds", "Morena Baccarin", "Ed Skrein"],
        ratings: {
            imdb: 8.0,
            rottenTomatoes: 85,
            dezo: 8.8
        }
    },
    {
        id: 36,
        title: {
            uz: "Logan",
            ru: "Логан",
            en: "Logan"
        },
        description: {
            uz: "Qarigan Wolverine o'zining oxirgi sarguzashtini boshdan kechiradi.",
            ru: "Постаревший Росомаха переживает свое последнее приключение.",
            en: "In the near future, a weary Logan cares for an ailing Professor X."
        },
        genre: ["action", "drama"],
        year: 2017,
        duration: "2h 17min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/logan.jpg",
        studio: "20th Century Fox",
        trailer: "https://www.youtube.com/embed/Div0iP65aZo",
        cast: ["Hugh Jackman", "Patrick Stewart", "Dafne Keen"],
        ratings: {
            imdb: 8.1,
            rottenTomatoes: 94,
            dezo: 9.0
        }
    },
    
    // Warner Bros
    {
        id: 3,
        title: {
            uz: "Matrix: Qaytish",
            ru: "Матрица: Воскрешение",
            en: "The Matrix Ressurections"
        },
        description: {
            uz: "Ikki haqiqat olamiga qaytish: biri kundalik hayot; ikkinchisi, uning ortida nima yotadi.",
            ru: "Возвращение в мир двух реальностей: одна, повседневная жизнь; другая, что лежит за ней.",
            en: "Return to a world of two realities: one, everyday life; the other, what lies behind it."
        },
        genre: ["scifi", "action"],
        year: 2021,
        duration: "2h 28min",
        quality: "4K",
        poster: "https://i.postimg.cc/Kv3HBGtL/matrix.jpg",
        studio: "Warner Bros",
        trailer: "https://www.youtube.com/embed/9ix7TUGVYIo",
        cast: ["Keanu Reeves", "Carrie-Anne Moss", "Yahya Abdul-Mateen II"],
        ratings: {
            imdb: 5.6,
            rottenTomatoes: 63,
            dezo: 6.5
        }
    },
    {
        id: 5,
        title: {
            uz: "Dune: Birinchi qism",
            ru: "Дюна: Часть первая",
            en: "Dune: Part One"
        },
        description: {
            uz: "Frank Herbertning ilmiy-fantastik romanining moslashtirilgan versiyasi - zodagon oila o'g'li haqida.",
            ru: "Экранизация научно-фантастического романа Фрэнка Герберта о сыне знатной семьи.",
            en: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family."
        },
        genre: ["scifi", "adventure"],
        year: 2021,
        duration: "2h 35min",
        quality: "4K",
        poster: "https://i.postimg.cc/Y9jJP1LD/dune.jpg",
        studio: "Warner Bros",
        trailer: "https://www.youtube.com/embed/8g18jFHCLXk",
        cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
        ratings: {
            imdb: 8.0,
            rottenTomatoes: 83,
            dezo: 8.5
        }
    },
    {
        id: 37,
        title: {
            uz: "Inception",
            ru: "Начало",
            en: "Inception"
        },
        description: {
            uz: "Xakerlar tushlar ichiga kirib, fikrlarni o'g'irlashadi, lekin endi ular tushga tushirishga harakat qilishmoqda.",
            ru: "Хакеры проникают в сны, чтобы украсть мысли, но теперь они пытаются внедрить идею.",
            en: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
        },
        genre: ["action", "scifi"],
        year: 2010,
        duration: "2h 28min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/inception.jpg",
        studio: "Warner Bros",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
        ratings: {
            imdb: 8.8,
            rottenTomatoes: 87,
            dezo: 9.3
        }
    },
    {
        id: 38,
        title: {
            uz: "Joker",
            ru: "Джокер",
            en: "Joker"
        },
        description: {
            uz: "Gotham shahrida komediyachi sifatida ishlayotgan Arthur Fleck asta-sekin Jokerga aylanadi.",
            ru: "Артур Флек, работающий комиком в Готэме, постепенно превращается в Джокера.",
            en: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime."
        },
        genre: ["drama", "thriller"],
        year: 2019,
        duration: "2h 2min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/joker.jpg",
        studio: "Warner Bros",
        trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
        cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
        ratings: {
            imdb: 8.4,
            rottenTomatoes: 68,
            dezo: 8.8
        }
    },
    
    // Columbia Pictures
    {
        id: 39,
        title: {
            uz: "Spider-Man: Uydan uzoqda",
            ru: "Человек-паук: Вдали от дома",
            en: "Spider-Man: Far From Home"
        },
        description: {
            uz: "Piter Parker Yevropaga tashrif buyuradi, lekin u yerda Nick Fury uni yangi vazifaga chaqiradi.",
            ru: "Питер Паркер отправляется в Европу, но там Ник Фьюри вызывает его на новое задание.",
            en: "Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats."
        },
        genre: ["action", "adventure"],
        year: 2019,
        duration: "2h 9min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/spiderman-ffh.jpg",
        studio: "Columbia Pictures",
        trailer: "https://www.youtube.com/embed/DYYtuKyMtY8",
        cast: ["Tom Holland", "Samuel L. Jackson", "Jake Gyllenhaal"],
        ratings: {
            imdb: 7.4,
            rottenTomatoes: 90,
            dezo: 8.2
        }
    },
    {
        id: 40,
        title: {
            uz: "Men in Black",
            ru: "Люди в черном",
            en: "Men in Black"
        },
        description: {
            uz: "Yerda yashovchi muammolarni hal qiluvchi maxfiy tashkilot agentlari.",
            ru: "Агенты секретной организации, решающей проблемы инопланетян на Земле.",
            en: "A police officer joins a secret organization that polices and monitors extraterrestrial interactions."
        },
        genre: ["action", "comedy"],
        year: 1997,
        duration: "1h 38min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/mib.jpg",
        studio: "Columbia Pictures",
        trailer: "https://www.youtube.com/embed/hXzcyx9V0xw",
        cast: ["Will Smith", "Tommy Lee Jones", "Linda Fiorentino"],
        ratings: {
            imdb: 7.3,
            rottenTomatoes: 92,
            dezo: 8.0
        }
    },
    {
        id: 41,
        title: {
            uz: "Bad Boys for Life",
            ru: "Плохие парни навсегда",
            en: "Bad Boys for Life"
        },
        description: {
            uz: "Miami detektivlari Mike Lowrey va Marcus Burnett yana bir bor birga ishlashadi.",
            ru: "Детективы Майами Майк Лоури и Маркус Барнетт снова работают вместе.",
            en: "The Bad Boys Mike Lowrey and Marcus Burnett are back together for one last ride."
        },
        genre: ["action", "comedy"],
        year: 2020,
        duration: "2h 4min",
        quality: "4K",
        poster: "https://i.postimg.cc/8zQvJxK5/bad-boys.jpg",
        studio: "Columbia Pictures",
        trailer: "https://www.youtube.com/embed/jKCj3XuH8f4",
        cast: ["Will Smith", "Martin Lawrence", "Vanessa Hudgens"],
        ratings: {
            imdb: 6.6,
            rottenTomatoes: 76,
            dezo: 7.5
        }
    },
    
    // Additional movies
    {
        id: 6,
        title: {
            uz: "1917",
            ru: "1917",
            en: "1917"
        },
        description: {
            uz: "Birinchi jahon urushi paytida ikki yosh britaniyalik askarga imkonsiz vazifa beriladi.",
            ru: "Двум молодым британским солдатам во время Первой мировой войны дается невозможная миссия.",
            en: "Two young British soldiers during the First World War are given an impossible mission."
        },
        genre: ["war", "drama"],
        year: 2019,
        duration: "1h 59min",
        quality: "4K",
        poster: "https://i.postimg.cc/q7NwVQQK/1917.jpg",
        studio: "Universal",
        trailer: "https://www.youtube.com/embed/YqNYrYUiMfg",
        cast: ["George MacKay", "Dean-Charles Chapman", "Mark Strong"],
        ratings: {
            imdb: 8.2,
            rottenTomatoes: 89,
            dezo: 8.8
        }
    },
    {
        id: 8,
        title: {
            uz: "Casino Royale",
            ru: "Казино Рояль",
            en: "Casino Royale"
        },
        description: {
            uz: "Jeyms Bondning birinchi 00 missiyasi, u yerda terrorchilarni moliyalashtiruvchi xususiy bankirni mag'lub etishi kerak.",
            ru: "Первая миссия 00 Джеймса Бонда, где он должен победить частного банкира, финансирующего террористов.",
            en: "James Bond's first 00 mission, where he must defeat a private banker funding terrorists."
        },
        genre: ["action", "adventure"],
        year: 2006,
        duration: "2h 24min",
        quality: "4K",
        poster: "https://i.postimg.cc/L6r638wM/casino-royale.jpg",
        studio: "Sony",
        trailer: "https://www.youtube.com/embed/36mnx8dBbGE",
        cast: ["Daniel Craig", "Eva Green", "Mads Mikkelsen"],
        ratings: {
            imdb: 8.0,
            rottenTomatoes: 94,
            dezo: 8.5
        }
    },
    {
        id: 11,
        title: {
            uz: "Venom",
            ru: "Веном",
            en: "Venom"
        },
        description: {
            uz: "Muvaffaqiyatsiz muxbir simbiot deb ataladigan ko'plab kosmik mavjudotlardan biriga bog'lanadi.",
            ru: "Неудавшийся репортер связывается с космическим существом, одним из многих симбиотов.",
            en: "A failed reporter is bonded to an alien entity, one of many symbiotes."
        },
        genre: ["action", "adventure"],
        year: 2018,
        duration: "1h 52min",
        quality: "4K",
        poster: "https://i.postimg.cc/QtyrN6rr/venom.jpg",
        studio: "Sony",
        trailer: "https://www.youtube.com/embed/u9Mv98Gr5pY",
        cast: ["Tom Hardy", "Michelle Williams", "Riz Ahmed"],
        ratings: {
            imdb: 6.6,
            rottenTomatoes: 30,
            dezo: 7.0
        }
    },
    {
        id: 12,
        title: {
            uz: "Uzuklar hukmdori: Qirolning qaytishi",
            ru: "Властелин колец: Возвращение короля",
            en: "Lord Of The Rings: Return Of The King"
        },
        description: {
            uz: "Gandalf va Aragorn Sauron qo'shiniga qarshi odamlar olamini boshqaradi.",
            ru: "Гэндальф и Арагорн ведут мир людей против армии Саурона.",
            en: "Gandalf and Aragorn lead the World of Men against Sauron's army."
        },
        genre: ["fantasy", "adventure"],
        year: 2003,
        duration: "3h 21min",
        quality: "4K",
        poster: "https://i.postimg.cc/3JgJ9TT4/LOTR.jpg",
        studio: "New Line Cinema",
        trailer: "https://www.youtube.com/embed/r5X-hFf6Bwo",
        cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
        ratings: {
            imdb: 9.0,
            rottenTomatoes: 95,
            dezo: 9.5
        }
    },
    {
        id: 15,
        title: {
            uz: "Gladiator",
            ru: "Гладиатор",
            en: "Gladiator"
        },
        description: {
            uz: "Sobiq Rim generali fozil imperatorga qarshi qasos olishga kirishadi.",
            ru: "Бывший римский генерал приступает к мести против коррумпированного императора.",
            en: "A former Roman General sets out to exact vengeance against the corrupt emperor."
        },
        genre: ["action", "adventure"],
        year: 2000,
        duration: "2h 35min",
        quality: "4K",
        poster: "https://i.postimg.cc/y8LKr6rd/gladiator.jpg",
        studio: "Universal",
        trailer: "https://www.youtube.com/embed/owK1qxDselE",
        cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
        ratings: {
            imdb: 8.5,
            rottenTomatoes: 77,
            dezo: 9.0
        }
    },
    {
        id: 20,
        title: {
            uz: "Yangi Qasoskorlar",
            ru: "Новые мстители",
            en: "New Avengers"
        },
        description: {
            uz: "Marvel - yangi qahramonlar dunyoni qutqarish uchun ko'tariladi.",
            ru: "Marvel - новые герои поднимаются, чтобы спасти мир.",
            en: "Marvel - new heroes rise to save the world."
        },
        genre: ["action", "adventure"],
        year: 2025,
        duration: "2h 11min",
        quality: "4K",
        poster: "https://cdn.marvel.com/content/2x/thenewavengers_lob_crd_01.jpg",
        studio: "Marvel",
        trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        cast: ["Unknown", "Unknown", "Unknown"],
        ratings: {
            imdb: 8.0,
            rottenTomatoes: 80,
            dezo: 8.5
        }

        
    }

    
];

// TMDB API Integration
let tmdbMoviesLoaded = false;
let allMoviesData = [...moviesData]; // Start with static data

/**
 * Load movies from TMDB API and merge with static data
 */
async function loadMoviesFromTMDB() {
    try {
        // Check if TMDB API functions are available
        if (typeof initializeTMDBMovies === 'function') {
            const tmdbMovies = await initializeTMDBMovies(100);
            
            if (tmdbMovies && tmdbMovies.length > 0) {
                // Filter to only Marvel and DC movies
                const marvelAndDCMovies = tmdbMovies.filter(movie => 
                    movie.studio === 'Marvel' || movie.studio === 'DC'
                );
                
                // Remove existing Marvel and DC movies from static data
                allMoviesData = moviesData.filter(movie => 
                    movie.studio !== 'Marvel' && movie.studio !== 'DC'
                );
                
                // Add TMDB movies
                allMoviesData = [...allMoviesData, ...marvelAndDCMovies];
                
                // Sort by release date (newest first)
                allMoviesData.sort((a, b) => {
                    if (b.releaseDate && a.releaseDate) {
                        return new Date(b.releaseDate) - new Date(a.releaseDate);
                    }
                    return b.year - a.year;
                });
                
                tmdbMoviesLoaded = true;
                console.log(`Loaded ${marvelAndDCMovies.length} Marvel and DC movies from TMDB`);
                
                // Trigger a re-render if the app is already initialized
                if (typeof filterAndRenderMovies === 'function') {
                    filterAndRenderMovies();
                }
            }
        }
    } catch (error) {
        console.error('Error loading movies from TMDB:', error);
        // Fall back to static data
        allMoviesData = [...moviesData];
    }
}

// Auto-load TMDB movies when script loads (if API key is configured)
if (typeof window !== 'undefined') {
    // Load TMDB movies after a short delay to ensure DOM is ready
    setTimeout(() => {
        loadMoviesFromTMDB().then(() => {
            // Update banner movies after TMDB loads
            if (typeof getBannerMovies === 'function') {
                bannerMovies = getBannerMovies();
            }
        });
    }, 1000);
}

/**
 * Get banner movies for carousel
 * @returns {Array} Array of banner movies
 */
function getBannerMovies() {
    const bannerIds = [
        {
            id: 16, // Avengers: Endgame
            genre: ["action", "scifi"]
        },
        {
            id: 9, // The Dark Knight
            genre: ["action", "adventure"]
        },
        {
            id: 19, // First Beginning
            genre: ["fantasy", "adventure"]
        },
        {
            id: 37, // Inception
            genre: ["action", "scifi"]
        },
        {
            id: 20 // New Avengers
        }
    ];
    
    return bannerIds.map(banner => {
        const movie = allMoviesData.find(m => m.id === banner.id);
        if (movie) {
            return {
                ...movie,
                genre: banner.genre || movie.genre
            };
        }
        return null;
    }).filter(Boolean);
}

// Initialize bannerMovies with static data, will be updated when TMDB loads
let bannerMovies = getBannerMovies();

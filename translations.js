// Internationalization (i18n) Translations
// Clean, scalable translation structure

const translations = {
    uz: {
        // Navigation
        nav: {
            home: "Asosiy",
            tv: "TV",
            movies: "Filmlar",
            series: "Seriallar",
            cartoons: "Multfilmlar",
            anime: "Anime",
            live: "Jonli efir",
            pricing: "Narxlar",
            favorites: "Sevimlilar"
        },
        
        // Search
        search: {
            placeholder: "Film izlash...",
            button: "Qidirish"
        },
        
        // Auth
        auth: {
            login: "Kirish",
            signup: "Ro'yxatdan o'tish",
            logout: "Chiqish",
            loginTitle: "Kirish",
            loginSubtitle: "Hisobingizga kiring",
            signupTitle: "Ro'yxatdan o'tish",
            signupSubtitle: "Yangi hisob yarating",
            email: "Email",
            password: "Parol",
            name: "Ism",
            confirmPassword: "Parolni tasdiqlash",
            remember: "Eslab qolish",
            forgotPassword: "Parolni unutdingizmi?",
            noAccount: "Hisobingiz yo'qmi?",
            haveAccount: "Allaqachon hisobingiz bormi?",
            namePlaceholder: "Ismingiz",
            emailPlaceholder: "email@example.com",
            passwordPlaceholder: "Parolingizni kiriting",
            passwordMinPlaceholder: "Kamida 6 belgi",
            confirmPasswordPlaceholder: "Parolni qayta kiriting",
            terms: "Men <a href=\"#\">shartlar</a> va <a href=\"#\">maxfiylik siyosati</a>ga roziman",
            termsLink: "shartlar",
            privacyLink: "maxfiylik siyosati"
        },
        
        // User Menu
        userMenu: {
            upgrade: "Premium ga o'tish",
            bookmarks: "Saqlanganlar",
            settings: "Sozlamalar",
            logout: "Chiqish",
            basicPlan: "Basic Plan",
            premiumPlan: "Premium Plan"
        },
        
        // Filters
        filters: {
            allGenres: "Barcha Janrlar",
            allYears: "Barcha Yillar",
            action: "Jangari",
            adventure: "Sarguzasht",
            comedy: "Komediya",
            drama: "Drama",
            animation: "Animatsiya",
            biography: "Hayotiy",
            fantasy: "Fantastik",
            horror: "Qorqinchili",
            scifi: "Ilmiy-fantastik",
            war: "Urush",
            classic: "Klassik"
        },
        
        // Movies
        movies: {
            loadMore: "YANA YUKLASH",
            noMovies: "Film topilmadi",
            noMoviesDesc: "Filtrlarni yoki qidiruv so'zlarini o'zgartiring",
            playTrailer: "Treylerni ko'rish",
            watchMovie: "Filmini ko'rish",
            watchTrailer: "Treylerni ko'rish",
            cast: "Aktyorlar",
            rating: "Reyting",
            year: "Yil",
            releaseYear: "Chiqarilgan yil",
            duration: "Davomiyligi",
            studio: "Studiya",
            quality: "Sifat",
            description: "Tavsif",
            noDescription: "Tavsif mavjud emas",
            showMore: "Yana ko'rsatish",
            carouselBack: "Orqaga",
            carouselTitle: "Barcha filmlar"
        },
        
        // Ratings
        ratings: {
            imdb: "IMDb",
            rottenTomatoes: "Rotten Tomatoes",
            dezo: "Dezo Rating",
            rateMovie: "Filmini baholash",
            yourRating: "Sizning bahoingiz",
            averageRating: "O'rtacha baho"
        },
        
        // Studios
        studios: {
            marvel: "Marvel",
            dc: "DC",
            paramountpictures: "Paramount Pictures",
            disney: "Disney",
            netflix: "Netflix",
            "20thcenturyfox": "20th Century Fox",
            warnerbros: "Warner Bros",
            columbiapictures: "Columbia Pictures",
            sony: "Sony",
            universal: "Universal",
            "newlinecinema": "New Line Cinema"
        },
        
        // Trailer
        trailer: {
            title: "Treyler"
        },
        
        // Categories
        categories: {
            title: "Kategoriyalar",
            action: "Jangari",
            comedy: "Komediya",
            thriller: "Triller",
            horror: "Qo'rqinchli",
            adventure: "Sarguzasht",
            animation: "Animatsiya",
            crime: "Jinoyat",
            scifi: "Ilmiy-fantastik"
        },
        
        // Live
        live: {
            title: "Jonli TV Dasturlar",
            live: "JONLI",
            viewers: "ko'ruvchilar"
        },
        
        // TV Channels
        tv: {
            title: "TV Kanallar",
            noChannels: "Kanallar topilmadi",
            watching: "Ko'rish",
            live: "Jonli",
            selectChannel: "Kanalni tanlang"
        },
        
        // Series
        series: {
            title: "Seriallar",
            noSeries: "Seriallar topilmadi",
            noSeriesDesc: "Hozircha seriallar mavjud emas",
            seasons: "Fasllar",
            episodes: "Qismlar",
            watchEpisode: "Qismni ko'rish"
        },
        
        // Cartoons
        cartoons: {
            title: "Multfilmlar",
            noCartoons: "Multfilmlar topilmadi",
            noCartoonsDesc: "Hozircha multfilmlar mavjud emas"
        },
        
        // Anime
        anime: {
            title: "Anime",
            noAnime: "Anime topilmadi",
            noAnimeDesc: "Hozircha anime mavjud emas"
        },
        
        // Pricing
        pricing: {
            title: "Narxlar",
            subtitle: "O'zingizga mos tarifni tanlang",
            basic: "Basic",
            premium: "Premium",
            monthly: "oyiga",
            yearly: "yiliga",
            features: "Xususiyatlar",
            unlimited: "Cheksiz filmlar va seriallar",
            hdQuality: "HD va 4K sifat",
            noAds: "Reklamalarsiz",
            multipleDevices: "Bir nechta qurilma",
            download: "Yuklab olish",
            selectPlan: "Tarifni tanlash",
            currentPlan: "Joriy tarif"
        },
        
        // Favorites
        favorites: {
            title: "Sevimlilar",
            empty: "Sevimlilar bo'sh",
            emptyDesc: "Siz hali hech narsani sevimlilar ro'yxatiga qo'shmadingiz",
            movies: "Filmlar",
            series: "Seriallar",
            tvChannels: "TV Kanallar",
            remove: "O'chirish",
            added: "Sevimlilarga qo'shildi",
            removed: "Sevimlilardan olib tashlandi"
        },
        
        // Footer
        footer: {
            slogan: "Filmlar va TV Dasturlar, Onlayn Kino, Film Ma'lumotlar Bazasi HTML Shablon",
            about: "Biz haqimizda",
            profile: "Mening profilim",
            pricing: "Narxlar",
            contacts: "Kontaktlar",
            browse: "Ko'rib chiqish",
            liveTV: "Jonli TV",
            liveNews: "Jonli Yangiliklar",
            liveSports: "Jonli Sport",
            streaming: "Oqim Kutubxonasi",
            tvShows: "TV Dasturlar",
            movies: "Filmlar",
            kids: "Bolalar",
            collections: "Kolleksiyalar",
            help: "Yordam",
            support: "Qo'llab quvatlash xizmati",
            terms: "Tariflar va Xavfsizlik",
            aboutService: "Bu servis haqida",
            access: "Erisha olish",
            copyright: "© Mualliflik huquqi 2025 Dezo Max",
            privacy: "Maxfiylik siyosati",
            termsConditions: "Shartlar va shartlar"
        },
        
        // Language Settings
        language: {
            title: "Til Sozlamalari",
            subtitle: "Veb-sayt tilini tanlang",
            select: "Tilni tanlang",
            current: "Joriy til",
            save: "Saqlash",
            cancel: "Bekor qilish"
        },
        
        // Notifications
        notifications: {
            loginRequired: "Saqlash uchun tizimga kiring",
            bookmarkAdded: "Saqlanganlarga qo'shildi",
            bookmarkRemoved: "Saqlanganlardan olib tashlandi",
            loginSuccess: "Muvaffaqiyatli kirildi!",
            signupSuccess: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
            logoutSuccess: "Muvaffaqiyatli chiqildi",
            premiumUpgrade: "Premium plan ga muvaffaqiyatli o'tdingiz!",
            watchLogin: "Filmlarni ko'rish uchun tizimga kiring",
            premiumRequired: "Bu film Premium rejada mavjud. Premium ga o'ting!",
            languageChanged: "Til muvaffaqiyatli o'zgartirildi"
        },
        
        // Errors
        errors: {
            emailExists: "Bu email allaqachon ro'yxatdan o'tgan",
            invalidEmail: "Noto'g'ri email formati",
            shortPassword: "Parol kamida 6 belgidan iborat bo'lishi kerak",
            wrongCredentials: "Email yoki parol noto'g'ri",
            passwordMismatch: "Parollar mos kelmaydi"
        }
    },
    
    ru: {
        // Navigation
        nav: {
            home: "Главная",
            tv: "ТВ",
            movies: "Фильмы",
            series: "Сериалы",
            cartoons: "Мультфильмы",
            anime: "Аниме",
            live: "Прямой эфир",
            pricing: "Тарифы",
            favorites: "Избранное"
        },
        
        // Search
        search: {
            placeholder: "Поиск фильмов...",
            button: "Поиск"
        },
        
        // Auth
        auth: {
            login: "Вход",
            signup: "Регистрация",
            logout: "Выход",
            loginTitle: "Вход",
            loginSubtitle: "Войдите в свой аккаунт",
            signupTitle: "Регистрация",
            signupSubtitle: "Создайте новый аккаунт",
            email: "Email",
            password: "Пароль",
            name: "Имя",
            confirmPassword: "Подтвердите пароль",
            remember: "Запомнить",
            forgotPassword: "Забыли пароль?",
            noAccount: "Нет аккаунта?",
            haveAccount: "Уже есть аккаунт?",
            namePlaceholder: "Ваше имя",
            emailPlaceholder: "email@example.com",
            passwordPlaceholder: "Введите пароль",
            passwordMinPlaceholder: "Минимум 6 символов",
            confirmPasswordPlaceholder: "Повторите пароль",
            terms: "Я согласен с <a href=\"#\">условиями</a> и <a href=\"#\">политикой конфиденциальности</a>",
            termsLink: "условиями",
            privacyLink: "политикой конфиденциальности"
        },
        
        // User Menu
        userMenu: {
            upgrade: "Перейти на Premium",
            bookmarks: "Сохраненные",
            settings: "Настройки",
            logout: "Выход",
            basicPlan: "Базовый план",
            premiumPlan: "Премиум план"
        },
        
        // Filters
        filters: {
            allGenres: "Все жанры",
            allYears: "Все годы",
            action: "Боевик",
            adventure: "Приключения",
            comedy: "Комедия",
            drama: "Драма",
            animation: "Анимация",
            biography: "Биография",
            fantasy: "Фэнтези",
            horror: "Ужасы",
            scifi: "Научная фантастика",
            war: "Война",
            classic: "Классика"
        },
        
        // Movies
        movies: {
            loadMore: "ЗАГРУЗИТЬ ЕЩЕ",
            noMovies: "Фильмы не найдены",
            noMoviesDesc: "Попробуйте изменить фильтры или поисковые запросы",
            playTrailer: "Смотреть трейлер",
            watchMovie: "Смотреть фильм",
            watchTrailer: "Смотреть трейлер",
            cast: "В ролях",
            rating: "Рейтинг",
            year: "Год",
            releaseYear: "Год выпуска",
            duration: "Длительность",
            studio: "Студия",
            quality: "Качество",
            description: "Описание",
            noDescription: "Описание недоступно",
            showMore: "Показать еще",
            carouselBack: "Назад",
            carouselTitle: "Все фильмы"
        },
        
        // Ratings
        ratings: {
            imdb: "IMDb",
            rottenTomatoes: "Rotten Tomatoes",
            dezo: "Dezo Rating",
            rateMovie: "Оценить фильм",
            yourRating: "Ваша оценка",
            averageRating: "Средняя оценка"
        },
        
        // Studios
        studios: {
            marvel: "Marvel",
            dc: "DC",
            paramountpictures: "Paramount Pictures",
            disney: "Disney",
            netflix: "Netflix",
            "20thcenturyfox": "20th Century Fox",
            warnerbros: "Warner Bros",
            columbiapictures: "Columbia Pictures",
            sony: "Sony",
            universal: "Universal",
            "newlinecinema": "New Line Cinema"
        },
        
        // Trailer
        trailer: {
            title: "Трейлер"
        },
        
        // Categories
        categories: {
            title: "Категории",
            action: "Боевик",
            comedy: "Комедия",
            thriller: "Триллер",
            horror: "Ужасы",
            adventure: "Приключения",
            animation: "Анимация",
            crime: "Криминал",
            scifi: "Научная фантастика"
        },
        
        // Live
        live: {
            title: "Прямые телепередачи",
            live: "В ЭФИРЕ",
            viewers: "зрителей"
        },
        
        // TV Channels
        tv: {
            title: "ТВ Каналы",
            noChannels: "Каналы не найдены",
            watching: "Смотреть",
            live: "В эфире",
            selectChannel: "Выберите канал"
        },
        
        // Series
        series: {
            title: "Сериалы",
            noSeries: "Сериалы не найдены",
            noSeriesDesc: "Сериалы пока недоступны",
            seasons: "Сезоны",
            episodes: "Эпизоды",
            watchEpisode: "Смотреть эпизод"
        },
        
        // Cartoons
        cartoons: {
            title: "Мультфильмы",
            noCartoons: "Мультфильмы не найдены",
            noCartoonsDesc: "Мультфильмы пока недоступны"
        },
        
        // Anime
        anime: {
            title: "Аниме",
            noAnime: "Аниме не найдено",
            noAnimeDesc: "Аниме пока недоступно"
        },
        
        // Pricing
        pricing: {
            title: "Тарифы",
            subtitle: "Выберите подходящий тариф",
            basic: "Базовый",
            premium: "Премиум",
            monthly: "в месяц",
            yearly: "в год",
            features: "Возможности",
            unlimited: "Неограниченные фильмы и сериалы",
            hdQuality: "HD и 4K качество",
            noAds: "Без рекламы",
            multipleDevices: "Несколько устройств",
            download: "Скачивание",
            selectPlan: "Выбрать тариф",
            currentPlan: "Текущий тариф"
        },
        
        // Favorites
        favorites: {
            title: "Избранное",
            empty: "Избранное пусто",
            emptyDesc: "Вы еще ничего не добавили в избранное",
            movies: "Фильмы",
            series: "Сериалы",
            tvChannels: "ТВ Каналы",
            remove: "Удалить",
            added: "Добавлено в избранное",
            removed: "Удалено из избранного"
        },
        
        // Footer
        footer: {
            slogan: "Фильмы и телепередачи, онлайн кинотеатр, база данных фильмов HTML шаблон",
            about: "О нас",
            profile: "Мой профиль",
            pricing: "Тарифы",
            contacts: "Контакты",
            browse: "Обзор",
            liveTV: "Прямое ТВ",
            liveNews: "Прямые новости",
            liveSports: "Прямой спорт",
            streaming: "Библиотека потоков",
            tvShows: "Телепередачи",
            movies: "Фильмы",
            kids: "Дети",
            collections: "Коллекции",
            help: "Помощь",
            support: "Служба поддержки",
            terms: "Тарифы и безопасность",
            aboutService: "О сервисе",
            access: "Доступ",
            copyright: "© Авторские права 2025 Dezo Max",
            privacy: "Политика конфиденциальности",
            termsConditions: "Условия использования"
        },
        
        // Language Settings
        language: {
            title: "Языковые настройки",
            subtitle: "Выберите язык веб-сайта",
            select: "Выберите язык",
            current: "Текущий язык",
            save: "Сохранить",
            cancel: "Отмена"
        },
        
        // Notifications
        notifications: {
            loginRequired: "Войдите, чтобы сохранить",
            bookmarkAdded: "Добавлено в сохраненные",
            bookmarkRemoved: "Удалено из сохраненных",
            loginSuccess: "Успешный вход!",
            signupSuccess: "Успешная регистрация!",
            logoutSuccess: "Успешный выход",
            premiumUpgrade: "Успешно перешли на Premium план!",
            watchLogin: "Войдите, чтобы смотреть фильмы",
            premiumRequired: "Этот фильм доступен в Premium режиме. Перейдите на Premium!",
            languageChanged: "Язык успешно изменен"
        },
        
        // Errors
        errors: {
            emailExists: "Этот email уже зарегистрирован",
            invalidEmail: "Неверный формат email",
            shortPassword: "Пароль должен содержать минимум 6 символов",
            wrongCredentials: "Неверный email или пароль",
            passwordMismatch: "Пароли не совпадают"
        }
    },
    
    en: {
        // Navigation
        nav: {
            home: "Home",
            tv: "TV",
            movies: "Movies",
            series: "Series",
            cartoons: "Cartoons",
            anime: "Anime",
            live: "Live Stream",
            pricing: "Pricing",
            favorites: "Favorites"
        },
        
        // Search
        search: {
            placeholder: "Search movies...",
            button: "Search"
        },
        
        // Auth
        auth: {
            login: "Login",
            signup: "Sign Up",
            logout: "Logout",
            loginTitle: "Login",
            loginSubtitle: "Sign in to your account",
            signupTitle: "Sign Up",
            signupSubtitle: "Create a new account",
            email: "Email",
            password: "Password",
            name: "Name",
            confirmPassword: "Confirm Password",
            remember: "Remember me",
            forgotPassword: "Forgot password?",
            noAccount: "Don't have an account?",
            haveAccount: "Already have an account?",
            namePlaceholder: "Your name",
            emailPlaceholder: "email@example.com",
            passwordPlaceholder: "Enter your password",
            passwordMinPlaceholder: "Minimum 6 characters",
            confirmPasswordPlaceholder: "Re-enter password",
            terms: "I agree to the <a href=\"#\">terms</a> and <a href=\"#\">privacy policy</a>",
            termsLink: "terms",
            privacyLink: "privacy policy"
        },
        
        // User Menu
        userMenu: {
            upgrade: "Upgrade to Premium",
            bookmarks: "Bookmarks",
            settings: "Settings",
            logout: "Logout",
            basicPlan: "Basic Plan",
            premiumPlan: "Premium Plan"
        },
        
        // Filters
        filters: {
            allGenres: "All Genres",
            allYears: "All Years",
            action: "Action",
            adventure: "Adventure",
            comedy: "Comedy",
            drama: "Drama",
            animation: "Animation",
            biography: "Biography",
            fantasy: "Fantasy",
            horror: "Horror",
            scifi: "Sci-fi",
            war: "War",
            classic: "Classic"
        },
        
        // Movies
        movies: {
            loadMore: "LOAD MORE",
            noMovies: "No movies found",
            noMoviesDesc: "Try adjusting your filters or search terms",
            playTrailer: "Play Trailer",
            watchMovie: "Watch Movie",
            watchTrailer: "Watch Trailer",
            cast: "Cast",
            rating: "Rating",
            year: "Year",
            releaseYear: "Release Year",
            duration: "Duration",
            studio: "Studio",
            quality: "Quality",
            description: "Description",
            noDescription: "No description available",
            showMore: "Show more",
            carouselBack: "Back",
            carouselTitle: "All movies"
        },
        
        // Ratings
        ratings: {
            imdb: "IMDb",
            rottenTomatoes: "Rotten Tomatoes",
            dezo: "Dezo Rating",
            rateMovie: "Rate Movie",
            yourRating: "Your Rating",
            averageRating: "Average Rating"
        },
        
        // Studios
        studios: {
            marvel: "Marvel",
            dc: "DC",
            paramountpictures: "Paramount Pictures",
            disney: "Disney",
            netflix: "Netflix",
            "20thcenturyfox": "20th Century Fox",
            warnerbros: "Warner Bros",
            columbiapictures: "Columbia Pictures",
            sony: "Sony",
            universal: "Universal",
            "newlinecinema": "New Line Cinema"
        },
        
        // Trailer
        trailer: {
            title: "Trailer"
        },
        
        // Categories
        categories: {
            title: "Category",
            action: "Action",
            comedy: "Comedy",
            thriller: "Thriller",
            horror: "Horror",
            adventure: "Adventure",
            animation: "Animation",
            crime: "Crime",
            scifi: "Sci-fi"
        },
        
        // Live
        live: {
            title: "Live TV Shows",
            live: "LIVE",
            viewers: "viewers"
        },
        
        // Footer
        footer: {
            slogan: "Movies & TV Shows, Online Cinema, Movie Database HTML Template",
            about: "About us",
            profile: "My profile",
            pricing: "Pricing plans",
            contacts: "Contacts",
            browse: "Browse",
            liveTV: "Live TV",
            liveNews: "Live News",
            liveSports: "Live Sports",
            streaming: "Streaming Library",
            tvShows: "TV Shows",
            movies: "Movies",
            kids: "Kids",
            collections: "Collections",
            help: "Help",
            support: "Support service",
            terms: "Terms and Security",
            aboutService: "About this service",
            access: "Access",
            copyright: "© Copyright 2025 Dezo Max",
            privacy: "Privacy policy",
            termsConditions: "Terms and conditions"
        },
        
        // Language Settings
        language: {
            title: "Language Settings",
            subtitle: "Select website language",
            select: "Select Language",
            current: "Current Language",
            save: "Save",
            cancel: "Cancel"
        },
        
        // Notifications
        notifications: {
            loginRequired: "Please login to save",
            bookmarkAdded: "Added to bookmarks",
            bookmarkRemoved: "Removed from bookmarks",
            loginSuccess: "Successfully logged in!",
            signupSuccess: "Successfully registered!",
            logoutSuccess: "Successfully logged out",
            premiumUpgrade: "Successfully upgraded to Premium plan!",
            watchLogin: "Please login to watch movies",
            premiumRequired: "This movie is available in Premium mode. Upgrade to Premium!",
            languageChanged: "Language successfully changed"
        },
        
        // Errors
        errors: {
            emailExists: "This email is already registered",
            invalidEmail: "Invalid email format",
            shortPassword: "Password must be at least 6 characters",
            wrongCredentials: "Wrong email or password",
            passwordMismatch: "Passwords do not match"
        }
    }
};

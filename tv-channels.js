// TV Channels Data
const tvChannels = [
    {
        id: 1,
        name: {
            uz: "O'zbekiston",
            ru: "Узбекистан",
            en: "Uzbekistan"
        },
        logo: "https://via.placeholder.com/200x200/2196F3/FFFFFF?text=UZ",
        streamUrl: "https://example.com/stream/uzbekistan",
        category: "news",
        isLive: true
    },
    {
        id: 2,
        name: {
            uz: "Yoshlar",
            ru: "Молодёжный",
            en: "Youth"
        },
        logo: "https://via.placeholder.com/200x200/E91E63/FFFFFF?text=YO",
        streamUrl: "https://example.com/stream/youth",
        category: "entertainment",
        isLive: true
    },
    {
        id: 3,
        name: {
            uz: "Sport",
            ru: "Спорт",
            en: "Sport"
        },
        logo: "https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=SP",
        streamUrl: "https://example.com/stream/sport",
        category: "sports",
        isLive: true
    },
    {
        id: 4,
        name: {
            uz: "Kinoteatr",
            ru: "Кинотеатр",
            en: "Cinema"
        },
        logo: "https://via.placeholder.com/200x200/FF9800/FFFFFF?text=KI",
        streamUrl: "https://example.com/stream/cinema",
        category: "movies",
        isLive: true
    },
    {
        id: 5,
        name: {
            uz: "Bolajon",
            ru: "Детский",
            en: "Kids"
        },
        logo: "https://via.placeholder.com/200x200/9C27B0/FFFFFF?text=BO",
        streamUrl: "https://example.com/stream/kids",
        category: "kids",
        isLive: true
    },
    {
        id: 6,
        name: {
            uz: "Madaniyat va Ma'rifat",
            ru: "Культура и Просвещение",
            en: "Culture & Education"
        },
        logo: "https://via.placeholder.com/200x200/00BCD4/FFFFFF?text=MA",
        streamUrl: "https://example.com/stream/culture",
        category: "education",
        isLive: true
    },
    {
        id: 7,
        name: {
            uz: "Dunyo",
            ru: "Мир",
            en: "World"
        },
        logo: "https://via.placeholder.com/200x200/795548/FFFFFF?text=DU",
        streamUrl: "https://example.com/stream/world",
        category: "news",
        isLive: true
    },
    {
        id: 8,
        name: {
            uz: "Mahalla",
            ru: "Махалля",
            en: "Mahalla"
        },
        logo: "https://via.placeholder.com/200x200/607D8B/FFFFFF?text=MA",
        streamUrl: "https://example.com/stream/mahalla",
        category: "entertainment",
        isLive: true
    },
    {
        id: 9,
        name: {
            uz: "National Geographic",
            ru: "National Geographic",
            en: "National Geographic"
        },
        logo: "https://via.placeholder.com/200x200/FF5722/FFFFFF?text=NG",
        streamUrl: "https://example.com/stream/natgeo",
        category: "documentary",
        isLive: true
    },
    {
        id: 10,
        name: {
            uz: "Discovery",
            ru: "Discovery",
            en: "Discovery"
        },
        logo: "https://via.placeholder.com/200x200/3F51B5/FFFFFF?text=DC",
        streamUrl: "https://example.com/stream/discovery",
        category: "documentary",
        isLive: true
    },
    {
        id: 11,
        name: {
            uz: "CNN",
            ru: "CNN",
            en: "CNN"
        },
        logo: "https://via.placeholder.com/200x200/F44336/FFFFFF?text=CN",
        streamUrl: "https://example.com/stream/cnn",
        category: "news",
        isLive: true
    },
    {
        id: 12,
        name: {
            uz: "BBC",
            ru: "BBC",
            en: "BBC"
        },
        logo: "https://via.placeholder.com/200x200/000000/FFFFFF?text=BB",
        streamUrl: "https://example.com/stream/bbc",
        category: "news",
        isLive: true
    }
];

// Get channel name in current language
function getChannelName(channel) {
    if (!channel || !channel.name) return 'Unknown';
    const lang = i18n ? i18n.getCurrentLanguage() : 'uz';
    return channel.name[lang] || channel.name.uz || channel.name.en || 'Unknown';
}

// English Version Text

export const homePageConfig = (lang) => {
  if (lang === "te")
    return [
      {
        icon: "💧",
        title: "కొత్త ఆర్డర్",
        desc: "కొత్త ఆర్డర్‌లను నమోదు చేయండి",
        navLink: "/",
      },
      {
        icon: "🔁",
        title: "తిరిగి ఇచ్చిన క్యాన్లు",
        desc: "తిరిగి ఇచ్చిన క్యాన్లు నమోదు చేయండి",
        navLink: "/returncan/id",
      },
      {
        icon: "📊",
        title: "మొత్తం రిపోర్ట్",
        desc: "ఆర్డర్లు  మరియు మొత్తం డబ్బులు ",
        navLink: "/report/id",
      },
      {
        icon: "📋",
        title: "తిరిగి ఇవ్వని క్యాన్లు",
        desc: "తిరిగి క్యాన్లు ఇవ్వని వారు",
        navLink: "/pending",
      },
      {
        icon: "⏰",
        title: "డిలీట్ చేసిన డేటా",
        desc: "డిలీట్ చేసిన వారి డేటాను",
        navLink: "/returncan/id",
      },
    ]
  else if (lang === "en")
    return [
      {
        icon: "🧮",
        title: "Active Items",
        desc: "Check Active Items",
        navLink: "/active-items",
      },
      {
        icon: "💧",
        title: "New Order",
        desc: "Place new water orders",
        navLink: "/order",
      },
      {
        icon: "🔁",
        title: "Return Can",
        desc: "Request return for empty cans",
        navLink: "/returncan/id",
      },
      {
        icon: "📊",
        title: "Reports",
        desc: "View order and financial reports",
        navLink: "/report/id",
      },
      {
        icon: "📋",
        title: "Pending Orders",
        desc: "Track pending deliveries",
        navLink: "/pending",
      },
    ]
};

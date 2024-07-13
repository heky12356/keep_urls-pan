const originalTitle = "LinkVault";
        const awayTitle = "(っ °Д °;)っ(´･ω･`)?";

        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === "hidden") {
                document.title = awayTitle;
            } else {
                document.title = originalTitle;
            }
        });
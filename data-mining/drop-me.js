function isArrayContains(e, t) {
    return e.indexOf(t) > -1
}

function addToArray(e, t) {
    isArrayContains(e, t) || e.push(t)
}

function removeFromArray(e, t) {
    isArrayContains(e, t) && e.splice(e.indexOf(t, 0), 1)
}

function setCacheFromOther(e, t) {
    e.cacheCanvas = t.cacheCanvas, e.cacheID = t.cacheID, e._cacheWidth = t._cacheWidth, e._cacheHeight = t._cacheHeight, e._cacheOffsetX = t._cacheOffsetX, e._cacheOffsetY = t._cacheOffsetY, e._cacheScale = t._cacheScale
}

function deleteCache(e) {
    e.cacheCanvas = null, e.cacheID = 0
}

function trace(e) {
    isLevelEditor && console.log(e)
}

function onHoverScale(e) {
    e.scaleX = e.scaleY = 1.2 * spriteScale * (e.defaultScale ? e.defaultScale : 1)
}

function onOutScale(e) {
    e.scaleX = e.scaleY = spriteScale * (e.defaultScale ? e.defaultScale : 1)
}

function removeFromParent(e) {
    e && e.parent && e.parent.removeChild(e)
}

function addToParent(e, t) {
    removeFromParent(e), t && t.addChild(e)
}

function setSpriteScale(e, t) {
    e.scaleX = e.scaleY = t
}

function setSpritePosAndAngle(e, t, i, n) {
    e.x = t, e.y = i, n && (e.rotation = n)
}

function setTextAndCenter(e, t, i, n) {
    if (n.text != i) {
        n.text = i;
        var s = n.getBounds();
        n.x = e - (s.width >> 1) * n.scaleX, t && (n.y = t - (s.height >> 1) * n.scaleY)
    }
}

function setAnimationSpeed(e, t) {
    e._animation.speed = t
}

function setNextAnimation(e, t) {
    e._animation.next = t
}

function randomizeAnimFrame(e) {
    e.currentAnimationFrame = Math.floor(30 * Math.random())
}

function addToParentWithIndex(e, t, i) {
    removeFromParent(e), t && t.addChildAt(e, i)
}

function showTopLogo(e) {
    showSponsorLogo(160, 25, e, container, 1, LOGO_HORIZ_ANY_POS, LOGO_TOP_POS, 2)
}

function doNothing() {}

function likeClick() {
    window.open(FACEBOOK_LIKE_URL, "_blank")
}

function shareClick() {
    isOnFacebookAppSite() ? postFacebookShare() : postTwitterShare()
}

function isOnFacebookAppSite() {
    return document.URL.toLowerCase().indexOf(FACEBOOK_APP_SITE_NAME) > -1
}

function postTwitterShare() {
    var e = TWITTER_SHARE_URL.replace("[SCORE]", getOverallScore());
    trace(e), window.open(e, "_blank")
}

function postFacebookShare() {
    isFacebookReady && FB.ui({
        method: "feed",
        name: "Captain Finch",
        link: GAME_PAGE_URL,
        caption: "I scored " + getOverallScore() + " points in the Captain Finch game!",
        description: "Try this awesome game on A10.com!"
    }, function(e) {
        trace(e && e.post_id ? "Post was published." : "Post was not published.")
    })
}

function getOverallScore() {
    var e, t = 0;
    for (e = 0; LEVELS_NUM > e; e++) {
        var i = levelstates[e],
            n = 0;
        i == ONE_STAR ? n += 1 : i == TWO_STAR ? n += 3 : i == THREE_STAR && (n += 6), n *= e + 1, t += n
    }
    for (e = 0; ACHIEVS_NUM > e; e++) allachievs[e] == ACHIEVED && (t += 5);
    return t
}

function createReverseAnim(e, t) {
    var i = REVERSE_PREFIX + t;
    if (!e.getAnimation(i)) {
        for (var n = e.getAnimation(t), s = {
                name: i,
                next: n.next,
                speed: n.speed,
                frames: []
            }, a = n.frames.length - 1; a >= 0; a--) s.frames.push(n.frames[a]);
        e._animations.push(i), e._data[i] = s
    }
}

function playReverseAnim(e, t) {
    e.gotoAndPlay(REVERSE_PREFIX + t)
}

function handleVisibilityChange() {
    document.webkitHidden ? (console.log("hidden"), onVisibilityChangeSoundMuted = isMute, isMute = !0, createjs.Sound.setMute(!0), stopBgMusic(), stopWindSound()) : (console.log("visible"), isMute = onVisibilityChangeSoundMuted, createjs.Sound.setMute(!1), isMute || playBgMusic())
}

function initVisibilityChanger() {
    function e(e) {
        var i = "visible",
            n = "hidden",
            s = {
                focus: i,
                focusin: i,
                pageshow: i,
                blur: n,
                focusout: n,
                pagehide: n
            };
        e = e || window.event, visibilityState = e.type in s ? s[e.type] : this[t] ? "hidden" : "visible", visibilityState == n ? isWasTouch && (onVisibilityChangeSoundMuted = isMute, isMute = !0, createjs.Sound.setMute(!0), stopBgMusic(), stopWindSound()) : isWasTouch && (isMute = onVisibilityChangeSoundMuted, createjs.Sound.setMute(!1), isMute || playBgMusic())
    }
    var t = "hidden";
    t in document ? document.addEventListener("visibilitychange", e) : (t = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", e) : (t = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", e) : (t = "msHidden") in document ? document.addEventListener("msvisibilitychange", e) : "onfocusin" in document ? document.onfocusin = document.onfocusout = e : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = e
}

function createBG() {
    allBgContainer = new createjs.Container, createBgFromFile("bg_menu1"), createBgFromFile("bg_menu2"), createBgFromFile("bg_menu3"), createBgFromFile("bg_menu4"), createBgFromFile("bg_menu5"), allBgContainer.mouseEnabled = !1, allBgContainer.mouseChildren = !1, container.addChild(allBgContainer)
}

function createBgFromFile(e) {
    var t;
    if (files[e + ""]) {
        var i = files[e];
        t = new createjs.Bitmap(i), isLowGfx && setSpriteScale(t, spriteScale)
    }
    allBgs.push(t)
}

function createBitmapFromFile(e, t, i, n, s) {
    var a = new createjs.Bitmap(files[e]);
    return a.x = t, a.y = i, setSpriteScale(a, n), addToParent(a, s), a
}

function removeAllBgs() {
    allBgContainer.removeAllChildren()
}

function setBg(e, t) {
    removeAllBgs();
    var i = allBgs[e < allBgs.length ? e : 0];
    setSpriteScale(i, t ? t : 1), allBgContainer.addChild(i)
}

function addAutoAlignToObj(e) {
    allAutoAligned.push(e)
}

function updateAutoAlign() {
    for (var e, t = allAutoAligned.length - 1; t >= 0; t--) e = allAutoAligned[t], updateObjectPos(e)
}

function updateObjectPos(e) {
    if (e && isArrayContains(allAutoAligned, e)) {
        e.x = e.defaultParams.x, e.y = e.defaultParams.y;
        var t = e.defaultParams.alignDevisor,
            i = e.defaultParams.vertAlign,
            n = e.defaultParams.horizAlign;
        n === LOGO_LEFT_POS ? e.x += deltaForHLeft() / t : n === LOGO_RIGHT_POS && (e.x -= deltaForHLeft() / t), i === LOGO_TOP_POS ? e.y += deltaForVTop() / t : i === LOGO_BOTTOM_POS && (e.y -= deltaForVTop() / t)
    }
}

function hideIfNoMoreGames(e) {
    isNeedMoreGames || (e.visible = !1)
}

function createSponsorLogo() {
    sponsorLogo = new createjs.Container
}

function showSponsorLogo(e, t, i, n, s, a, r, o, l) {
    sponsorLogo || createSponsorLogo(), isSponsorLogoError || (null !== l && void 0 !== l && l > -1 ? addToParentWithIndex(sponsorLogo, n, l) : addToParent(sponsorLogo, n), currentLogoHorizPos = a, currentLogoVertPos = r, sponsorLogo.alpha = s ? s : 1, logoPosDivisor = o, currentLogoParams.x = e, currentLogoParams.y = t, currentLogoParams.scale = i, updateLogoSize(), updateLogoPos())
}

function updateLogoSize() {
    var e = .41 * currentLogoParams.scale,
        t = sponsorLogoDefWidth * e,
        i = sponsorLogoDefHeight * e;
    logoDefaultY = currentLogoParams.y, logoDefaultX = currentLogoParams.x, sponsorLogoBitmap.x = -Math.floor(t / 2), sponsorLogoBitmap.y = -Math.floor(i / 2), sponsorLogoBitmap && (sponsorLogoBitmap.scaleX = sponsorLogoBitmap.scaleY = e, sponsorLogoBitmap.setBoundingBox(0, 0, t, i))
}

function updateLogoPos() {
    sponsorLogo && (sponsorLogo.x = logoDefaultX, sponsorLogo.y = logoDefaultY, currentLogoHorizPos === LOGO_LEFT_POS ? sponsorLogo.x += deltaForHLeft() : currentLogoHorizPos === LOGO_RIGHT_POS && (sponsorLogo.x -= deltaForHLeft()), currentLogoVertPos === LOGO_TOP_POS ? sponsorLogo.y += deltaForVTop() / logoPosDivisor : currentLogoVertPos === LOGO_BOTTOM_POS && (sponsorLogo.y -= deltaForVTop() / logoPosDivisor))
}

function startSponsorAds() {}

function onAdBeginPause() {
    trace("ad pause, , sound is muted: " + isMute), isAdPauseSoundMuted = isMute, isMute = !0, stopBgMusic()
}

function onAdEndUnpause() {
    trace("ad unpause, sound was muted: " + isAdPauseSoundMuted), isMute = isAdPauseSoundMuted, isMute || playBgMusic()
}

function loadSponsorLogo() {
    createSponsorLogo();
    try {
        if (isNeedLogo) {
            var e = window.famobi.getMoreGamesButtonImage();
            isFGLVersion && (e = fgl.getBrandingLogo()), sponsorPreload = new createjs.LoadQueue(!1, "", !0), sponsorPreload.addEventListener("complete", handleSponsorLogoComplete), sponsorPreload.addEventListener("fileload", handleFileLoad), sponsorPreload.addEventListener("error", handleFileLoadError);
            var t = [],
                i = "" + e;
            t.push({
                src: i,
                id: "sponsorLogoImg",
                type: createjs.LoadQueue.IMAGE
            }), sponsorPreload.loadManifest(t)
        } else isSponsorLogoError = !0, isAllFilesLoaded && startGame()
    } catch (n) {
        trace("load branding exception!"), isSponsorLogoError = !0, isAllFilesLoaded && startGame()
    }
}

function handleFileLoadError() {
    trace("Logo loading error!"), isSponsorLogoError = !0, isAllFilesLoaded && startGame()
}

function handleSponsorLogoComplete() {
    if (!isSponsorLogoError && isNeedLogo) {
        try {
            sponsorLogo || createSponsorLogo(), trace("logo loaded!");
            var e = files.sponsorLogoImg,
                t = sponsorLogoDefWidth = 600,
                i = sponsorLogoDefHeight = 253,
                n = 1,
                s = sponsorLogoBitmap = new createjs.Bitmap(e).set({
                    scaleX: n,
                    scaleY: n,
                    regX: 0,
                    regY: 0,
                    cursor: "pointer",
                    x: 0,
                    y: 0
                });
            if (s.isOnlyBoundsCheck = !0, s.setBoundingBox(0, 0, t * n, i * n), isLogoLinked) {
                var a = sponsorClick;
                isFGLVersion && (a = fgl.handleBrandingClick), s.addEventListener("mousedown", a)
            } else s.mouseEnabled = !1;
            sponsorLogo.addChild(s), loaderBar && showSponsorLogo(ow / 2, 300, 1, preloaderSponsorCont, 1, LOGO_HORIZ_ANY_POS), isLogoReady = !0
        } catch (r) {
            isSponsorLogoError = !0, trace("logo error!2")
        }
        isAllFilesLoaded && startGame()
    }
}

function moreButtonsHandler(e) {
    isFGLVersion ? fgl.showMoreGames() : sponsorClick(e)
}

function sponsorClick() {
    famobi.moreGamesLink()
}

function initParticleManager() {
    container.addChild(particleContainer)
}

function createPartExplode(e, t, i, n, s, a) {
    for (var r, o = 0; i > o; o++) {
        var l = 2 * Math.PI / i,
            h = o * l;
        if (partSin = Math.cos(h), partCos = Math.sin(h), r = createPart(n, e, t, 1, s ? s : particleContainer), !r) return;
        setParticleParamsByIndex(r, a ? a : 0)
    }
}

function setParticleParamsByIndex(e, t) {
    var i = 1.3;
    e.gravity = 0, e.speedA = 20 * Math.random(), 0 === t ? (e.maxScale = .7, e.beforeHideTimer = .2 * FPS, partScale = .2 + .2 * Math.random()) : 1 === t ? (i = 4, e.maxScale = 1.3, e.beforeHideTimer = .3 * FPS, e.gravity = 0, e.speedAlpha = .05, e.speedA = 20 * Math.random(), partScale = .4 + .6 * Math.random()) : 2 === t ? (i = 2, e.maxScale = 1.3, e.vis.alpha = 1, e.beforeHideTimer = .3 * FPS, e.speedA = 20 * Math.random(), partScale = .4 + .6 * Math.random()) : 3 === t && (i = 1.3, e.gravity = 0, e.speedA = 20 * Math.random(), e.maxScale = .7, e.beforeHideTimer = .1 * FPS, e.gravity = 0, e.speedAlpha = .05, partScale = .6, e.vis.alpha = 1), e.vis.scaleX = e.vis.scaleY = partScale, e.speedX = (i + Math.random() * i) * partCos, e.speedY = (i + Math.random() * i) * partSin
}

function createDiePart(e, t) {
    var i = createPart(PART_NUM_TYPE, e, t, 1, particleContainer);
    i && (i.setNum(11), i.setFrame("bombexplosionv", !0), i.speedAlpha = .05, i.beforeHideTimer = .01 * FPS, i.speedX = 0, i.speedY = 0, i.speedA = 0)
}

function createBubblePopPart(e, t, i) {
    var n = createPart(PART_NUM_TYPE, e, t, 1.2 * i.vis.scaleX, particleContainer);
    n && (n.setNum(11), n.setFrame("bubbleblow", !0), n.isPrerendered = !0, n.speedAlpha = .05, n.beforeHideTimer = .19 * FPS, n.speedX = 0, n.speedY = 0, n.speedA = 0)
}

function createGoodPlayExplode(e, t) {
    for (var i, n = 8, s = 0 == t ? 90 : -120, a = 0; n > a; a++) {
        var r = Math.PI / 2 / n,
            o = a * r - Math.PI / 4;
        t > 0 && (o += Math.PI);
        var l = Math.cos(o),
            h = Math.sin(o),
            c = .2 + .2 * Math.random();
        if (i = createPart(PART_STAR_TYPE, s, 0, c, monsterCont), !i) return;
        i.setFrame("particle1v"), i.speedAlpha = .1, i.speedScale = .02, i.vis.visible = !1, i.beforeHideTimer = .5 * FPS, i.maxScale = .6;
        var u = 1.5;
        i.speedX = (u + Math.random() * u) * l, i.speedY = (u + Math.random() * u) * h, i.speedA = 20 * Math.random()
    }
}

function createNumPart(e, t, i) {
    var n = .8,
        s = createPart(PART_NUM_TYPE, e, t, n, particleContainer);
    s && (s.setNum(i), s.beforeHideTimer = .2 * FPS, s.speedX = 0, s.speedY = -.8, s.speedA = 0)
}

function createPrerenderedPart(e, t, i, n, s, a, r, o) {
    var l = createPart(PART_NUM_TYPE, e, t, i, particleContainer);
    l && (l.setFrame(n, !0), setNextAnimation(l.vis, ""), r && setAnimationSpeed(l.vis, r), l.isPrerendered = !0, a && (l.moveTarget = a), l.beforeHideTimer = s * GAME_FPS, l.speedX = 0, l.speedY = 0, l.speedA = 0, l.gravity = 0, l.vis.rotation = o ? o : 0)
}

function createGlassRectExplode(e, t, i, n) {
    for (var s, a = 5, r = 0; a > r; r++) {
        var o = n * Math.PI / 180,
            l = Math.cos(o),
            h = Math.sin(o),
            c = (r * (122 / a) - 60) * i;
        if (s = createPart(PART_GLASS_TYPE, e + c * l, t + c * h, 1, particleContainer), !s) return;
        var u = 1.3;
        s.gravity = 0, s.speedA = 20 * Math.random(), s.maxScale = .7, s.beforeHideTimer = .1 * FPS, s.gravity = 0, s.speedAlpha = .05, partScale = .6, s.vis.scaleX = s.vis.scaleY = partScale, s.speedX = u - Math.random() * u * 2, s.speedY = u - Math.random() * u * 2
    }
}

function createAwesomePart() {
    var e = topVisionLine + viewportH / 2,
        t = createPart(PART_NUM_TYPE, 160, e, 1, particleContainer);
    t && (t.setNum(11), t.speedAlpha = 1, t.beforeHideTimer = 1.5 * FPS, t.speedX = 0, t.speedY = 0, t.speedA = 0, t.vis.rotation = -360, t.vis.scaleX = t.vis.scaleY = .1, createjs.Tween.get(t.vis, {
        override: !0
    }).to({
        rotation: 0,
        scaleX: 1,
        scaleY: 1
    }, 600).wait(600).to({
        alpha: 0
    }, 200))
}

function createAchievPart(e) {
    for (var t, i = 210, n = 10, s = 0, a = 0; a < allParts.length; a++) t = allParts[a], t.type === PART_ACHIEV_TYPE && (i = t.vis.y - 50, n += 200, s++);
    t = createPart(PART_ACHIEV_TYPE, -130, i, .8, container), t && (t.setFrame("achievdesc" + e), t.speedAlpha = 1, t.beforeHideTimer = 3.2 * FPS + .2 * s, t.speedX = 0, t.speedY = 0, t.speedA = 0, t.vis.rotation = 0, t.vis.scaleX = t.vis.scaleY = .7, t.vis.alpha = 1, createjs.Tween.get(t.vis, {
        override: !0
    }).wait(n).to({
        x: 5
    }, 600, menuEase).wait(2e3).to({
        x: -130
    }, 400, createjs.Ease.sineIn))
}

function createPart(e, t, i, n, s) {
    var a;
    if (allPartsLenght = allParts.length, allPartsLenght > MAX_PARTICLES_ON_SCREEN) {
        for (var r = 0; allPartsLenght > r; r++)
            if (allParts[r].type === PART_STAR_TYPE) {
                a = allParts[r];
                break
            }
        a || (a = allParts[0]), a.reset(e, s, n)
    } else a = gePartFromPool(e, s, n);
    return a.setPos(t, i), isArrayContains(allParts, a) || allParts.push(a), a
}

function addToDisposedParts(e) {
    isArrayContains(disposedParts, e) || disposedParts.push(e)
}

function gePartFromPool(e, t, i) {
    if (disposedParts.length > 0) {
        var n = disposedParts.pop();
        return n.reset(e, t, i), n
    }
    return new ParticleBase(e, t, i)
}

function updatePartManager() {
    partLength = allParts.length;
    for (var e = 0; partLength > e; e++) currPart = allParts[e], currPart.tick(), currPart.isNeedDispose && disposeNeededParts.push(currPart);
    for (; disposeNeededParts.length > 0;) disposeNeededParts.pop().dispose()
}

function initPhysics(e) {
    isLevelEditor && isEditorDebug && (isPhysicsDebugDraw = !0), isPhysicsDebugDraw && !e && (debugCanvas = document.createElement("canvas"), debugCanvas.id = "debugCanvas", debugCanvas.width = minW, debugCanvas.height = minH, debugCanvas.style.position = "absolute", debugCanvas.style.left = "50%", debugCanvas.style.top = "10%", debugCanvas.style.zIndex = "2", debugCanvas.style.pointerEvents = "none", document.body.appendChild(debugCanvas), ChipMunkDebugDrawer.prototype.canvas = debugCanvas, ChipMunkDebugDrawer.prototype.ctx = debugCanvas.getContext("2d"), onWindowResize(null)), debugDraw = new ChipMunkDebugDrawer, space = debugDraw.space, space.iterations = 10, space.gravity = v(0, WORLD_GRAVITY), space.sleepTimeThreshold = 3, space.collisionSlop = 1, space.damping = .7, space.addCollisionHandler(20, 20, onHeroesContactBegin, null, null, null), space.addCollisionHandler(20, 0, onHeroAndStaticContactBegin, null, null, null)
}

function onHeroAndStaticContactBegin(e) {
    if (objA = e.body_a.userdata, objB = e.body_b.userdata, collidedHero = collidedOther = null, objA && objB && (objA.isHero ? (collidedHero = objA, collidedOther = objB) : objB.isGlass && (collidedHero = objB, collidedOther = objA), collidedHero)) {
        if (collidedBody = collidedOther.physBody, collidedBody && collidedOther.physBody.isStatic() && (collidedBody = collidedHero.physBody), !collidedBody) return !0;
        var t = collidedBody.vx,
            i = collidedBody.vy,
            n = Math.sqrt(t * t + i * i);
        n > GLASS_BREAK_VELOCITY && (trace(n), playSound("bounceSound"))
    }
    return !0
}

function onHeroesContactBegin(e) {
    return objA = e.body_a.userdata, objB = e.body_b.userdata, collidedChar = collidedOther = null, objA && objB && (objA.isLoadedToTube || objA.activateGravity(), objB.isLoadedToTube || objB.activateGravity()), !0
}

function createCircleShape(e, t, i, n, s, a) {
    var r = !1,
        o = .5,
        l = .6,
        h = 1;
    n === BALL_TYPE || n === HERO_DOC_TYPE ? l = .8 : n === FAN_TYPE ? (r = !0, o = .8, l = 0) : n === DANGER_KUST_TYPE ? (r = !0, o = .8, l = 0) : n === STATIC_CIRCLE_TYPE ? (r = !0, o = .5, l = .9) : n === HERO_1_TYPE || n === HERO_2_TYPE || n === HERO_3_TYPE || n === BOMB_TYPE && (l = .4);
    var c;
    r ? (c = new cp.Body(1 / 0, 1 / 0), c.nodeIdleTime = 1 / 0) : c = space.addBody(new cp.Body(h, cp.momentForCircle(h, 0, i, v(0, 0)))), c.setPos(v(e, t)), c.setAngle(s);
    var u = space.addShape(new cp.CircleShape(c, i, v(0, 0)));
    if (u.setElasticity(l), u.setFriction(o), n === FAN_TYPE) {
        var d;
        d = space.addShape(a.isReversed ? new cp.BoxShape2(c, new cp.BB(-a.activDistance, -15, 0, 15)) : new cp.BoxShape2(c, new cp.BB(0, -15, a.activDistance, 15))), d.setSensor(!0), d.setCollisionType(1)
    } else n === DANGER_KUST_TYPE ? u.setCollisionType(5) : n === DYNAMIC_CIRCLE_TYPE ? u.setCollisionType(10) : (n === HERO_1_TYPE || n === HERO_2_TYPE || n === HERO_3_TYPE || n === BAD_1_TYPE || n === BAD_2_TYPE) && (c.additGrav = -WORLD_GRAVITY, u.setCollisionType(20));
    return c
}

function createRectPhysics(e, t, i, n, s, a) {
    var r = DEFAULT_RECT_SIZE,
        o = DEFAULT_RECT_SIZE,
        l = !1,
        h = .6,
        c = 0,
        u = .5,
        d = .001;
    s === PHYSICS_RECT_TYPE ? l = !0 : s === DYNAMIC_BOX_TYPE ? (r = DEFAULT_BOX_SIZE, o = DEFAULT_BOX_SIZE, h = .8) : s === HARD_BOX_TYPE ? (r = 30 / PHYS_SCALE, o = 30 / PHYS_SCALE, h = .8) : s === STATIC_BOX_TYPE ? (r = 70 / PHYS_SCALE, o = 57 / PHYS_SCALE, h = .8, l = !0) : s === DANGER_TYPE ? (r = 100 / PHYS_SCALE, o = 18 / PHYS_SCALE) : s === PHYSICS_MAN_BLOCK_TYPE ? (r = 194 / PHYS_SCALE, o = 23 / PHYS_SCALE) : s === GLASS_BLOCK_TYPE ? (r = 103 / PHYS_SCALE, o = 20 / PHYS_SCALE, c = 2) : s === GLASS_BOX_TYPE ? (r = 30 / PHYS_SCALE, o = 30 / PHYS_SCALE, c = 2) : s === DOOR_TYPE ? (r = 122 / PHYS_SCALE, o = 18 / PHYS_SCALE) : s === DYNAMIC_RECT_TYPE ? (r = 109 / PHYS_SCALE, o = 20 / PHYS_SCALE, h = .8) : s === HARD_RECT_TYPE ? (r = 109 / PHYS_SCALE, o = 20 / PHYS_SCALE, h = .8, d = 1 / 1500) : s === STATIC_BALK_1_TYPE ? (r = 216 / PHYS_SCALE, o = 36 / PHYS_SCALE, h = .8, u = 1, l = !0) : s === PUSHER_TYPE ? (r = 50 / PHYS_SCALE, o = 50 / PHYS_SCALE, h = .8, u = .2) : s === ZOMBIE_TYPE ? (r = 50 / PHYS_SCALE, o = 50 / PHYS_SCALE, h = .8, u = .2, d = 3e-4) : (s === STATIC_TUBE_1_TYPE || s === STATIC_TUBE_2_TYPE || s === STATIC_TUBE_3_TYPE) && (l = !0, r = 485 / PHYS_SCALE, o = 169 / PHYS_SCALE, h = .5);
    var p, _ = r * i,
        f = o * n;
    if (l) p = new cp.Body(1 / 0, 1 / 0), p.nodeIdleTime = 1 / 0;
    else {
        var m = _ * f * d;
        p = space.addBody(new cp.Body(m, cp.momentForBox(m, _, f)))
    }
    p.setPos(v(e, t)), p.setAngle(a);
    var T = space.addShape(new cp.BoxShape(p, _, f));
    return T.setCollisionType(c), T.setFriction(h), T.setElasticity(u), p
}

function createConveyorPhysics(e, t, i, n, s, a, r) {
    var o = 190,
        l = 23,
        h = .6,
        c = 0,
        u = .5,
        d = o * i,
        p = l * n,
        _ = new cp.Body(1 / 0, 1 / 0);
    _.nodeIdleTime = 1 / 0, _.setPos(v(e, t)), _.setAngle(a);
    var f = space.addShape(new cp.BoxShape(_, d, p));
    return f.surface_v = cp.v(r.isActivated ? -r.currSpeed * r.dir : 0, 0), f.setCollisionType(c), f.setFriction(h), f.setElasticity(u), _
}

function createKinematicPhysics(e, t, i, n, s, a) {
    var r, o, l, h = .8,
        c = 0,
        u = 0,
        d = 0;
    if (r = new cp.Body(1 / 0, 1 / 0), r.setPos(v(e, t)), r.setAngle(a), s === TELEGA_TYPE) u = 105 / PHYS_SCALE * n, d = 20 / PHYS_SCALE * n, l = 0, o = space.addShape(new cp.BoxShape2(r, new cp.BB(-u / 2, l * n, u / 2, d + l))), o.setFriction(h), o.setElasticity(c), l = 20, o = space.addShape(new cp.BoxShape2(r, new cp.BB(-u / 2, -20 * n, -u / 2 + l, d))), o.setFriction(1), o.setElasticity(0), o = space.addShape(new cp.BoxShape2(r, new cp.BB(u / 2 - l, -20 * n, u / 2, d))), o.setFriction(0), o.setElasticity(0);
    else if (s === AIM_TYPE) {
        u = 130 / PHYS_SCALE * n, d = 15 / PHYS_SCALE * n, l = -43 * n, c = .3, o = space.addShape(new cp.BoxShape2(r, new cp.BB(-u / 2, l, u / 2, d + l))), o.setFriction(h), o.setElasticity(c), l = 5 * n, o = space.addShape(new cp.BoxShape2(r, new cp.BB(-u / 2 - 10 * n, -20 * n, -u / 2 + l, 45 * n))), o.setFriction(h), o.setElasticity(c), o = space.addShape(new cp.BoxShape2(r, new cp.BB(u / 2 - l, -20 * n, u / 2 + 10 * n, 45 * n))), o.setFriction(h), o.setElasticity(c);
        var p = space.addShape(new cp.BoxShape2(r, new cp.BB(-50 * n, -20 * n, 50 * n, 17 * n)));
        p.setSensor(!0), p.setCollisionType(3)
    } else s === MOVABLE_BALK_TYPE && (h = 1, c = 1, u = 216 / PHYS_SCALE * n, d = 35 / PHYS_SCALE * n, o = space.addShape(new cp.BoxShape2(r, new cp.BB(-u / 2, -d / 2, u / 2, d / 2))), o.setFriction(h), o.setElasticity(c));
    return r
}

function createSegmentPhysics(e, t, i, n, s, a) {
    var r, o, l = .8,
        h = .6;
    return r = new cp.Body(1 / 0, 1 / 0), r.nodeIdleTime = 1 / 0, r.setPos(v(e, t)), r.setAngle(a), s === LAND_TYPE && (o = space.addShape(new cp.SegmentShape(r, v(-60 * i, -22 * n), v(60 * i, -22 * n), 5)), o.setFriction(l), o.setElasticity(h)), r
}

function createTrianglePhysics(e, t, i, n, s, a) {
    var r, o = !1,
        l = .6,
        h = 0,
        c = 0,
        u = 51 * i,
        d = 45 * n,
        p = .001,
        _ = [-u / 2, -d / 2, 0, d / 2, u / 2, -d / 2];
    if (o) r = new cp.Body(1 / 0, 1 / 0), r.nodeIdleTime = 1 / 0;
    else {
        var f = u * d * p;
        r = space.addBody(new cp.Body(f, cp.momentForPoly(f, _, cp.vzero)))
    }
    var m = space.addShape(new cp.PolyShape(r, _, cp.vzero));
    return m.setFriction(l), m.setElasticity(h), s === GLASS_TRIANGLE_TYPE && (c = 2), m.setCollisionType(c), r.setPos(v(e, t)), r.setAngle(a), r
}

function getBodyAtMouse(e, t) {
    querySelectedBody = null, queryV.x = e, queryV.y = t;
    var i = this.space.nearestPointQueryNearest(queryV, 100, cp.ALL_LAYERS, cp.NO_GROUP);
    return i && i.d < 0 && i.shape && i.shape.body && (querySelectedBody = i.shape.body), querySelectedBody
}

function destroyBody(e) {
    var t;
    if (e.isStatic())
        for (; e.shapeList.length > 0;) t = e.shapeList[0], space.removeStaticShape(t);
    else {
        for (; e.shapeList.length > 0;) t = e.shapeList[0], t.space && space.removeShape(t);
        e.space && space.removeBody(e)
    }
}

function awakeAllBodies() {
    for (var e, t = allChars.length - 1; t >= 0; --t) e = allChars[t], e.physBody && e.physBody.activate()
}

function initLevelManager() {
    container.addChild(blockContainer), initPhysics(), strenghtArrow = createButton(0, 0, 1, "strenghtarrow", null, null, null), stage.addEventListener("stagemousedown", onCharContainerMouseDown), stage.addEventListener("stagemousemove", onCharContainerMouseMove), stage.addEventListener("stagemouseup", onCharContainerMouseUp)
}

function createChar(e, t, i, n, s, a, r) {
    var o = geCharFromPool(e, blockContainer, n, s, r);
    return o.setPosition(t, i, a), o.initPhysics(), isArrayContains(allChars, o) || allChars.push(o), o
}

function loadLevel(e) {
    currentLevel != e && (levelRestartsCounter = 0, MORE_EASY_MULT = 1), currentLevel = e, currentLevel >= LEVELS_NUM && (currentLevel %= LEVELS_NUM), setCurrentLevelLabel(currentLevel), setBg(allBgIndexes[currentLevel] - 1), loadLevelByCode(allLevels[currentLevel]), playLevelStartSound(), isGamePaused = !1, isLevelRestarted = !1, isNeedCacheSizeUpdate = !0
}

function loadLevelByCode(e) {
    if (isGamePaused = !0, disposeLevel(), addInstructions(), e) {
        totalEnemies = 0, resetSoundOnNewLevel();
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            isBonus(i[0]) ? createBonus(i[0], i[1], i[2], i[3], i[4], i[5], i[6]) : createChar(i[0], i[1], i[2], i[3], i[4], i[5], i[6])
        }
    }
}

function isBonus(e) {
    return e.indexOf("BONUS") > -1
}

function restartLevel() {
    window.famobi.showAd(function() {
        isLevelRestarted = !0, levelRestartsCounter += 1, levelsWithoutRestartsCounter = 0, loadLevel(currentLevel)
    })
}

function loadNextLevel() {
    loadLevel(currentLevel + 1)
}

function disposeLevel() {
    disposeInstructions(), isLevelFailed = isLevelCompleted = isInflateReason = !1, levelStartTimer = 0, selectedChar = null, scoreToAdd = 0, currentLevelScore = 0, totalBonuses = 0, currentTimeScore = 3e3, collectedBonuses = 0, currentRemovablesNum = 0;
    var e, t = allChars.length;
    for (e = 0; t > e; e++) {
        var i = allChars.pop();
        i.dispose()
    }
    for (toDisposeChars = [], clickedChars = [], disposeBonuses(), allBombs = [], allMonsters = [], allActivators = [], allTeleports = [], allFans = [], allPushers = [], allHeroes = [], allTubes = [], allConveyors = [], allZombies = [], allHeroesLen = 0, allBallsLen = 0, allTubesLen = 0; toDisposePhysicsBodies.length > 0;) {
        var n = toDisposePhysicsBodies.pop();
        destroyBody(n)
    }
    space.step(.01), removeFromParent(strenghtArrow), window.gc && window.gc()
}

function disposeLevelPhysics() {
    var e, t = allChars.length;
    for (e = 0; t > e; e++) {
        var i = allChars[e];
        i.disposePhysBody()
    }
    for (; toDisposePhysicsBodies.length > 0;) {
        var n = toDisposePhysicsBodies.pop();
        destroyBody(n)
    }
}

function addScore(e) {
    currentLevelScore += e
}

function addToDisposed(e) {
    isArrayContains(disposedChars, e) || disposedChars.push(e)
}

function geCharFromPool(e, t, i, n, s) {
    if (disposedChars.length > 0) {
        var a = disposedChars.pop();
        return a.reset(e, t, i, n, s), a
    }
    return new CharBase(e, t, i, n, s)
}

function onCharContainerMouseDown(e) {
    if (splashContainer && splashContainer.parent && moregamesClick(e), !(isGamePaused || isLevelCompleted || isLevelFailed)) {
        removeFromParent(strenghtArrow);
        var t, i = (e.stageX - container.x) / scaleFactor,
            n = (e.stageY - container.y) / scaleFactor - blockContainer.y,
            s = 0,
            a = 0,
            r = 0,
            o = 0;
        for (o = 0; o < allBombs.length; o++)
            if (t = allBombs[o], !t.isExploded && (a = t.vis.x - i, r = t.vis.y - n, s = a * a + r * r, 1936 > s)) return void addToArray(clickedChars, t);
        for (o = allFans.length - 1; o >= 0; --o)
            if (t = allFans[o], a = t.vis.x - i, r = t.vis.y - n, s = a * a + r * r, 784 > s) return void addToArray(clickedChars, t);
        var l = getBodyAtMouse(i / PHYS_SCALE, n / PHYS_SCALE);
        if (l) {
            var h = l.userdata;
            (h && h.isRemovable || h.type === CONVEYOR_TYPE) && addToArray(clickedChars, l.userdata)
        }
    }
}

function onCharContainerMouseMove(e) {
    if (isDragging) {
        isStretchSoundNeeded && (playStretchSound(), isStretchSoundNeeded = !1), lastMousePosX = (e.stageX - container.x) / scaleFactor, lastMousePosY = (e.stageY - container.y) / scaleFactor - blockContainer.y, strenghtArrow.parent || addToParent(strenghtArrow, blockContainer);
        var t = lastMousePosX - selectedChar.vis.x + mouseStartDx,
            i = lastMousePosY - selectedChar.vis.y + mouseStartDy;
        pushAngle = Math.atan2(i, t), pushAngle -= Math.PI, pushStrenght = Math.sqrt(t * t + i * i), strenghtArrow.rotation = 180 * pushAngle / Math.PI, strenghtArrow.currentAnimationFrame = Math.min(STRENGHT_ARROW_FRAMES_NUM, Math.max(0, Math.floor(STRENGHT_ARROW_FRAMES_NUM * pushStrenght / 50)))
    }
}

function onCharContainerMouseUp() {
    if (selectedChar && isDragging && selectedChar.physBody) {
        {
            var e = 560 * selectedChar.physBody.m * strenghtArrow.currentAnimationFrame / STRENGHT_ARROW_FRAMES_NUM;
            v(Math.cos(pushAngle) * e, Math.sin(pushAngle) * e)
        }
        selectedChar.activateGravity(), selectedChar.physBody.activate(), e > 0 && playCapStartSound()
    }
    isStretchSoundNeeded = !1, stopStretchSound(), isDragging = !1, selectedChar = null, removeFromParent(strenghtArrow)
}

function loadSaves() {
    if (lastopenedlvl = 0, isStorageSupported = isSupportshtml5storage()) {
        var e = localStorage[STORAGE_PREFIX + "lastopenedlvl"];
        if (e) {
            lastopenedlvl = parseInt(localStorage[STORAGE_PREFIX + "lastopenedlvl"]);
            for (var t = 0; LEVELS_NUM > t; t++) {
                var i = localStorage[STORAGE_PREFIX + "levelstate" + t];
                levelstates.push(parseInt(i))
            }
            for (var t = 0; ACHIEVS_NUM > t; t++) {
                var n = localStorage[STORAGE_PREFIX + "achiev" + t];
                allachievs.push(n ? parseInt(n) : NOT_ACHIEVED)
            }
            isMute = "1" == localStorage[STORAGE_PREFIX + "ismute"], totalFriends = localStorage[STORAGE_PREFIX + "totalfriends"] ? parseInt(localStorage[STORAGE_PREFIX + "totalFriends"]) : 0, totalScore = localStorage[STORAGE_PREFIX + "totalScore"] ? parseInt(localStorage[STORAGE_PREFIX + "totalScore"]) : 0, diamondsCounter = localStorage[STORAGE_PREFIX + "diamondsCounter"] ? parseInt(localStorage[STORAGE_PREFIX + "diamondsCounter"]) : 0, bonusesCounter = localStorage[STORAGE_PREFIX + "bonusesCounter"] ? parseInt(localStorage[STORAGE_PREFIX + "bonusesCounter"]) : 0
        } else {
            trace("saves not found!");
            for (var t = 0; LEVELS_NUM > t; t++) levelstates.push(ZERO_STAR);
            for (var t = 0; ACHIEVS_NUM > t; t++) allachievs.push(NOT_ACHIEVED);
            updateSaves()
        }
    } else {
        trace("storage not supported");
        for (var t = 0; LEVELS_NUM > t; t++) levelstates.push(ZERO_STAR);
        for (var t = 0; ACHIEVS_NUM > t; t++) allachievs.push(NOT_ACHIEVED)
    }
}

function getStarsForLevel(e) {
    return levelstates[e]
}

function saveGame(e) {
    currentLevel >= lastopenedlvl && (lastopenedlvl = currentLevel + 1), levelstates[currentLevel] < e && (levelstates[currentLevel] = e), updateSaves()
}

function updateSaves() {
    if (isStorageSupported) {
        localStorage[STORAGE_PREFIX + "lastopenedlvl"] = lastopenedlvl;
        for (var e = 0; LEVELS_NUM > e; e++) localStorage[STORAGE_PREFIX + "levelstate" + e] = levelstates[e];
        for (var e = 0; ACHIEVS_NUM > e; e++) localStorage[STORAGE_PREFIX + "achiev" + e] = allachievs[e];
        saveMuteState(), localStorage[STORAGE_PREFIX + "totalfriends"] = "" + totalFriends, localStorage[STORAGE_PREFIX + "totalScore"] = "" + totalScore, localStorage[STORAGE_PREFIX + "diamondsCounter"] = "" + diamondsCounter, localStorage[STORAGE_PREFIX + "bonusesCounter"] = "" + bonusesCounter
    }
}

function saveMuteState() {
    isStorageSupported && (localStorage[STORAGE_PREFIX + "ismute"] = isMute ? "1" : "0")
}

function isSupportshtml5storage() {
    try {
        var e = "localStorage" in window && null !== window.localStorage;
        return e && (localStorage.setItem("storage", ""), localStorage.removeItem("storage")), e
    } catch (t) {
        return !1
    }
}

function getCollectedBonuses() {
    return bonusesCounter
}

function createInstruction(e, t, i, n) {
    var s = n ? blockContainer : allBgContainer,
        a = createPart(PART_INSTRUCTION_TYPE, e, t, 1, s);
    return a.setFrame(i), allInstructions.push(a), a
}

function addInstructions() {}

function disposeInstructions() {
    for (; allInstructions.length > 0;) allInstructions.pop().dispose()
}

function getCollectedStarsNum() {
    for (var e = 0, t = 0; LEVELS_NUM > t; t++) e += levelstates[t];
    return e
}

function createExplosion(e) {
    for (var t, i = allChars.length - 1; i >= 0; --i) t = allChars[i], t !== e && t.physBody && (t.physBody.isStatic() || t.isPhysStatic && t.type !== GLASS_BLOCK_TYPE || t.teleportationStatus > -1 || t.isDied || t.isMovable || t.isAim || t.isLand || CreateExplode(e, t))
}

function CreateExplode(e, t) {
    var i = t.physBody,
        n = t.vis.x - e.vis.x,
        s = t.vis.y - e.vis.y,
        a = Math.sqrt(n * n + s * s);
    if (!(a > e.activDistance)) {
        if (t.type === GLASS_BLOCK_TYPE) return void(a < .6 * e.activDistance && t.breakGlass());
        var r = n / a,
            o = s / a,
            l = Math.max(0, 1 - a / e.activDistance);
        l *= e.activForce * i.m;
        var h = v(r * l, o * l);
        i.applyImpulse(h, v(10 * Math.random() - 5, 0)), t.isByPhysPosUpdate = !0
    }
}

function checkWin() {
    if (!isLevelCompleted) {
        for (var e = !0, t = allPushers.length - 1; t >= 0; t--) {
            var i = allPushers[t];
            i.isLoadedToTube || (e = !1)
        }
        e && (trace("level complete!"), showLevelCompleteWin())
    }
}

function initBonusManager() {}

function createBonus(e, t, i, n, s, a, r) {
    var o = getBonusFromPool(e, blockContainer, n, s, r);
    o.setPos(t, i, a), addToArray(allBonuses, o)
}

function disposeBonuses() {
    var e, t = allBonuses.length;
    for (e = 0; t > e; e++) {
        var i = allBonuses.pop();
        i.dispose()
    }
}

function addToDisposedBonuses(e) {
    isArrayContains(disposedBonuses, e) || disposedBonuses.push(e)
}

function getBonusFromPool(e, t, i, n, s) {
    if (disposedBonuses.length > 0) {
        var a = disposedBonuses.pop();
        return a.reset(e, t, i, n, s), a
    }
    return new BonusBase(e, t, i, n, s)
}

function updateBonusManager() {
    for (var e = 0; e < allBonuses.length; e++) allBonuses[e].tick(), allBonuses[e].isCanBeDestroyed && addToArray(toDisposeBonuses, allBonuses[e]);
    for (; toDisposeBonuses.length > 0;) toDisposeBonuses.pop().dispose()
}

function initSoundManager() {
    isDesktop() || createjs.Sound.registerPlugins([createjs.WebAudioPlugin]), isAudioSupported = isSamsungDefaultBrowser() ? !1 : createjs.Sound.initializeDefaultPlugins(), isAudioSupported && manifest.push({
        src: "sound/music.ogg|sound/music.mp3",
        id: "bgMusic",
        data: 1
    }, {
        src: "sound/button_click.ogg|sound/button_click.mp3",
        id: "clickSound",
        data: 1
    }, {
        src: "sound/lvl_complete.ogg|sound/lvl_complete.mp3",
        id: "winSound",
        data: 1
    }, {
        src: "sound/lvl_fail.ogg|sound/lvl_fail.mp3",
        id: "restartSound",
        data: 1
    }, {
        src: "sound/bomb_explosion.ogg|sound/bomb_explosion.mp3",
        id: "explodeSound",
        data: 1
    }, {
        src: "sound/get_star1.ogg|sound/get_star1.mp3",
        id: "star1",
        data: 1
    }, {
        src: "sound/get_star2.ogg|sound/get_star2.mp3",
        id: "star2",
        data: 1
    }, {
        src: "sound/get_star3.ogg|sound/get_star3.mp3",
        id: "star3",
        data: 1
    }, {
        src: "sound/teleport_into.ogg|sound/teleport_into.mp3",
        id: "portalAppearSound",
        data: 1
    }, {
        src: "sound/teleport_out.ogg|sound/teleport_out.mp3",
        id: "portalDisappearSound",
        data: 2
    }, {
        src: "sound/tube_loading.ogg|sound/tube_loading.mp3",
        id: "tubeLoading",
        data: 1
    }, {
        src: "sound/char_death.ogg|sound/char_death.mp3",
        id: "creatureDeathSound0",
        data: 1
    }, {
        src: "sound/button_removable_cick.ogg|sound/button_removable_cick.mp3",
        id: "removableBtnClick",
        data: 1
    }, {
        src: "sound/bonus1.ogg|sound/bonus1.mp3",
        id: "bonus0",
        data: 1
    }, {
        src: "sound/bonus2.ogg|sound/bonus2.mp3",
        id: "bonus1",
        data: 1
    }, {
        src: "sound/bonus3.ogg|sound/bonus3.mp3",
        id: "bonus2",
        data: 1
    }, {
        src: "sound/bubble_pop.ogg|sound/bubble_pop.mp3",
        id: "bubblePop",
        data: 1
    }, {
        src: "sound/get_achiev.ogg|sound/get_achiev.mp3",
        id: "getAchiev",
        data: 1
    }, {
        src: "sound/bounce.ogg|sound/bounce.mp3",
        id: "bounceSound",
        data: 1
    }), creatureVoiceRandomizer = new Chance, captainDownRandomizer = new Chance, stretchSoundRandomizer = new Chance, captainStartSoundRandomizer = new Chance, zombieFallRandomizer = new Chance, zombieSawDeathRandomizer = new Chance, zombiePeakDeathRandomizer = new Chance
}

function isSamsungDefaultBrowser() {
    var e = navigator.userAgent;
    return e.toLowerCase().indexOf("samsung") > -1 && e.indexOf("Android ") > -1
}

function isSamsungS3DefaultBrowser() {
    var e = navigator.userAgent,
        t = e.toLowerCase();
    return t.indexOf("samsung") > -1 && e.indexOf("Android ") > -1 && (e.indexOf("SGH-T999") > -1 || e.indexOf("GT-I9300") > -1 || e.indexOf("SHV-E210") > -1 || e.indexOf("SGH-I747") > -1 || e.indexOf("SGH-N064") > -1 || e.indexOf("SCH-R530") > -1 || e.indexOf("SCH-I535") > -1 || e.indexOf("SPH-L710") > -1 || e.indexOf("GT-I9305") > -1 || e.indexOf("GT-I9308") > -1)
}

function playSound(e, t) {
    if (console.log(isMute), !isMute && isAudioSupported) {
        var i = t ? -1 : 0;
        return trace(e), createjs.Sound.play(e, {
            interrupt: createjs.Sound.INTERRUPT_EARLY,
            loop: i
        })
    }
}

function toggleMute() {
    isMute = !isMute, isMute ? (stopBgMusic(), stopWindSound()) : playBgMusic(), saveMuteState()
}

function playScoresSound() {
    !isMute && isAudioSupported && (scoresSound ? scoresSound.play() : scoresSound = playSound("countScoreSound", !1))
}

function stopScoresSound() {
    isAudioSupported && scoresSound && (scoresSound.stop(), scoresSound = null)
}

function playWindSound() {
    !isMute && isAudioSupported && (windSound = playSound("windRelease", !1))
}

function stopWindSound() {
    isAudioSupported && windSound && (windSound.stop(), windSound = null)
}

function playRemoveObjectSound() {
    playSound("removableBtnClick")
}

function resetSoundOnNewLevel() {
    isAudioSupported && (bonusSoundNum = 0)
}

function playBonusPickSound() {
    playSound("bonus" + bonusSoundNum), bonusSoundNum++, bonusSoundNum > 2 && (bonusSoundNum = 0)
}

function playCaptainDownSound() {
    isLevelCompleted || playSound("creatureDeathSound0")
}

function playCreatureSound() {
    playSound("creatureSound" + creatureVoiceRandomizer.integer({
        min: 0,
        max: 9
    }))
}

function playAchievSound() {
    playSound("getAchiev")
}

function startBgMusic() {
    isWasTouch = !0, bgMusic || playBgMusic()
}

function playBgMusic() {
    !isMute && isAudioSupported && (bgMusic ? bgMusic.resume() : bgMusic = playSound("bgMusic", !0))
}

function stopBgMusic() {
    isAudioSupported && bgMusic && bgMusic.pause()
}

function updateSoundManager() {
    zombieHitTimer > 0 && (zombieHitTimer -= dtScale), ballHitTimer > 0 && (ballHitTimer -= dtScale)
}

function playZombieHitSound() {
    0 > zombieHitTimer && (playSound("captainHitZombie"), zombieHitTimer = 20)
}

function playLevelStartSound() {
    isLevelRestarted || (playSound("levelStart" + levelStartSoundNum), levelStartSoundNum++, levelStartSoundNum > 1 && (levelStartSoundNum = 0))
}

function playBallFallSound() {
    0 > ballHitTimer && (playSound("ballFallSound"), ballHitTimer = 20)
}

function playStretchSound() {
    stopStretchSound(), !isMute && isAudioSupported && (stretchSound = playSound("stretchSound" + stretchSoundRandomizer.integer({
        min: 0,
        max: 2
    })))
}

function stopStretchSound() {
    isAudioSupported && stretchSound && (stretchSound.stop(), stretchSound = null)
}

function playCapStartSound() {
    playSound("captainStartSound" + captainStartSoundRandomizer.integer({
        min: 0,
        max: 2
    }))
}

function playZombieFallSound() {
    isLevelCompleted || playSound("zombieFall" + zombieFallRandomizer.integer({
        min: 0,
        max: 2
    }))
}

function slowMuteBgMusic() {
    bgMusic && (isMusicWasMuted = !0, createjs.Tween.removeTweens(bgMusic), bgMusic.volume = 0)
}

function slowShowBgMusic(e) {
    bgMusic && isMusicWasMuted && (isMusicWasMuted = !1, createjs.Tween.removeTweens(bgMusic), createjs.Tween.get(bgMusic).wait(e).to({
        volume: 1
    }, 600))
}

function playRestartSound() {
    playSound("clickSound")
}

function initInterface() {
    pauseBtnV = createButton(18, 18, .9, "pausebtn", onPausePress, null, onPauseUp), interfaceRestartBtn = createButton(18, 18, .4, "restartbtn", onPressStandartHandler, null, onInterfaceRestartUp), levelLabel = new createjs.BitmapText("0", zoeSS), levelLabel.scaleX = levelLabel.scaleY = .25, levelLabel.mouseEnabled = !1, levelLabel.y = 253, levelLabel.score = 0, levelLabel.spaceWidth = 10, levelLabel.postfix = "ll", menuEase = createjs.Ease.getElasticOut(1, .35), createMainMenu(), createLevelSelectMenu(), createLevelCompleteWin(), createPauseWin(), createRestartWin(), createAchievWin(), createAchievGalleryMenu(), createCreditsWin(), creategameCompleteWin(), createBlinkWin(), createComix(), isGamePaused = !0, isSkipMenus ? showGameInterface() : isLevelSelectShow ? showLevelsMenu() : isCreditsShow ? showCreditsWin() : isAchievGalleryShow ? showAchievGallery() : showMainMenu(!1)
}

function createEdgeSheets() {
    for (var e = 0; 4 > e; e++) {
        var t = createButton(0, 0, 1, "DECOR_KUST_TYPE");
        edgeSheets.push(t)
    }
    edgeSheets[1].rotation = -34, edgeSheets[2].rotation = 97, edgeSheets[3].rotation = 130
}

function showEdgeSheets() {}

function hideEdgeSheets() {}

function createBlinkWin() {
    blinkWin = createButton(-40, -60, 14, "tint2"), blinkWin.scaleX = 9
}

function startBlink(e, t) {
    addToParent(blinkWin, container), blinkWin.alpha = 1, blinkWin.gotoAndStop(t), createjs.Tween.get(blinkWin, {
        override: !0
    }).to({
        alpha: 0
    }, e).call(removeChildOnTweenComplete)
}

function showFPSMeter() {
    isNeedFpsMeter && addToParent(fpsText, container), isNeedHelperLabel && addToParent(helperLabel, container)
}

function showGameInterface() {
    addToParent(pauseBtnV, container), addToParent(interfaceRestartBtn, container), addToParent(levelLabel, container), showFPSMeter()
}

function hideGameInterface() {
    pauseBtnV.parent && container.removeChild(pauseBtnV), removeFromParent(interfaceRestartBtn), removeFromParent(levelLabel)
}

function setCurrentLevelLabel(e) {
    levelLabel.text = "l " + (e + 1)
}

function onPausePress(e) {
    isGamePaused || isLevelFailed || isLevelCompleted || onHoverScale(e.target)
}

function onPauseUp(e) {
    window.famobi.showAd(), onOutScale(e.target), isGamePaused || isLevelFailed || isLevelCompleted || levelPauseContainer.parent || isCursorOutMoved(e) || (playSound("clickSound"), showPauseWin())
}

function createMainMenu() {
    var e = menuContainer = new createjs.Container;
    logoImg = new createjs.Bitmap(files.logo_menu), setSpritePosAndAngle(logoImg, 72, 0), addToParent(logoImg, e), rememberDefaultParames(logoImg, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), addAutoAlignToObj(logoImg), playMenuBtn = createButton(ow / 2, 480, .85, "playbtnup", onPressStandartHandler, e, onPlayUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), mainMenuAchievBtn = isNeedCreditsWin || isNeedMoreGames ? createButton(125, 480, isNeedMoreGames ? 1 : .9, "achievbtn", onPressStandartHandler, e, onAchievGalleryUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2) : createButton(575, 649, isNeedMoreGames ? 1 : .88, "achievbtn", onPressStandartHandler, e, onAchievGalleryUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 1), mainMenuMuteBtn = createButton(57, 658, 1, "musiconbtn", onPressStandartHandler, e, onMainMenuMuteUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 1), mainMenuMoreGames = createButton(517, 480, .91, "moregames2v", moregamesClick, e, null, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), hideIfNoMoreGames(mainMenuMoreGames), isNeedMoreGames ? creditsBtn = createButton(585, 658, 1, "btnbaseup", onPressStandartHandler, e, onCreditsUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 1) : (creditsBtn = createButton(517, 480, 1.2, "btnbaseup", onPressStandartHandler, e, onCreditsUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), isNeedCreditsWin || (creditsBtn.visible = !1)), isAudioSupported || (mainMenuMuteBtn.visible = !1), createMainMenuTweens()
}

function onMainMenuMuteUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (toggleMute(), updateMusicIconFrame(e.target), playSound("clickSound"))
}

function updateMusicIconFrame(e) {
    var t = isMute ? MUTED_FRAME : UNMUTED_FRAME;
    e.gotoAndStop(t)
}

function showMainMenu(e) {
    container.addChild(menuContainer), updateMusicIconFrame(mainMenuMuteBtn), showFPSMeter(), showTopLogo(.8), setBg(1), showSponsorLogo(ow / 2, 658, 1, menuContainer, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 1, 0), e && (animateButtonShowX(logoImg, 100, -600, 1100, !0), animateButtonShowX(playMenuBtn, 100, 400, 1100, !1), animateButtonShow(mainMenuAchievBtn, 400, !0), animateButtonShow(mainMenuMoreGames, 550, !0), animateButtonShowX(mainMenuMuteBtn, 800, -110, 1e3, !1), isNeedMoreGames ? animateButtonShowX(creditsBtn, 800, 110, 1e3, !1) : animateButtonShow(creditsBtn, 550, !0), isNeedCacheSizeUpdate = !0)
}

function showMainMenuTweenComplete() {}

function hideMainMenu() {
    removeFromParent(menuContainer)
}

function hideMainMenuTweenComplete(e) {
    var t = e.target;
    t.alpha = 1, t.parent && container.removeChild(t)
}

function createBigWinBg() {}

function createMainMenuTweens() {
    var e = createjs.Ease.sineInOut;
    createjs.Tween.removeTweens(playMenuBtn), playMenuBtn.scaleX = .85, playMenuBtn.scaleY = .95, createjs.Tween.get(playMenuBtn, {
        override: !0,
        loop: !0
    }).to({
        scaleX: .95,
        scaleY: .85
    }, 700, e).to({
        scaleX: .85,
        scaleY: .95
    }, 1e3, e)
}

function disposeMainMenuTweens() {
    createjs.Tween.removeTweens(playMenuBtn)
}

function onPlayPress(e) {
    onHoverScale(e.target)
}

function onPlayUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), hideMainMenu(), showLevelsMenu(), startBgMusic())
}

function onAchievGalleryPress(e) {
    onHoverScale(e.target)
}

function onAchievGalleryUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), hideMainMenu(), showAchievGallery())
}

function onCreditsUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), hideMainMenu(), showCreditsWin())
}

function createButton(e, t, i, n, s, a, r, o, l, h) {
    var c = new createjs.Sprite(interfaceSS);
    if (c.snapToPixel = !0, c.x = e, c.y = t, c.scaleX = c.scaleY = i, c.gotoAndStop(n), c.defaultScale = i, c.defaultParams = {
            x: e,
            y: t,
            parent: a,
            scaleX: i,
            scaleY: i,
            rotation: 0,
            horizAlign: o,
            vertAlign: l,
            alignDevisor: h
        }, r && c.addEventListener("pressup", r, !1), s ? (c.addEventListener("mousedown", s, !1), c.cursor = "pointer") : c.mouseEnabled = !1, s || r) {
        var u = interfaceSS.getAnimation(n);
        if (u && u.frames && u.frames.length > 0) {
            var d = interfaceSS.getFrameBounds(u.frames[0]);
            c.setBoundingBox(d.x * i, d.y * i, d.width * i, d.height * i)
        }
    }
    return o && addAutoAlignToObj(c), a && a.addChild(c), c
}

function rememberDefaultParames(e, t, i, n) {
    e.defaultParams = {
        x: e.x,
        y: e.y,
        parent: e.parent,
        scaleX: e.scaleX,
        scaleY: e.scaleY,
        rotation: e.rotation,
        horizAlign: t,
        vertAlign: i,
        alignDevisor: n
    }
}

function createLevelSelectMenu() {
    var e = levelSelectContainer = new createjs.Container;
    levelSelectContainer.name = "levelselcont", createBigWinBg(5, 438, .95, e), levelsScreen1 = new createjs.Container, levelsScreen1.name = "levelsScreen1", levelsScreen2 = new createjs.Container, selectMenuBackBtn = createButton(64, 655, .8, "quitbtn", onBackToMenuPress, levelsScreen1, onBackToMenuUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), selectMenuNextBtn = createButton(576, 655, .8, "nextbtn", onPressStandartHandler, levelsScreen1, onNextPageUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), selectMenuPreviousBtn = createButton(70, 655, .8, "nextbtn", onPressStandartHandler, levelsScreen2, onPreviousPageUp, OBJ_HORIZ_ANY_POS, OBJ_BOTTOM_POS, 2), selectMenuPreviousBtn.rotation = -180, createLevelsButtons(), isNeedDebugGui && (isLevelSelectShow ? createLevelsBtnDebugGUI() : isAchievGalleryShow && createAchievBtnsDebugGUI()), levelSelectContainer.addChild(levelsScreen1), levelSelectContainer.addChild(levelsScreen2)
}

function onNextPageUp(e) {
    var t = e.target;
    onOutScale(t), isCursorOutMoved(e) || (animateLevelsButtons(LEVELS_ON_PAGE), removeFromParent(levelsScreen1), addToParent(levelsScreen2, levelSelectContainer), showSponsorLogo(320, 663, .85, container, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 1), playSound("clickSound"))
}

function onPreviousPageUp(e) {
    var t = e.target;
    onOutScale(t), isCursorOutMoved(e) || (animateLevelsButtons(0), removeFromParent(levelsScreen2), addToParent(levelsScreen1, levelSelectContainer), showSponsorLogo(320, 663, .85, container, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 1), playSound("clickSound"))
}

function cacheWin(e) {
    var t = 10;
    e.cache(-t, -t, ow + 2 * t, oh + 2 * t)
}

function uncacheWin(e) {
    e.uncache()
}

function createLevelsButtons() {
    for (var e = 0; LEVELS_NUM > e; e++) {
        var t = levelsBtnCreateParams,
            i = e % LEVELS_ON_PAGE,
            n = i % 5,
            s = Math.floor(i / 5),
            a = createButton(t.left.val + n * t.spaceX.val, t.top.val + s * t.spaceY.val, t.scale.val, "lvlLabelStar0", onLevelBtnPress, e >= LEVELS_ON_PAGE ? levelsScreen2 : levelsScreen1, onLevelBtnUp);
        a.levelNum = e, allLevelBtns.push(a);
        var r = new createjs.BitmapText("", zoeSS);
        r.scaleX = r.scaleY = t.txtScale.val, r.letterSpacing = 0, r.x = a.x, e > 9 && setSpriteScale(r, .79), setTextAndCenter(a.x, a.y - 18, (e + 1).toString(), r), 0 === e && (r.x -= 5), r.mouseEnabled = !1, a.txtNum = r, rememberDefaultParames(a.txtNum)
    }
}

function deleteLevelsBtn() {
    for (; allLevelBtns.length > 0;) {
        var e = allLevelBtns.pop();
        removeFromParent(e), removeFromParent(e.txtNum)
    }
}

function updateLevelsButtons() {
    for (var e = 0; LEVELS_NUM > e; e++) {
        var t = lastopenedlvl >= e;
        isOpenAllLevels && (t = e < levelsBtnCreateParams.openedLevels.val);
        var i;
        if (t) {
            var n = getStarsForLevel(e);
            i = "lvlLabelStar" + n
        } else i = "levelbuttonlocked";
        var s = allLevelBtns[e];
        s.gotoAndStop(i), s.isOpened = t, t ? s.txtNum.parent || s.parent.addChild(s.txtNum) : s.txtNum.parent && s.parent.removeChild(s.txtNum)
    }
}

function animateLevelsButtons(e) {
    for (var t = e; e + LEVELS_ON_PAGE > t; t++) {
        var i = allLevelBtns[t],
            n = t - e;
        animateButtonShow2(i, 40 * n), i.txtNum.parent && animateButtonShow2(i.txtNum, 50 * n + 50)
    }
}

function onLevelBtnPress(e) {
    var t = e.target;
    onHoverScale(t), trace("level " + t.levelNum + " load"), updateCacheByBtnNum(t.levelNum)
}

function onLevelBtnUp(e) {
    var t = e.target;
    return onOutScale(t), isCursorOutMoved(e) ? void updateCacheByBtnNum(t.levelNum) : void(t.isOpened ? (levelRestartsCounter = 0, levelsWithoutRestartsCounter = 0, hideLevelsMenu(), showGameInterface(), loadLevel(t.levelNum), startBlink(400, "tint2"), showGameField(), playSound("clickSound")) : (updateCacheByBtnNum(t.levelNum), playSound("clickSound")))
}

function updateCacheByBtnNum() {}

function onBackToMenuPress(e) {
    e.target;
    onHoverScale(e.target)
}

function onBackToMenuUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (hideLevelsMenu(), showMainMenu(!0), playSound("clickSound"))
}

function showLevelsMenu() {
    container.addChild(levelSelectContainer), setBg(4), updateLevelsButtons(), animateLevelsButtons(0), levelsScreen2.parent && levelSelectContainer.removeChild(levelsScreen2), levelsScreen1.parent || levelSelectContainer.addChild(levelsScreen1), levelsScreen1.x = 0, levelsScreen1.alpha = 1, showSponsorLogo(320, 663, .85, container, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 1)
}

function hideLevelsMenu() {
    createjs.Tween.removeTweens(levelSelectContainer), removeFromParent(levelSelectContainer)
}

function showGameField() {
    createjs.Tween.removeTweens(blockContainer), blockContainer.parent || container.addChild(blockContainer), blockContainer.alpha = 0, blockContainer.visible = !0, createjs.Tween.get(blockContainer, {
        override: !0
    }).to({
        alpha: 1
    }, 400), showSponsorLogo(-1e3, 40, .7, container, 1, LOGO_HORIZ_ANY_POS, LOGO_VERTICAL_ANY_POS, 2)
}

function showIngameLogo() {
    showSponsorLogo(545, 40, .7, container, 1, LOGO_HORIZ_ANY_POS, LOGO_VERTICAL_ANY_POS, 2)
}

function hideGameField(e, t) {
    isGamePaused = !0, createjs.Tween.removeTweens(blockContainer);
    var i = createjs.Tween.get(blockContainer).to({
        alpha: 0,
        visible: !1
    }, t ? t : 200).call(removeFromParent);
    e && i.call(disposeLevelPhysics)
}

function createLevelCompleteWin() {
    var e = levelCompleteContainer = new createjs.Container,
        t = 0;
    isNeedLogo || (t = 50), createBigWinBg(5, 400, .83, e);
    var i = createBitmapFromFile("preloaderchar", ow / 2, 285 + t, 1.08, e);
    i.regX = 236, i.regY = 268, completeRestartBtn = createButton(498, 450 + t, .7, "restartbtn", onPressStandartHandler, e, onCompleteRestartUp), completeQuitBtn = createButton(146, 450 + t, .9, "quitbtn", onPressStandartHandler, e, onCompleteQuitUp), createButton(ow / 2, 85 + t, .8, "lvlcompletebgnew", null, e), star1 = createButton(i.x - 73.92, i.y - 17.6 - 198, .88, "completestar", null, null, null), star1.rotation = -15, star2 = createButton(i.x - 1, i.y - 23.76 - 202, .88, "completestar", null, null, null), star3 = createButton(i.x + 72.9, i.y - 14.08 - 202, .88, "completestar", null, null, null), star3.rotation = 12, completeLevelLabel = new createjs.BitmapText("0", zoeSS), completeLevelLabel.scaleX = completeLevelLabel.scaleY = .65, completeLevelLabel.mouseEnabled = !1, completeLevelLabel.y = 197 + t, completeLevelLabel.x = 200, completeLevelLabel.score = 0, completeMoreGames = createButton(85, 326 + t, .88, "moregames2v", moregamesClick, e, null), hideIfNoMoreGames(completeMoreGames), completeWinNextBtn = createButton(320, 500 + t, .95, "playbtnup", onPressStandartHandler, e, onNextLevelUp)
}

function onCompleteRestartUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (restartLevel(), showGameField(), hideLevelCompleteWin(), stopScoresSound(), playRestartSound(), slowShowBgMusic(0))
}

function onPressStandartHandler(e) {
    onHoverScale(e.target)
}

function onNextLevelUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (hideLevelCompleteWin(), handleNextLevelClick(), stopScoresSound(), playSound("clickSound"), slowShowBgMusic(0))
}

function onCompleteQuitUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (isLevelCompleted = !1, isGamePaused = !0, hideLevelCompleteWin(10), hideGameInterface(), showMainMenu(!0), stopScoresSound(), playSound("clickSound"), slowShowBgMusic(0))
}

function handleNextLevelClick() {
    var e = getNewAchievedId();
    e > -1 ? showAchievWin(e) : currentLevel >= LEVELS_NUM - 1 ? (hideGameInterface(), disposeLevel(), showMainMenu(!0)) : (showGameInterface(), loadNextLevel(), showGameField())
}

function showLevelCompleteWin() {
    isLevelCompleted || isLevelFailed || window.famobi.showAd(function() {
        showLevelCompleteWinCallback()
    })
}

function showLevelCompleteWinCallback() {
    window.famobi.levelUp(), isLevelCompleted = !0, hideGameInterface(), createjs.Tween.removeTweens(levelCompleteContainer), removeFromParent(star1), removeFromParent(star2), removeFromParent(star3), container.addChild(levelCompleteContainer), addToParent(particleContainer, container), levelCompleteContainer.x = 400, levelCompleteContainer.alpha = 0, completeRestartBtn.x = completeQuitBtn.x = completeWinNextBtn.x = 1e3, createjs.Tween.get(blockContainer).wait(800).call(function() {
        hideGameField(), animateCompleteButtons()
    }), createjs.Tween.get(levelCompleteContainer, {
        override: !0
    }).wait(900).call(function() {
        showSponsorLogo(ow / 2, 658, 1, levelCompleteContainer, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 2, 0)
    }).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase).call(showStars), currentLevelStarsNum = ZERO_STAR, collectedBonuses >= totalBonuses ? currentLevelStarsNum = THREE_STAR : collectedBonuses >= totalBonuses / 2 ? currentLevelStarsNum = TWO_STAR : collectedBonuses > 0 && (currentLevelStarsNum = ONE_STAR), currentLevelScore += 1e3 * currentLevelStarsNum, currentTimeScore > 0 && (currentLevelScore += currentTimeScore), totalScore += currentLevelScore + scoreToAdd, scoreToAdd = 0, totalFriends += totalEnemies, saveGame(currentLevelStarsNum), completeLevelLabel.text = "" + (currentLevel + 1), window.famobi.submitHighscore(currentLevel + 1, totalScore), checkCompleteAchievs(), stopWindSound(), slowMuteBgMusic(), playSound("winSound")
}

function checkCompleteAchievs() {
    currentLevel >= LEVELS_NUM - 1 && addAchiev(GAME_COMPLETE_ACHIEV), getCollectedStarsNum() >= 3 * LEVELS_NUM && addAchiev(MEGA_STAR_ACHIEV), getCollectedBonuses() >= 10 && addAchiev(TEN_BONUS_ACHIEV), 1 === currentLevel ? addAchiev(GREAT_START_ACHIEV) : 9 === currentLevel ? addAchiev(BOMBERMAN_ACHIEV) : 3 === currentLevel && addAchiev(MOVABLE_ACHIEV), 19 === currentLevel && addAchiev(HALF_GAME_ACHIEV), 11 === currentLevel && addAchiev(TELEPORT_ACHIEV), 14 === currentLevel && addAchiev(BAD_CHAR_ACHIEV), levelsWithoutRestartsCounter++
}

function isCollectedAllStarsOnFirst10Levels() {
    for (var e = 0, t = 0; 10 > t; t++) e += levelstates[t];
    return e >= 30
}

function showStars() {
    startSponsorAds(), animateStar(star1, 20 + scoreTweenLength, .88, "star1"), currentLevelStarsNum >= TWO_STAR && animateStar(star2, 800 + scoreTweenLength, .88, "star2"), currentLevelStarsNum >= THREE_STAR && animateStar(star3, 1600 + scoreTweenLength, .88, "star3")
}

function animateCompleteButtons() {
    animateButtonShow(completeRestartBtn, 300), animateButtonShow(completeQuitBtn, 600), animateButtonShow(completeWinNextBtn, 900), animateButtonShow(completeMoreGames, 1200)
}

function animateStar(e, t, i, n) {
    levelCompleteContainer.addChild(e), e.alpha = 0, e.scaleX = e.scaleY = 2, createjs.Tween.get(e, {
        override: !0
    }).wait(t).to({
        alpha: 1,
        scaleX: i,
        scaleY: i
    }, 700, createjs.Ease.bounceOut).call(function() {}), createjs.Tween.get({
        x: 100
    }).wait(t + 200).call(function() {
        isLevelCompleted && (playSound(n), createPrerenderedPart(e.x, e.y, 1.2, "parteffectv2", .85, e, .8))
    })
}

function hideLevelCompleteWin(e) {
    createjs.Tween.removeTweens(star1), createjs.Tween.removeTweens(star2), createjs.Tween.removeTweens(star3), createjs.Tween.removeTweens(levelCompleteContainer), createjs.Tween.get(levelCompleteContainer).to({
        alpha: 0,
        x: -400
    }, e ? e : 200).call(removeChildOnTweenComplete), showGameInterface()
}

function createPauseWin() {
    var e = levelPauseContainer = new createjs.Container,
        t = 0;
    isNeedLogo || (t = 50);
    var i = createBitmapFromFile("preloaderchar", ow / 2, 305 + t, 1.08, e);
    i.regX = 236, i.regY = 268, createButton(ow / 2, 285 + t, 1.2, "pauseface", null, e);
    var n = createButton(481, 88 + t, 1, "pausezzz", null, e);
    n.rotation = -45, isNeedMoreGames ? (pauseQuitBtn = createButton(170, 469 + t, 1, "quitbtn", onPauseQuitPress, levelPauseContainer, onPauseQuitUp), pauseMuteBtn = createButton(91, 347 + t, 1.35, "musiconbtn", onPauseMutePress, levelPauseContainer, onPauseMuteUp), pauseContinueBtn = createButton(486, 455 + t, 1, "playbtnup", onPauseContinuePress, levelPauseContainer, onPauseContinueUp)) : (pauseQuitBtn = createButton(141, 441 + t, 1, "quitbtn", onPauseQuitPress, levelPauseContainer, onPauseQuitUp), pauseMuteBtn = createButton(501, 441 + t, 1.35, "musiconbtn", onPauseMutePress, levelPauseContainer, onPauseMuteUp), pauseContinueBtn = createButton(320, 495 + t, 1, "playbtnup", onPauseContinuePress, levelPauseContainer, onPauseContinueUp)), isAudioSupported || (pauseMuteBtn.visible = !1), pauseMoreGamesBtn = createButton(320, 520 + t, .95, "moregames2v", moregamesClick, levelPauseContainer, null), hideIfNoMoreGames(pauseMoreGamesBtn)
}

function onPauseMutePress(e) {
    onHoverScale(e.target)
}

function onPauseMuteUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (toggleMute(), updateMusicIconFrame(e.target), isMute || playSound("clickSound"))
}

function onPauseRestartPress(e) {
    e.target;
    onHoverScale(e.target)
}

function onPauseRestartUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (hidePauseWin(!1, !1), showGameField(), restartLevel(), playRestartSound())
}

function onInterfaceRestartUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (showGameField(), restartLevel(), playRestartSound())
}

function onPauseQuitPress(e) {
    onHoverScale(e.target)
}

function onPauseQuitUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), isGamePaused = !0, disposeLevel(), hidePauseWin(!1, !0), hideGameField(!1, 0), showMainMenu(!0), slowShowBgMusic(0))
}

function onPauseContinuePress(e) {
    onHoverScale(e.target)
}

function onPauseContinueUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (showGameField(), hidePauseWin(!1, !1), playSound("clickSound"))
}

function showPauseWin() {
    isGamePaused = !0, hideGameInterface(), hideGameField(!1), updateMusicIconFrame(pauseMuteBtn), container.addChild(levelPauseContainer), levelPauseContainer.x = -400, levelPauseContainer.alpha = 0, createjs.Tween.get(levelPauseContainer).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase), animateButtonShow(pauseContinueBtn, 100), animateButtonShow(pauseQuitBtn, 200), isNeedMoreGames ? (animateButtonShow(pauseMoreGamesBtn, 400), animateButtonShow(pauseMuteBtn, 600)) : animateButtonShow(pauseMuteBtn, 400), showSponsorLogo(ow / 2, 658, 1, levelPauseContainer, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 2, 0)
}

function hidePauseWin(e, t) {
    isGamePaused = !1, createjs.Tween.removeTweens(levelPauseContainer), createjs.Tween.get(levelPauseContainer).to({
        alpha: 0,
        x: 400
    }, 300).call(removeChildOnTweenComplete), t || showGameInterface()
}

function createAchievWin() {
    achievContainer = new createjs.Container, createButton(ow / 2, 486, 1, "achievlabelbg", null, achievContainer), raduga = createButton(ow / 2, 300, 2, "radugav", null, achievContainer), createButton(ow / 2, 370, 1.25, "newachievbgv", null, achievContainer), achievDesc = createButton(ow / 2, 486, 1, "achievdesc1", null, achievContainer), createButton(ow / 2, 622, .8, "playbtnup", onAchievContinuePress, achievContainer)
}

function onAchievContinuePress() {
    hideAchievWin(), handleNextLevelClick()
}

function showAchievWin(e) {
    achievContainer.parent || container.addChild(achievContainer), disposeLevel(), hideGameInterface(), achievDesc.gotoAndStop("achievdesc" + Math.round(e)), allachievs[e] = ACHIEVED, updateSaves(), createjs.Tween.removeTweens(achievContainer), achievContainer.alpha = 0, createjs.Tween.get(achievContainer, {
        override: !0
    }).to({
        alpha: 1
    }, 300).call(function() {
        playAchievSound()
    }), showIngameLogo()
}

function hideAchievWin() {
    removeFromParent(achievContainer)
}

function getNewAchievedId() {
    return achievsReadyToShow.length > 0 ? achievsReadyToShow.pop() : -1
}

function addAchiev(e) {
    isAlreadyAchieved(e) || addToArray(achievsReadyToShow, e)
}

function isAlreadyAchieved(e) {
    return allachievs[e] == ACHIEVED
}

function createAchievGalleryMenu() {
    var e = achGalleryContainer = new createjs.Container;
    createAchievLabels(), achGalleryMenuBackBtn = createButton(320, 655, .8, "quitbtn", onPressStandartHandler, e, onAchievGalleryBackUp);
    var t = achievGalleryLabelBg = createButton(ow / 2, 543, 1, "achievlabelbg", null, e);
    achievGalleryDesc = createButton(t.x, t.y, 1, "achievdesctap", null, e)
}

function createAchievLabels() {
    for (var e = 0; ACHIEVS_NUM > e; e++) {
        var t = achievsBtnCreateParams,
            i = e % 3,
            n = Math.floor(e / 3),
            s = createButton(t.left.val + i * t.spaceX.val, t.top.val + n * t.spaceY.val, t.scale.val, "achievclosed", onAchievIconPress, achGalleryContainer);
        allAchievsLabels.push(s)
    }
}

function deleteAchievBtns() {
    for (; allAchievsLabels.length > 0;) {
        var e = allAchievsLabels.pop();
        removeFromParent(e)
    }
}

function onAchievIconPress(e) {
    var t = e.target;
    achievGalleryDesc.gotoAndStop("achievdesc" + allAchievsLabels.indexOf(t)), animateButtonShow3(achievGalleryDesc, 0), animateButtonShow4(t, 0), playSound("bubblePop")
}

function onAchievIconUp(e) {
    onOutScale(e.target)
}

function updateAchievLabels() {
    for (var e = 0; ACHIEVS_NUM > e; e++) {
        var t, i = allachievs[e] == ACHIEVED;
        t = i ? "achievicon" + e.toString() : "achievclosed";
        var n = allAchievsLabels[e];
        n.gotoAndStop(t)
    }
}

function animateAchievGalleryButtons() {
    for (var e = 0; ACHIEVS_NUM > e; e++) {
        var t = allAchievsLabels[e];
        animateButtonShow2(t, 50 * e)
    }
}

function onAchievGalleryBackUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), hideAchievGallery(), showMainMenu(!0))
}

function showAchievGallery() {
    container.addChild(achGalleryContainer), setBg(1), achievGalleryDesc.gotoAndStop("achievdesctap"), updateAchievLabels(), animateAchievGalleryButtons(), animateButtonShowX2(achievGalleryLabelBg, 0, -400, 800, !1), animateButtonShowX2(achievGalleryDesc, 0, 700, 800, !1), achGalleryContainer.x = 0, achGalleryContainer.alpha = 1, showSponsorLogo(111, 663, .85, container, 1, LOGO_LEFT_POS, LOGO_BOTTOM_POS, 1)
}

function hideAchievGallery() {
    createjs.Tween.removeTweens(achGalleryContainer), createjs.Tween.get(achGalleryContainer, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(uncacheAndRemove)
}

function createCreditsWin() {
    var e = creditsContainer = new createjs.Container;
    creditsDiscofish = createButton(ow / 2, 230, 1, "discofish", null, e), creditsAnd = createButton(ow / 2, 323, 1, "creditsand", null, e), creditsPorubov = createButton(ow / 2 - 15, 416, 1, "porubovcom", null, e), createButton(ow / 2, 546, .9, "quitbtn", onCreditsQuitPress, e, onCreditsQuitUp)
}

function onSiteLinkPress() {
    window.open("http://porubov.com", "_blank")
}

function onCreditsLinkPress() {
    window.location = "mailto:seddas@gmail.com?subject=BattleFish"
}

function onCreditsQuitPress(e) {
    onHoverScale(e.target)
}

function onCreditsQuitUp(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), hideCreditsWin(), showMainMenu(!0))
}

function showCreditsWin() {
    container.addChild(creditsContainer), setBg(1), creditsContainer.x = 0, creditsContainer.alpha = 1, showTopLogo(.8), startBlink(700, "tint2"), showSponsorLogo(320, 44, .78, container, 1, LOGO_HORIZ_ANY_POS, LOGO_VERTICAL_ANY_POS, 2)
}

function hideCreditsWin() {
    removeFromParent(creditsContainer)
}

function creategameCompleteWin() {
    gameCompleteContainer = new createjs.Container, createButton(ow / 2, 310, 1, "nextlevelwin", ongameCompleteQuitPress, gameCompleteContainer, ongameCompleteQuitUp), createButton(ow / 2, 237, 1, "levelinstruction8", null, gameCompleteContainer), createButton(ow / 2, 105, 1, "allcollectedstars", null, gameCompleteContainer), createButton(ow / 2, 30, 1, "gamecompletedTitle", null, gameCompleteContainer), collectedStarsTxt = new createjs.BitmapText(getCollectedStarsNum().toString(), interfaceSS), collectedStarsTxt.letterSpacing = -7, collectedStarsTxt.x = 80, collectedStarsTxt.y = 121, collectedStarsTxt.mouseEnabled = !1, gameCompleteContainer.addChild(collectedStarsTxt), createButton(260, 335, .7, "moregamesbtn", moregamesClick, gameCompleteContainer, null)
}

function ongameCompleteQuitPress(e) {
    var t = e.target;
    t.scaleX = t.scaleY = 1.2
}

function ongameCompleteQuitUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), hidegameCompleteWin(), showMainMenu(!0))
}

function showGameCompleteWin() {
    isGameCompleteScreenShow = !0, container.addChild(gameCompleteContainer), collectedStarsTxt.text = getCollectedStarsNum().toString(), gameCompleteContainer.x = 400, gameCompleteContainer.alpha = 0, createjs.Tween.get(gameCompleteContainer, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, createjs.Ease.elasticOut)
}

function hidegameCompleteWin() {
    isGameCompleteScreenShow = !1, updateMobileBrowserParams(), createjs.Tween.removeTweens(gameCompleteContainer), createjs.Tween.get(gameCompleteContainer, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(removeChildOnTweenComplete)
}

function uncacheAndRemove(e) {
    var t = e.target;
    t.parent && t.parent.removeChild(t)
}

function removeChildOnTweenComplete(e) {
    var t = e.target;
    t.parent && t.parent.removeChild(t)
}

function isTweened(e) {
    return createjs.Tween.hasActiveTweens(e)
}

function isCursorOutMoved(e) {
    return isDesktop() ? (hitPoint = e.target.globalToLocal(e.stageX, e.stageY), !e.target.hitTest(hitPoint.x, hitPoint.y)) : !1
}

function updateScoreLabel() {}

function interfaceTick() {
    for (var e = 0; e < rotatedDecors.length; e++) rotatedDecors[e].rotation += 3 * dtScale;
    raduga && (raduga.rotation += dtScale)
}

function updateInterfacePositions() {
    pauseBtnV.x = viewportW - 42, pauseBtnV.y = 42, interfaceRestartBtn.x = viewportW - 125, interfaceRestartBtn.y = 43, isNeedFpsMeter && (fpsText.x = ow - 70 - deltaForHLeft(), fpsText.y = 650 - deltaForVTop() / 2), allBgContainer.y = -(maxH - viewportH) / 2, achGalleryContainer.y = creditsContainer.y = achievContainer.y = restartContainer.y = levelSelectContainer.y = levelPauseContainer.y = levelCompleteContainer.y = deltaForVBottom() / 2, particleContainer.y = blockContainer.y = deltaForVBottom() / 2 + (1 - gameFieldScale) * minH / 2, particleContainer.x = blockContainer.x = (1 - gameFieldScale) * minW / 2, updateLogoPos(), updateAutoAlign(), isLevelEditor && isNeedDebugGui && updateDebugGui()
}

function createComix() {
    comixCont = new createjs.Container, comixFrame1 = createButton(16, 5, .78, "comixv1", null, comixCont), comixFrame2 = createButton(16, 163, .78, "comixv2", null, comixCont), comixFrame3 = createButton(11, 272, .78, "comixv3", null, comixCont), comixBg = createButton(-18, -100, 7, "tint2"), comixBg.scaleY = 10, comixNextBtn = createButton(0, 0, .8, "backbtn", onPressStandartHandler, comixCont, onNextComixPress), comixNextBtn.rotation = 180
}

function showComix() {
    startBlink(700, "tint2"), addToParent(comixBg, allBgContainer), comixIndex = 0, container.addChild(comixCont), comixNextBtn.x = 270, comixNextBtn.y = 402, comixNextBtn.alpha = 0, comixCont.alpha = 0, createjs.Tween.get(comixCont, {
        override: !0
    }).wait(300).to({
        alpha: 1
    }, 1e3), createjs.Tween.get(comixNextBtn, {
        override: !0
    }).wait(1300).to({
        alpha: 1
    }, 1e3), showSponsorLogo(58, 417, .85, container, 1, LOGO_LEFT_POS, LOGO_BOTTOM_POS, 2)
}

function onNextComixPress(e) {
    onOutScale(e.target), isCursorOutMoved(e) || (removeFromParent(comixCont), removeFromParent(comixBg), loadLevel(0), showGameField(), showGameInterface(), startBlink(400, "tint2"), showIngameLogo(), playSound("clickSound"))
}

function createRestartWin() {
    var e = restartContainer = new createjs.Container,
        t = 0;
    isNeedLogo || (t = 50);
    var i = createBitmapFromFile("preloaderchar", ow / 2, 305 + t, 1.08, e);
    i.regX = 236, i.regY = 268, restartTitle = createButton(ow / 2, 285 + t, 1.2, "youlosttitle", null, e), restartQuitBtn = createButton(168, 471 + t, 1, "quitbtn", onPressStandartHandler, e, onRestartQuitUp), restartAgainBtn = createButton(491, 464 + t, 1, "restartbtn", onPressStandartHandler, e, onRestartWinRestartBtnUp), restartMoreGames = createButton(320, 520 + t, .95, "moregames2v", moregamesClick, e, null), hideIfNoMoreGames(restartMoreGames)
}

function onRestartWinRestartBtnUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (hideRestartWin(!1, !1), showGameField(), restartLevel(), playRestartSound())
}

function onRestartQuitUp(e) {
    e.target;
    onOutScale(e.target), isCursorOutMoved(e) || (playSound("clickSound"), isGamePaused = !0, disposeLevel(), hideRestartWin(!1, !0), hideGameField(!1, 100), showMainMenu(!0), slowShowBgMusic(0))
}

function showRestartWin() {
    isLevelFailed && (levelPauseContainer.parent || window.famobi.showAd(function() {
        showRestartWinCallback()
    }))
}

function showRestartWinCallback() {
    window.famobi.gameOver(), isGamePaused = !0, hideGameInterface(), hideGameField(!1), container.addChild(restartContainer), hideGameField(!0, 400), restartContainer.x = -400, restartContainer.alpha = 1, createjs.Tween.get(restartContainer).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase), showIngameLogo(), showSponsorLogo(ow / 2, 658, 1, restartContainer, 1, LOGO_HORIZ_ANY_POS, LOGO_BOTTOM_POS, 2, 0), animateRestartButtons(), playSound("restartSound")
}

function hideRestartWin(e, t) {
    isGamePaused = !1, createjs.Tween.removeTweens(restartContainer), createjs.Tween.get(restartContainer).to({
        alpha: 0,
        x: 400
    }, 300).call(removeChildOnTweenComplete), t || showGameInterface()
}

function animateRestartButtons() {
    animateButtonShow(restartAgainBtn, 300), animateButtonShow(restartQuitBtn, 600), animateButtonShow(restartMoreGames, 900)
}

function animateButtonShow(e, t, i) {
    setSpritePosAndAngle(e, e.defaultParams.x, e.defaultParams.y, -90), i && updateObjectPos(e), setSpriteScale(e, 0), createjs.Tween.get(e, {
        override: !0
    }).wait(t).to({
        scaleX: e.defaultParams.scaleX,
        scaleY: e.defaultParams.scaleY,
        rotation: 0
    }, 1e3, createjs.Ease.elasticOut)
}

function animateButtonShow2(e, t, i) {
    setSpritePosAndAngle(e, e.defaultParams.x, e.defaultParams.y, 90), i && updateObjectPos(e), setSpriteScale(e, 0), createjs.Tween.get(e, {
        override: !0
    }).wait(t).to({
        scaleX: e.defaultParams.scaleX,
        scaleY: e.defaultParams.scaleY,
        rotation: 0
    }, 1e3, createjs.Ease.elasticOut)
}

function animateButtonShowX(e, t, i, n, s) {
    updateObjectPos(e);
    var a = e.x;
    e.x += i, createjs.Tween.get(e, {
        override: s
    }).wait(t).to({
        x: a
    }, n, createjs.Ease.elasticOut)
}

function animateButtonShow3(e, t) {
    setSpritePosAndAngle(e, e.defaultParams.x, e.defaultParams.y, 0), setSpriteScale(e, 0), createjs.Tween.get(e, {
        override: !0
    }).wait(t).to({
        scaleX: e.defaultParams.scaleX,
        scaleY: e.defaultParams.scaleY
    }, 1e3, createjs.Ease.elasticOut)
}

function animateButtonShow4(e, t) {
    setSpritePosAndAngle(e, e.defaultParams.x, e.defaultParams.y, 70), setSpriteScale(e, e.defaultParams.scaleX - .3), createjs.Tween.get(e, {
        override: !0
    }).wait(t).to({
        scaleX: e.defaultParams.scaleX,
        scaleY: e.defaultParams.scaleY,
        rotation: 0
    }, 800, createjs.Ease.elasticOut)
}

function animateButtonShowX2(e, t, i, n, s) {
    updateObjectPos(e);
    var a = e.x;
    e.x += i, createjs.Tween.get(e, {
        override: s
    }).wait(t).to({
        x: a
    }, n, createjs.Ease.sineOut)
}

function initResizeManager() {
    isHighDPI = checkForHiDPI(), isSamsungDefaultBrowser() && (isHighDPI = !1), setCorrectViewPort(), addPreventScrollHandlers(), window.addEventListener("resize", onWindowResize), document.addEventListener("touchstart", PreventScrollTouch), window.onorientationchange = orientChange, onGameResize(), setTimeout(scrollWinToTop, 100)
}

function onGameResize() {
    scrollWinToTop();
    var e = window.innerWidth,
        t = window.innerHeight;
    winHeight = t, zoomFactor = 1, isLowGfx && (zoomFactor = 1.66), e /= zoomFactor, t /= zoomFactor;
    var i = "scale(" + zoomFactor + "," + zoomFactor + ")";
    canvas.style.transform = i, canvas.style.msTransform = i, canvas.style.MozTransform = i, canvas.style.WebkitTransform = i, canvas.style.OTransform = i, styleScaleFactor = Math.min(e / minW, t / minH);
    var n = Math.min(e, maxW * styleScaleFactor),
        s = Math.min(t, maxH * styleScaleFactor),
        a = s / styleScaleFactor - maxH;
    stage.canvas.height = maxH + a;
    var r = n / styleScaleFactor - maxW;
    stage.canvas.width = maxW + r, stage.canvas.width /= zoomFactor, stage.canvas.height /= zoomFactor, container.scaleX = container.scaleY = 1 / zoomFactor, scaleFactor = 1 / zoomFactor, stage.canvas.style.width = n + "px", stage.canvas.style.height = s + "px", stage.canvas.style.marginTop = "0px", stage.canvas.style.marginLeft = "0px", stageLeft = Math.floor((e * zoomFactor - n) / 2), stage.canvas.style.left = stageLeft + "px", stageTop = Math.floor((t * zoomFactor - s) / 2), stage.canvas.style.top = stageTop + "px", viewportH = s / styleScaleFactor, viewportW = n / styleScaleFactor, stage.autoClear = !1, topVisionLine = -(viewportH - oh), container.x = container.y = 0, splashContainer && (splashContainer.scaleX = container.scaleX, splashContainer.scaleY = container.scaleY, splashContainer.x = container.x, splashContainer.y = container.y / 2), winWidth = e, winHeight = t, timer = null, loaderBar && (loaderBar.y = viewportH / 2, loaderBar.parent && (stage.autoClear = !0)), isAllFilesLoaded && isGameInited && updateInterfacePositions(), isNeedCacheSizeUpdate = !0, isPhysicsDebugDraw && debugDraw && (debugCanvas.width = stage.canvas.width, debugCanvas.height = stage.canvas.height, debugCanvas.style.left = stage.canvas.style.left, debugCanvas.style.top = stage.canvas.style.top, debugCanvas.style.left = container.x + "px", debugCanvas.style.marginTop = container.y + blockContainer.y * styleScaleFactor + "px"), stage.update()
}

function isNeedCanvasZoom(e, t) {
    if (isDesktop()) return !1;
    var i = Math.min(e / minW, t / minH);
    return isDefaultAndroid() && i >= 2
}

function deltaForVCenter() {
    return -(viewportH - oh) / 2
}

function deltaForVTop() {
    return -(viewportH - oh)
}

function deltaForVBottom() {
    return viewportH - oh
}

function deltaForHLeft() {
    return -(viewportW - ow) / 2
}

function getMaxLeft() {
    return -(maxW - ow) / 2
}

function getMaxRight() {
    return maxW + getMaxLeft()
}

function getMaxTop() {
    return -(maxH - oh)
}

function orientChange() {
    setTimeout(scrollWinToTop, 50), onWindowResize(null)
}

function scrollWinToTop() {
    window.scrollTo(0, 1)
}

function PreventScrollTouch(e) {
    return window.scrollTo(0, 1), window.innerHeight != winHeight && onWindowResize(null), e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
}

function onWindowResize() {
    setTimeout(scrollWinToTop, 1), clearTimeout(timer), setTimeout(onGameResize, 100), setTimeout(onGameResize, 1e3)
}

function getURLParameter(e) {
    return decodeURIComponent((new RegExp("[?|&]" + e + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}

function setCorrectViewPort() {
    if (!isDefaultAndroid()) {
        for (var e = document.getElementsByTagName("meta"), t = 0; t < e.length; t++) e[t].getAttribute("name") && "viewport" == e[t].getAttribute("name") && (e[t].parentNode.removeChild(e[t]), trace("remove meta!"));
        var i = document.createElement("meta");
        i.name = "viewport", i.content = "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0", document.getElementsByTagName("head")[0].appendChild(i), trace("new meta!")
    }
}

function addPreventScrollHandlers() {
    document.addEventListener("touchstart", touchPreventHandler, !1), document.addEventListener("touchmove", touchPreventHandler, !1), document.addEventListener("touchend", touchPreventHandler, !1), document.body.addEventListener("touchstart", touchPreventHandler, !1), document.body.addEventListener("touchmove", touchPreventHandler, !1), document.body.addEventListener("touchend", touchPreventHandler, !1)
}

function touchPreventHandler(e) {
    return isPreventScroll ? (e.preventDefault(), !1) : void 0
}

function checkForHiDPI() {
    return window.hasOwnProperty("devicePixelRatio") && window.devicePixelRatio >= 2 ? !0 : !1
}

function isMobileDetected(e) {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|android|ipad|playbook|silk|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
}

function isDesktop() {
    return isDesktopBrowser
}

function updateMobileBrowserParams() {
    MAX_PARTICLES_ON_SCREEN = isDesktopBrowser ? 30 : 12
}

function detectBrowser() {
    isDesktopBrowser = !isMobileDetected(navigator.userAgent || navigator.vendor || window.opera);
    var e = getURLParameter("mobile");
    e && 1 == parseInt(e) && (isDesktopBrowser = !1), updateMobileBrowserParams()
}

function initLoaders() {
    loaderBar = new createjs.Container, preloaderSponsorCont = new createjs.Container;
    var e = createjs.Graphics.getRGB(46, 249, 163),
        t = new createjs.Shape;
    t.graphics.beginFill(e).drawRect(0, -maxH / 2, maxW, maxH).endFill(), loaderBar.addChild(t), loaderBar.addChild(preloaderSponsorCont), container.addChild(loaderBar), initSoundManager(), preloadQuever = new createjs.LoadQueue(!0, "assets/"), preloadQuever.addEventListener("fileload", handleFileLoad), preloadQuever.loadManifest(preloaderManifest), gameQuever = new createjs.LoadQueue(!0, "assets/"), gameQuever.installPlugin(createjs.Sound), gameQuever.addEventListener("progress", handleOverallProgress), gameQuever.addEventListener("complete", handleComplete), gameQuever.addEventListener("fileload", handleFileLoad), isNeedSplash && manifest.push({
        src: SPLASH_IMAGE_SRC,
        id: "splashimg"
    }), isLoadAnimFromJSON && manifest.push({
        src: "dropmeassets.json",
        id: "anim_json"
    }), manifest.push({
        src: HD_QUALITY_IMG_PATH,
        id: "zoespritesheet"
    }), manifest.push({
        src: "bg1.jpg",
        id: "bg_menu1"
    }), manifest.push({
        src: "bg2.jpg",
        id: "bg_menu2"
    }), manifest.push({
        src: "bg3.jpg",
        id: "bg_menu3"
    }), manifest.push({
        src: "bg5.png",
        id: "bg_menu5"
    }), manifest.push({
        src: "logo.png",
        id: "logo_menu"
    }), createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED, isDefaultAndroid() && (createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT), createjs.Ticker.setFPS(FPS), createjs.Ticker.addEventListener("tick", tick)
}

function isDefaultAndroid() {
    var e = navigator.userAgent;
    return e.indexOf("Mozilla/5.0") > -1 && e.indexOf("Android ") > -1 && e.indexOf("AppleWebKit") > -1 && !(e.indexOf("Chrome") > -1)
}

function handleOverallProgress(e) {
    if (0 != e.total) {
        var t = e.loaded / e.total;
        loaderBar && preloaderLine && setTimelinePercent(t)
    }
}

function handleFileLoad(e) {
    if ("image" == e.item.type && (images[e.item.id] = e.result), files[e.item.id] = e.result, !isPreloaderReady && files.preloaderchar && files.preloaderline && files.preloaderlinebg) {
        isPreloaderReady = !0;
        var t = document.getElementById("loader");
        if (t && t.parentNode && t.parentNode.removeChild(t), loaderBar) {
            var i = preloaderChar = createBitmapFromFile("preloaderchar", ow / 2, 182, 1, loaderBar);
            i.regY = 502, i.regX = 236, createPreloaderCharTween(i), i = createBitmapFromFile("preloaderlinebg", 0, 173, 1, loaderBar), i.x = (ow - files.preloaderlinebg.width) / 2, i = preloaderLine = createBitmapFromFile("preloaderline", 0, 180, 1, loaderBar), i.x = (ow - files.preloaderline.width) / 2, i.sourceRect = new createjs.Rectangle(0, 0, 1, 47), setTimelinePercent(0), addToParent(preloaderSponsorCont, loaderBar), gameQuever.loadManifest(manifest)
        }
    }
}

function setTimelinePercent(e) {
    e = Math.min(1, Math.max(0, e));
    var t = Math.floor(TIMELINE_FILLER_SIZE * e);
    preloaderLine.visible = e > 0, preloaderLine.sourceRect.width = Math.max(1, t)
}

function createPreloaderCharTween(e) {
    var t = createjs.Ease.sineInOut,
        i = 1.1;
    e.scaleX = .85 * i, e.scaleY = .95 * i, createjs.Tween.get(e, {
        loop: !0
    }).to({
        scaleX: .95 * i,
        scaleY: .85 * i
    }, 900, t).to({
        scaleX: .85 * i,
        scaleY: .95 * i
    }, 1300, t)
}

function moregamesClick() {
    moreGamesConfig && moreGamesConfig.action && moreGamesConfig.action()
}

function createRotationScreen() {
    var e = new createjs.Sprite(bgSS);
    e.gotoAndStop("rotateScreen"), e.x = ow / 2, e.y = oh / 2, rotationContainer.addChild(e)
}

function handleComplete() {
    isAllFilesLoaded || (isAllFilesLoaded = !0, isLogoReady = !0, (isLogoReady || isSponsorLogoError) && startGame())
}

function startGame() {
    try {
        if (isGameInited) return;
        removeFromParent(loaderBar), loaderBar = null, preloaderSpinner = null, preloaderLine = null, createjs.Tween.removeTweens(preloaderChar), preloaderChar = null, configureSpritesheets(), createRotationScreen(), createBG(), loadSaves(), initLevelManager(), initBonusManager(), initParticleManager(), isNeedFpsMeter && (fpsText = new createjs.BitmapText("1", interfaceSS), fpsText.scaleX = fpsText.scaleY = .6, fpsText.letterSpacing = -7, fpsText.x = ow - 27, container.addChild(fpsText)), initInterface(), isNeedSplash && (createSplashScreen(), startSplash()), isGameInited = !0, onGameResize(), isSkipMenus && (loadLevel(isLastLevelLoad ? allLevels.length - 1 : isDesignerSettingsPreferred ? editorLevelToLoad : autoLevelToLoad), showIngameLogo(), isAchievWinShow && showAchievWin(TEN_BONUS_ACHIEV)), stage.update(), initEditorHandlers(), initVisibilityChanger(), isGetAllProperties && getAllProperties()
    } catch (e) {
        trace(e.name + ":" + e.message)
    }
}

function createSplashScreen() {
    var e = files.splashimg,
        t = new createjs.Bitmap(e),
        i = e.width,
        n = e.height,
        s = .635;
    t.x = (ow - i * s) / 2, t.y = (oh - n * s) / 2, t.scaleX = t.scaleY = s, isSplashLinked && (t.isOnlyBoundsCheck = !0, t.setBoundingBox(-i * s / 2, -n * s / 2, i * s, n * s), t.mouseEnabled = !0, t.cursor = "pointer"), splashContainer.addChild(t)
}

function startSplash() {
    splashContainer && (splashContainer.parent || rotationContainer.parent || (removeFromParent(container), stage.addChild(splashContainer), createjs.Tween.get(splashContainer).wait(isSkipSplash ? 1 : 3e3).call(addContainer).to({
        alpha: 0
    }, isSkipSplash ? 2 : 500).call(disposeSplash), trace("splash"), stage.autoClear = !0))
}

function addContainer() {
    stage.addChildAt(container, 0)
}

function disposeSplash() {
    removeFromParent(splashContainer), splashContainer = null, stage.autoClear = !1
}

function initEditorHandlers() {
    isLevelEditor && stage.addEventListener("stagemousedown", handlePress)
}

function handlePress() {
    isLevelEditor && (KeyboardJS.isPressed("h"), KeyboardJS.isPressed("n") && loadNextLevel(), KeyboardJS.isPressed("l") && (collectedBonuses = 10, showLevelCompleteWin()), KeyboardJS.isPressed("a") && showAchievWin(HALF_GAME_ACHIEV), KeyboardJS.isPressed("u"), KeyboardJS.isPressed("r") && (isLevelFailed = !0, showRestartWin()))
}

function configureSpritesheets() {
    isLoadAnimFromJSON && (zoeCFG = eval(files.anim_json)), validateSpritesheetCFG(zoeCFG, "zoespritesheet", !0, 2), zoeSS = new createjs.SpriteSheet(zoeCFG), interfaceSS = zoeSS, bgSS = zoeSS
}

function validateSpritesheetCFG(e, t, i, n) {
    for (var s, a = images[t].width, r = images[t].height, o = e.frames, l = o.length, h = 0; l > h; h++) s = o[h], i && (s[2] = s[2] - 2 * n, s[3] = s[3] - 2 * n), s[0] + s[2] > a && (s[2] = a - s[0]), s[1] + s[3] > r && (s[3] = r - s[1]), s[0] < 0 && (s[0] = 0), s[1] < 0 && (s[1] = 0)
}

function tick(e) {
    if (!isGameInited) return preloaderSpinner && (preloaderSpinner.rotation += 15), void stage.update();
    if (isDesktop() || !isPageLeaved) {
        for (dtScale = e.delta / defaultDelta, (!dtScale || 0 >= dtScale) && (dtScale = 1), dtScale > 2 && (dtScale = 2), lastDelta = e.delta, counter++, animTicker++, levelStartTimer++; toDisposePhysicsBodies.length > 0;) {
            var t = toDisposePhysicsBodies.pop();
            destroyBody(t)
        }
        for (; toDisposeChars.length > 0;) currentChar = toDisposeChars.pop(), currentChar.dispose();
        for (; clickedChars.length > 0;) currentChar = clickedChars.pop(), currentChar.type === BOMB_TYPE ? currentChar.bombClick() : currentChar.type === FAN_TYPE ? currentChar.toggleFan() : currentChar.isGlass ? currentChar.breakGlass() : currentChar.type === CONVEYOR_TYPE ? currentChar.toggleConveyor() : currentChar.physBody && (awakeAllBodies(), currentChar.removeFromField());
        isGamePaused ? isPhysicsDebugDraw && debugDraw.draw() : (step = DEFAULT_WORLD_STEP * (dtScale > 1.2 ? 1.2 : dtScale), space.step(step / 2), space.step(step / 2), isPhysicsDebugDraw && debugDraw.draw(), currentTimeScore > 0 ? isLevelCompleted || (currentTimeScore -= 3) : currentTimeScore = 0), allBallsLen = allBalls.length, allHeroesLen = allHeroes.length, allTubesLen = allTubes.length;
        for (var i = allChars.length - 1; i >= 0; --i) allChars[i].tick();
        interfaceTick(), updateBonusManager(), updatePartManager(), updateSoundManager(), interfaceTick(), isGameCompleteScreenShow && (MAX_PARTICLES_ON_SCREEN = 30, animTicker % Math.floor(FPS / 6) == 0 && createPartExplode(Math.random() * ow, Math.random() * oh, 6, PART_STAR_TYPE, gameCompleteContainer)), isNeedFpsMeter && counter % FPS == 0 && (fpsText.text = Math.floor(createjs.Ticker.getMeasuredFPS()).toString()), counter > 30 && isNeedCacheSizeUpdate && (isNeedCacheSizeUpdate = !1, isWithCache && allBgContainer.cache(0, 0, ow + 1, oh + 1, 2));
        var n = 0;
        scoreToAdd > 0 && (n = Math.round(scoreToAdd / 7), currentLevelScore += n, scoreToAdd -= n, updateScoreLabel(currentLevelScore)), stage.update()
    }
}
var isNeedFpsMeter = !1,
    isLevelEditor = !1,
    isNeedDebugGui = !1,
    isDebugGuiOpened = !0,
    isPhysicsDebugDraw = !1,
    isSkipMenus = !1,
    autoLevelToLoad = 12,
    isLastLevelLoad = !1,
    isDisableWin = !1,
    isOpenAllLevels = !1,
    openedLevels = 40,
    isGetAllProperties = !1,
    isLoadAnimFromJSON = !1,
    isSkipSplash = !1,
    isShowLogo = !0,
    isLevelSelectShow = !1,
    isCreditsShow = !1,
    isAchievWinShow = !1,
    isAchievGalleryShow = !1,
    spriteScale = 1,
    isWithCache = !1,
    isTimerUpdateMode = !1,
    isPageLeaved = !1,
    isNeedHelperLabel = !1,
    isDesktopBrowser = !1,
    isLowGfx = !1,
    isDesignerSettingsPreferred = !0,
    STORAGE_PREFIX = "Dropme7",
    isMobileOnlyResize = !1,
    gameFieldScale = 1,
    SPONSOR_URL = "http://porubov.com",
    PRELOADER_LOGO = "logo_spele.png",
    isHidePreloaderLogo = !1,
    BALL_TYPE = 0,
    HERO_DOC_TYPE = 1,
    HERO_WOMAN_TYPE = 2,
    MONSTER_TYPE = 3,
    PUSHER_TYPE = 4,
    DECOR_BALK_1_TYPE = 21,
    DECOR_BALK_2_TYPE = 22,
    DECOR_BALK_3_TYPE = 23,
    DECOR_BALK_4_TYPE = 24,
    DECOR_BALK_5_TYPE = 25,
    DECOR_LAND_TYPE = 26,
    DECOR_HOUSE_TYPE = 27,
    DECOR_KUST_TYPE = 28,
    DECOR_ZABOR_TYPE = 29,
    DECOR_MELNICA_TYPE = 30,
    DECOR_MELNICA_ROT_TYPE = 31,
    DECOR_ARROW_TYPE = 32,
    DECOR_HOUSE_2_TYPE = 33,
    DECOR_COW_TYPE = 34,
    DECOR_CIRCUS_TYPE = 35,
    DECOR_HOUSE_3_TYPE = 36,
    DECOR_HOUSE_4_TYPE = 37,
    DECOR_BALK_6_TYPE = 38,
    DECOR_WINDOW_TYPE = 39,
    DECOR_CAT_1_TYPE = 40,
    DECOR_CAT_2_TYPE = 41,
    DECOR_GRAM_TYPE = 42,
    DECOR_PICT_1_TYPE = 43,
    DECOR_FLOWER_1_TYPE = 44,
    DECOR_VENT_TYPE = 45,
    DECOR_ELECTR_TYPE = 46,
    DECOR_DOOR_TYPE = 47,
    DECOR_PICT_2_TYPE = 48,
    DECOR_SVECHA_TYPE = 49,
    DECOR_TABLE_TYPE = 50,
    DECOR_STUL_TYPE = 51,
    DECOR_PICT_3_TYPE = 52,
    DECOR_VESHALKA_TYPE = 53,
    DECOR_VELO_TYPE = 54,
    DECOR_COVER_TYPE = 55,
    DECOR_BALK_7_TYPE = 56,
    DECOR_HELP_1_TYPE = 57,
    DECOR_OZERO_TYPE = 58,
    DECOR_MONEY_TYPE = 59,
    DECOR_GUN_TYPE = 60,
    DECOR_SETKA_TYPE = 61,
    PHYSICS_RECT_TYPE = 100,
    DYNAMIC_BOX_TYPE = 101,
    TELEPORT_TYPE = 102,
    BOMB_TYPE = 103,
    DANGER_TYPE = 104,
    PHYSICS_MAN_BLOCK_TYPE = 105,
    PHYSICS_WOMAN_BLOCK_TYPE = 106,
    GLASS_BLOCK_TYPE = 107,
    ACTIVATOR_TYPE = 108,
    DOOR_TYPE = 109,
    DYNAMIC_CIRCLE_TYPE = 110,
    DYNAMIC_RECT_TYPE = 111,
    TELEGA_TYPE = 112,
    DYNAMIC_TRIANGLE_TYPE = 113,
    MOVABLE_BALK_TYPE = 114,
    FAN_TYPE = 115,
    GLASS_BOX_TYPE = 116,
    GLASS_TRIANGLE_TYPE = 117,
    HARD_BOX_TYPE = 118,
    HARD_RECT_TYPE = 119,
    HARD_TRIANGLE_TYPE = 120,
    STATIC_BALK_1_TYPE = 121,
    LAND_TYPE = 122,
    STATIC_BOX_TYPE = 123,
    DANGER_KUST_TYPE = 124,
    STATIC_CIRCLE_TYPE = 125,
    CONVEYOR_TYPE = 126,
    ZOMBIE_TYPE = 127,
    STATIC_TUBE_1_TYPE = 128,
    STATIC_TUBE_2_TYPE = 129,
    STATIC_TUBE_3_TYPE = 130,
    HERO_1_TYPE = 131,
    HERO_2_TYPE = 132,
    HERO_3_TYPE = 133,
    BAD_1_TYPE = 134,
    BAD_2_TYPE = 135,
    BONUS_DIAMOND_TYPE = 201,
    BONUS_MONEY_TYPE = 202,
    BONUS_STAR_TYPE = 203,
    BONUS_GHOST_TYPE = 204,
    BONUS_DANGER_KUST_TYPE = 205,
    BONUS_KAKTUS_TYPE = 206,
    BONUS_HOLE_TYPE = 207,
    BONUS_DANGER_ACTIV_TYPE = 208,
    AIM_TYPE = 301,
    STATIC_CATEGORY = 1,
    WOMAN_CATEGORY = 2,
    MAN_CATEGORY = 4,
    WOMAN_BLOCK_CATEGORY = 8,
    MAN_BLOCK_CATEGORY = 16,
    FAN_ACTIV_DISTANCE = 130,
    FAN_MAX_FORCE = 40,
    GLASS_BREAK_VELOCITY = 450,
    TELEPORT_OUT_STRENGHT = 100,
    LOW_QUALITY_IMG_PATH = "dropmeassets.png",
    HD_QUALITY_IMG_PATH = "dropmeassets.png",
    WORLD_GRAVITY = 2e3,
    isNeedLogo = !0,
    isLogoLinked = !0,
    isNeedMoreGames = !1,
    isNeedSplash = !1,
    isSplashLinked = !1,
    SPLASH_IMAGE_SRC = "splash.jpg",
    isNeedCreditsWin = !0,
    isFGLVersion = !1,
    isNeedScore = !1;
this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype;
        t.type = null, t.target = null, t.currentTarget = null, t.eventPhase = 0, t.bubbles = !1, t.cancelable = !1, t.timeStamp = 0, t.defaultPrevented = !1, t.propagationStopped = !1, t.immediatePropagationStopped = !1, t.removed = !1, t.initialize = function(e, t, i) {
            this.type = e, this.bubbles = t, this.cancelable = i, this.timeStamp = (new Date).getTime()
        }, t.preventDefault = function() {
            this.defaultPrevented = !0
        }, t.stopPropagation = function() {
            this.propagationStopped = !0
        }, t.stopImmediatePropagation = function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        }, t.remove = function() {
            this.removed = !0
        }, t.clone = function() {
            return new e(this.type, this.bubbles, this.cancelable)
        }, t.toString = function() {
            return "[Event (type=" + this.type + ")]"
        }, createjs.Event = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {},
            t = e.prototype;
        e.initialize = function(e) {
            e.addEventListener = t.addEventListener, e.on = t.on, e.removeEventListener = e.off = t.removeEventListener, e.removeAllEventListeners = t.removeAllEventListeners, e.hasEventListener = t.hasEventListener, e.dispatchEvent = t.dispatchEvent, e._dispatchEvent = t._dispatchEvent
        }, t._listeners = null, t._captureListeners = null, t.initialize = function() {}, t.addEventListener = function(e, t, i) {
            var n;
            n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
            var s = n[e];
            return s && this.removeEventListener(e, t, i), s = n[e], s ? s.push(t) : n[e] = [t], t
        }, t.on = function(e, t, i, n, s, a) {
            return t.handleEvent && (i = i || t, t = t.handleEvent), i = i || this, this.addEventListener(e, function(e) {
                t.call(i, e, s), n && e.remove()
            }, a)
        }, t.removeEventListener = function(e, t, i) {
            var n = i ? this._captureListeners : this._listeners;
            if (n) {
                var s = n[e];
                if (s)
                    for (var a = 0, r = s.length; r > a; a++)
                        if (s[a] == t) {
                            1 == r ? delete n[e] : s.splice(a, 1);
                            break
                        }
            }
        }, t.off = t.removeEventListener, t.removeAllEventListeners = function(e) {
            e ? (this._listeners && delete this._listeners[e], this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
        }, t.dispatchEvent = function(e, t) {
            if ("string" == typeof e) {
                var i = this._listeners;
                if (!i || !i[e]) return !1;
                e = new createjs.Event(e)
            }
            if (e.target = t || this, e.bubbles && this.parent) {
                for (var n = this, s = [n]; n.parent;) s.push(n = n.parent);
                var a, r = s.length;
                for (a = r - 1; a >= 0 && !e.propagationStopped; a--) s[a]._dispatchEvent(e, 1 + (0 == a));
                for (a = 1; r > a && !e.propagationStopped; a++) s[a]._dispatchEvent(e, 3)
            } else this._dispatchEvent(e, 2);
            return e.defaultPrevented
        }, t.hasEventListener = function(e) {
            var t = this._listeners,
                i = this._captureListeners;
            return !!(t && t[e] || i && i[e])
        }, t.toString = function() {
            return "[EventDispatcher]"
        }, t._dispatchEvent = function(e, t) {
            var i, n = 1 == t ? this._captureListeners : this._listeners;
            if (e && n) {
                var s = n[e.type];
                if (!s || !(i = s.length)) return;
                e.currentTarget = this, e.eventPhase = t, e.removed = !1, s = s.slice();
                for (var a = 0; i > a && !e.immediatePropagationStopped; a++) {
                    var r = s[a];
                    r.handleEvent ? r.handleEvent(e) : r(e), e.removed && (this.off(e.type, r, 1 == t), e.removed = !1)
                }
            }
        }, createjs.EventDispatcher = e
    }(), this.createjs = this.createjs || {},
    function() {
        createjs.indexOf = function(e, t) {
            for (var i = 0, n = e.length; n > i; i++)
                if (t === e[i]) return i;
            return -1
        }
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
            throw "UID cannot be instantiated"
        };
        e._nextID = 0, e.get = function() {
            return e._nextID++
        }, createjs.UID = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
            throw "Ticker cannot be instantiated."
        };
        e.RAF_SYNCHED = "synched", e.RAF = "raf", e.TIMEOUT = "timeout", e.useRAF = !1, e.timingMode = null, e.maxDelta = 60, e.removeEventListener = null, e.removeAllEventListeners = null, e.dispatchEvent = null, e.hasEventListener = null, e._listeners = null, createjs.EventDispatcher.initialize(e), e._addEventListener = e.addEventListener, e.addEventListener = function() {
            return !e._inited && e.init(), e._addEventListener.apply(e, arguments)
        }, e._paused = !1, e._inited = !1, e._startTime = 0, e._pausedTime = 0, e._ticks = 0, e._pausedTicks = 0, e._interval = 50, e._lastTime = 0, e._times = [], e._tickTimes = [], e._timerId = null, e._raf = !0, e._isFirstInit = !0, e.init = function() {
            e._inited || (e._timerId = null, e._inited = !0, e._isFirstInit = !1, e._times = [], e._tickTimes = [], e._startTime = e._getTime(), e._times.push(e._lastTime = 0), e.setInterval(e._interval))
        }, e.reset = function() {
            if (e._inited = !1, e._raf) {
                var t = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
                t && t(e._timerId)
            } else clearTimeout(e._timerId)
        }, e.setInterval = function(t) {
            e._interval = t, e._inited && e._setupTick()
        }, e.getInterval = function() {
            return e._interval
        }, e.setFPS = function(t) {
            e.setInterval(1e3 / t)
        }, e.getFPS = function() {
            return 1e3 / e._interval
        }, e.getMeasuredTickTime = function(t) {
            var i = 0,
                n = e._tickTimes;
            if (n.length < 1) return -1;
            t = Math.min(n.length, t || 0 | e.getFPS());
            for (var s = 0; t > s; s++) i += n[s];
            return i / t
        }, e.getMeasuredFPS = function(t) {
            var i = e._times;
            return i.length < 2 ? -1 : (t = Math.min(i.length - 1, t || 0 | e.getFPS()), 1e3 / ((i[0] - i[t]) / t))
        }, e.setPaused = function(t) {
            e._paused = t
        }, e.getPaused = function() {
            return e._paused
        }, e.getTime = function(t) {
            return e._getTime() - e._startTime - (t ? e._pausedTime : 0)
        }, e.getEventTime = function(t) {
            return (e._lastTime || e._startTime) - (t ? e._pausedTime : 0)
        }, e.getTicks = function(t) {
            return e._ticks - (t ? e._pausedTicks : 0)
        }, e._handleSynch = function() {
            var t = e._getTime() - e._startTime;
            e._timerId = null, e._setupTick(), t - e._lastTime >= .97 * (e._interval - 1) && e._tick()
        }, e._handleRAF = function() {
            e._timerId = null, e._setupTick(), e._tick()
        }, e._handleTimeout = function() {
            e._timerId = null, e._setupTick(), e._tick()
        }, e._setupTick = function() {
            if (null != e._timerId) return void trace("duplicate");
            var t = e.timingMode || e.useRAF && e.RAF_SYNCHED;
            if (t == e.RAF_SYNCHED || t == e.RAF) {
                var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (i) return e._timerId = i(t == e.RAF ? e._handleRAF : e._handleSynch), void(e._raf = !0)
            }
            e._raf = !1, e._timerId = setTimeout(e._handleTimeout, e._interval)
        }, e._tick = function() {
            var t = e._getTime() - e._startTime,
                i = t - e._lastTime,
                n = e._paused;
            if (e._ticks++, n && (e._pausedTicks++, e._pausedTime += i), e._lastTime = t, e.hasEventListener("tick")) {
                var s = new createjs.Event("tick"),
                    a = e.maxDelta;
                s.delta = a && i > a ? a : i, s.paused = n, s.time = t, s.runTime = t - e._pausedTime, e.dispatchEvent(s)
            }
            for (e._tickTimes.unshift(e._getTime() - t); e._tickTimes.length > 100;) e._tickTimes.pop();
            for (e._times.unshift(t); e._times.length > 100;) e._times.pop()
        };
        var t = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
        e._getTime = function() {
            return t && t.call(performance) || (new Date).getTime()
        }, createjs.Ticker = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n, s, a, r, o, l, h) {
                this.initialize(e, t, i, n, s, a, r, o, l, h)
            },
            t = e.prototype = new createjs.Event;
        t.stageX = 0, t.stageY = 0, t.rawX = 0, t.rawY = 0, t.nativeEvent = null, t.pointerID = 0, t.primary = !1, t.addEventListener = null, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, createjs.EventDispatcher.initialize(t), t.Event_initialize = t.initialize, t.initialize = function(e, t, i, n, s, a, r, o, l, h) {
            this.Event_initialize(e, t, i), this.stageX = n, this.stageY = s, this.nativeEvent = a, this.pointerID = r, this.primary = o, this.rawX = null == l ? n : l, this.rawY = null == h ? s : h
        }, t.clone = function() {
            return new e(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
        }, t.toString = function() {
            return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
        }, createjs.MouseEvent = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n, s, a) {
                this.initialize(e, t, i, n, s, a)
            },
            t = e.prototype;
        e.identity = null, e.DEG_TO_RAD = Math.PI / 180, t.a = 1, t.b = 0, t.c = 0, t.d = 1, t.tx = 0, t.ty = 0, t.alpha = 1, t.shadow = null, t.compositeOperation = null, t.initialize = function(e, t, i, n, s, a) {
            return this.a = null == e ? 1 : e, this.b = t || 0, this.c = i || 0, this.d = null == n ? 1 : n, this.tx = s || 0, this.ty = a || 0, this
        }, t.prepend = function(e, t, i, n, s, a) {
            var r = this.tx;
            if (1 != e || 0 != t || 0 != i || 1 != n) {
                var o = this.a,
                    l = this.c;
                this.a = o * e + this.b * i, this.b = o * t + this.b * n, this.c = l * e + this.d * i, this.d = l * t + this.d * n
            }
            return this.tx = r * e + this.ty * i + s, this.ty = r * t + this.ty * n + a, this
        }, t.append = function(e, t, i, n, s, a) {
            var r = this.a,
                o = this.b,
                l = this.c,
                h = this.d;
            return this.a = e * r + t * l, this.b = e * o + t * h, this.c = i * r + n * l, this.d = i * o + n * h, this.tx = s * r + a * l + this.tx, this.ty = s * o + a * h + this.ty, this
        }, t.prependMatrix = function(e) {
            return this.prepend(e.a, e.b, e.c, e.d, e.tx, e.ty), this.prependProperties(e.alpha, e.shadow, e.compositeOperation), this
        }, t.appendMatrix = function(e) {
            return this.append(e.a, e.b, e.c, e.d, e.tx, e.ty), this.appendProperties(e.alpha, e.shadow, e.compositeOperation), this
        }, t.prependTransform = function(t, i, n, s, a, r, o, l, h) {
            if (a % 360) var c = a * e.DEG_TO_RAD,
                u = Math.cos(c),
                d = Math.sin(c);
            else u = 1, d = 0;
            return (l || h) && (this.tx -= l, this.ty -= h), r || o ? (r *= e.DEG_TO_RAD, o *= e.DEG_TO_RAD, this.prepend(u * n, d * n, -d * s, u * s, 0, 0), this.prepend(Math.cos(o), Math.sin(o), -Math.sin(r), Math.cos(r), t, i)) : this.prepend(u * n, d * n, -d * s, u * s, t, i), this
        }, t.appendTransform = function(t, i, n, s, a, r, o, l, h) {
            if (a % 360) var c = a * e.DEG_TO_RAD,
                u = Math.cos(c),
                d = Math.sin(c);
            else u = 1, d = 0;
            return r || o ? (r *= e.DEG_TO_RAD, o *= e.DEG_TO_RAD, this.append(Math.cos(o), Math.sin(o), -Math.sin(r), Math.cos(r), t, i), this.append(u * n, d * n, -d * s, u * s, 0, 0)) : this.append(u * n, d * n, -d * s, u * s, t, i), (l || h) && (this.tx -= l * this.a + h * this.c, this.ty -= l * this.b + h * this.d), this
        }, t.rotate = function(e) {
            var t = Math.cos(e),
                i = Math.sin(e),
                n = this.a,
                s = this.c,
                a = this.tx;
            return this.a = n * t - this.b * i, this.b = n * i + this.b * t, this.c = s * t - this.d * i, this.d = s * i + this.d * t, this.tx = a * t - this.ty * i, this.ty = a * i + this.ty * t, this
        }, t.skew = function(t, i) {
            return t *= e.DEG_TO_RAD, i *= e.DEG_TO_RAD, this.append(Math.cos(i), Math.sin(i), -Math.sin(t), Math.cos(t), 0, 0), this
        }, t.scale = function(e, t) {
            return this.a *= e, this.d *= t, this.c *= e, this.b *= t, this.tx *= e, this.ty *= t, this
        }, t.translate = function(e, t) {
            return this.tx += e, this.ty += t, this
        }, t.identity = function() {
            return this.alpha = this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this.shadow = this.compositeOperation = null, this
        }, t.invert = function() {
            var e = this.a,
                t = this.b,
                i = this.c,
                n = this.d,
                s = this.tx,
                a = e * n - t * i;
            return this.a = n / a, this.b = -t / a, this.c = -i / a, this.d = e / a, this.tx = (i * this.ty - n * s) / a, this.ty = -(e * this.ty - t * s) / a, this
        }, t.isIdentity = function() {
            return 0 == this.tx && 0 == this.ty && 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d
        }, t.transformPoint = function(e, t, i) {
            return i = i || {}, i.x = e * this.a + t * this.c + this.tx, i.y = e * this.b + t * this.d + this.ty, i
        }, t.decompose = function(t) {
            null == t && (t = {}), t.x = this.tx, t.y = this.ty, t.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), t.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
            var i = Math.atan2(-this.c, this.d),
                n = Math.atan2(this.b, this.a);
            return i == n ? (t.rotation = n / e.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (t.rotation += t.rotation <= 0 ? 180 : -180), t.skewX = t.skewY = 0) : (t.skewX = i / e.DEG_TO_RAD, t.skewY = n / e.DEG_TO_RAD), t
        }, t.reinitialize = function(e, t, i, n, s, a, r, o, l) {
            return this.initialize(e, t, i, n, s, a), this.alpha = null == r ? 1 : r, this.shadow = o, this.compositeOperation = l, this
        }, t.copy = function(e) {
            return this.reinitialize(e.a, e.b, e.c, e.d, e.tx, e.ty, e.alpha, e.shadow, e.compositeOperation)
        }, t.appendProperties = function(e, t, i) {
            return this.alpha *= e, this.shadow = t || this.shadow, this.compositeOperation = i || this.compositeOperation, this
        }, t.prependProperties = function(e, t, i) {
            return this.alpha *= e, this.shadow = this.shadow || t, this.compositeOperation = this.compositeOperation || i, this
        }, t.clone = function() {
            return (new e).copy(this)
        }, t.toString = function() {
            return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
        }, e.identity = new e, createjs.Matrix2D = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t) {
                this.initialize(e, t)
            },
            t = e.prototype;
        t.x = 0, t.y = 0, t.initialize = function(e, t) {
            return this.x = null == e ? 0 : e, this.y = null == t ? 0 : t, this
        }, t.copy = function(e) {
            return this.initialize(e.x, e.y)
        }, t.clone = function() {
            return new e(this.x, this.y)
        }, t.toString = function() {
            return "[Point (x=" + this.x + " y=" + this.y + ")]"
        }, createjs.Point = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n) {
                this.initialize(e, t, i, n)
            },
            t = e.prototype;
        t.x = 0, t.y = 0, t.width = 0, t.height = 0, t.initialize = function(e, t, i, n) {
            return this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = n || 0, this
        }, t.copy = function(e) {
            return this.initialize(e.x, e.y, e.width, e.height)
        }, t.clone = function() {
            return new e(this.x, this.y, this.width, this.height)
        }, t.toString = function() {
            return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
        }, createjs.Rectangle = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n, s, a, r) {
                this.initialize(e, t, i, n, s, a, r)
            },
            t = e.prototype;
        t.target = null, t.overLabel = null, t.outLabel = null, t.downLabel = null, t.play = !1, t._isPressed = !1, t._isOver = !1, t.initialize = function(e, t, i, n, s, a, r) {
            e.addEventListener && (this.target = e, e.cursor = "pointer", this.overLabel = null == i ? "over" : i, this.outLabel = null == t ? "out" : t, this.downLabel = null == n ? "down" : n, this.play = s, this.setEnabled(!0), this.handleEvent({}), a && (r && (a.actionsEnabled = !1, a.gotoAndStop && a.gotoAndStop(r)), e.hitArea = a))
        }, t.setEnabled = function(e) {
            var t = this.target;
            e ? (t.addEventListener("rollover", this), t.addEventListener("rollout", this), t.addEventListener("mousedown", this), t.addEventListener("pressup", this)) : (t.removeEventListener("rollover", this), t.removeEventListener("rollout", this), t.removeEventListener("mousedown", this), t.removeEventListener("pressup", this))
        }, t.toString = function() {
            return "[ButtonHelper]"
        }, t.handleEvent = function(e) {
            var t, i = this.target,
                n = e.type;
            "mousedown" == n ? (this._isPressed = !0, t = this.downLabel) : "pressup" == n ? (this._isPressed = !1, t = this._isOver ? this.overLabel : this.outLabel) : "rollover" == n ? (this._isOver = !0, t = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, t = this._isPressed ? this.overLabel : this.outLabel), this.play ? i.gotoAndPlay && i.gotoAndPlay(t) : i.gotoAndStop && i.gotoAndStop(t)
        }, createjs.ButtonHelper = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n) {
                this.initialize(e, t, i, n)
            },
            t = e.prototype;
        e.identity = null, t.color = null, t.offsetX = 0, t.offsetY = 0, t.blur = 0, t.initialize = function(e, t, i, n) {
            this.color = e, this.offsetX = t, this.offsetY = i, this.blur = n
        }, t.toString = function() {
            return "[Shadow]"
        }, t.clone = function() {
            return new e(this.color, this.offsetX, this.offsetY, this.blur)
        }, e.identity = new e("transparent", 0, 0, 0), createjs.Shadow = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.EventDispatcher;
        t.complete = !0, t.framerate = 0, t._animations = null, t._frames = null, t._images = null, t._data = null, t._loadCount = 0, t._frameHeight = 0, t._frameWidth = 0, t._numFrames = 0, t._regX = 0, t._regY = 0, t.initialize = function(e) {
            var t, i, n, s;
            if (null != e) {
                if (this.framerate = e.framerate || 0, e.images && (i = e.images.length) > 0)
                    for (s = this._images = [], t = 0; i > t; t++) {
                        var a = e.images[t];
                        if ("string" == typeof a) {
                            var r = a;
                            a = document.createElement("img"), a.src = "assets/dropmeassets.png" == r ? window.famobi.__(r) : r
                        }
                        s.push(a), a.getContext || a.complete || (this._loadCount++, this.complete = !1, function(e) {
                            a.onload = function() {
                                e._handleImageLoad()
                            }
                        }(this))
                    }
                if (null == e.frames);
                else if (e.frames instanceof Array)
                    for (this._frames = [], s = e.frames, t = 0, i = s.length; i > t; t++) {
                        var o = s[t];
                        this._frames.push({
                            image: this._images[o[4] ? o[4] : 0],
                            rect: new createjs.Rectangle(o[0], o[1], o[2], o[3]),
                            regX: o[5] || 0,
                            regY: o[6] || 0
                        })
                    } else n = e.frames, this._frameWidth = n.width, this._frameHeight = n.height, this._regX = n.regX || 0, this._regY = n.regY || 0, this._numFrames = n.count, 0 == this._loadCount && this._calculateFrames();
                if (this._animations = [], null != (n = e.animations)) {
                    this._data = {};
                    var l;
                    for (l in n) {
                        var h = {
                                name: l
                            },
                            c = n[l];
                        if ("number" == typeof c) s = h.frames = [c];
                        else if (c instanceof Array)
                            if (1 == c.length) h.frames = [c[0]];
                            else
                                for (h.speed = c[3], h.next = c[2], s = h.frames = [], t = c[0]; t <= c[1]; t++) s.push(t);
                        else {
                            h.speed = c.speed, h.next = c.next;
                            var u = c.frames;
                            s = h.frames = "number" == typeof u ? [u] : u.slice(0)
                        }(h.next === !0 || void 0 === h.next) && (h.next = l), (h.next === !1 || s.length < 2 && h.next == l) && (h.next = null), h.speed || (h.speed = 1), this._animations.push(l), this._data[l] = h
                    }
                }
            }
        }, t.getNumFrames = function(e) {
            if (null == e) return this._frames ? this._frames.length : this._numFrames;
            var t = this._data[e];
            return null == t ? 0 : t.frames.length
        }, t.getAnimations = function() {
            return this._animations.slice(0)
        }, t.getAnimation = function(e) {
            return this._data[e]
        }, t.getFrame = function(e) {
            var t;
            return this._frames && (t = this._frames[e]) ? t : null
        }, t.getFrameBounds = function(e, t) {
            var i = this.getFrame(e);
            return i ? (t || new createjs.Rectangle).initialize(-i.regX, -i.regY, i.rect.width, i.rect.height) : null
        }, t.toString = function() {
            return "[SpriteSheet]"
        }, t.clone = function() {
            var t = new e;
            return t.complete = this.complete, t._animations = this._animations, t._frames = this._frames, t._images = this._images, t._data = this._data, t._frameHeight = this._frameHeight, t._frameWidth = this._frameWidth, t._numFrames = this._numFrames, t._loadCount = this._loadCount, t
        }, t._handleImageLoad = function() {
            0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete"))
        }, t._calculateFrames = function() {
            if (!this._frames && 0 != this._frameWidth) {
                this._frames = [];
                for (var e = 0, t = this._frameWidth, i = this._frameHeight, n = 0, s = this._images; n < s.length; n++) {
                    for (var a = s[n], r = (a.width + 1) / t | 0, o = (a.height + 1) / i | 0, l = this._numFrames > 0 ? Math.min(this._numFrames - e, r * o) : r * o, h = 0; l > h; h++) this._frames.push({
                        image: a,
                        rect: new createjs.Rectangle(h % r * t, (h / r | 0) * i, t, i),
                        regX: this._regX,
                        regY: this._regY
                    });
                    e += l
                }
                this._numFrames = e
            }
        }, createjs.SpriteSheet = e
    }(), this.createjs = this.createjs || {},
    function() {
        function e(e, t, i) {
            this.f = e, this.params = t, this.path = null == i ? !0 : i
        }
        e.prototype.exec = function(e) {
            this.f.apply(e, this.params)
        };
        var t = function() {
                this.initialize()
            },
            i = t.prototype;
        t.getRGB = function(e, t, i, n) {
            return null != e && null == i && (n = t, i = 255 & e, t = e >> 8 & 255, e = e >> 16 & 255), null == n ? "rgb(" + e + "," + t + "," + i + ")" : "rgba(" + e + "," + t + "," + i + "," + n + ")"
        }, t.getHSL = function(e, t, i, n) {
            return null == n ? "hsl(" + e % 360 + "," + t + "%," + i + "%)" : "hsla(" + e % 360 + "," + t + "%," + i + "%," + n + ")"
        }, t.Command = e, t.BASE_64 = {
            A: 0,
            B: 1,
            C: 2,
            D: 3,
            E: 4,
            F: 5,
            G: 6,
            H: 7,
            I: 8,
            J: 9,
            K: 10,
            L: 11,
            M: 12,
            N: 13,
            O: 14,
            P: 15,
            Q: 16,
            R: 17,
            S: 18,
            T: 19,
            U: 20,
            V: 21,
            W: 22,
            X: 23,
            Y: 24,
            Z: 25,
            a: 26,
            b: 27,
            c: 28,
            d: 29,
            e: 30,
            f: 31,
            g: 32,
            h: 33,
            i: 34,
            j: 35,
            k: 36,
            l: 37,
            m: 38,
            n: 39,
            o: 40,
            p: 41,
            q: 42,
            r: 43,
            s: 44,
            t: 45,
            u: 46,
            v: 47,
            w: 48,
            x: 49,
            y: 50,
            z: 51,
            0: 52,
            1: 53,
            2: 54,
            3: 55,
            4: 56,
            5: 57,
            6: 58,
            7: 59,
            8: 60,
            9: 61,
            "+": 62,
            "/": 63
        }, t.STROKE_CAPS_MAP = ["butt", "round", "square"], t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
        var n = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        if (n.getContext) {
            var s = t._ctx = n.getContext("2d");
            t.beginCmd = new e(s.beginPath, [], !1), t.fillCmd = new e(s.fill, [], !1), t.strokeCmd = new e(s.stroke, [], !1), n.width = n.height = 1
        }
        i._strokeInstructions = null, i._strokeStyleInstructions = null, i._strokeIgnoreScale = !1, i._fillInstructions = null, i._fillMatrix = null, i._instructions = null, i._oldInstructions = null, i._activeInstructions = null, i._active = !1, i._dirty = !1, i.initialize = function() {
            this.clear(), this._ctx = t._ctx
        }, i.isEmpty = function() {
            return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length)
        }, i.draw = function(e) {
            this._dirty && this._updateInstructions();
            for (var t = this._instructions, i = 0, n = t.length; n > i; i++) t[i].exec(e)
        }, i.drawAsPath = function(e) {
            this._dirty && this._updateInstructions();
            for (var t, i = this._instructions, n = 0, s = i.length; s > n; n++)((t = i[n]).path || 0 == n) && t.exec(e)
        }, i.moveTo = function(t, i) {
            return this._activeInstructions.push(new e(this._ctx.moveTo, [t, i])), this
        }, i.lineTo = function(t, i) {
            return this._dirty = this._active = !0, this._activeInstructions.push(new e(this._ctx.lineTo, [t, i])), this
        }, i.arcTo = function(t, i, n, s, a) {
            return this._dirty = this._active = !0, this._activeInstructions.push(new e(this._ctx.arcTo, [t, i, n, s, a])), this
        }, i.arc = function(t, i, n, s, a, r) {
            return this._dirty = this._active = !0, null == r && (r = !1), this._activeInstructions.push(new e(this._ctx.arc, [t, i, n, s, a, r])), this
        }, i.quadraticCurveTo = function(t, i, n, s) {
            return this._dirty = this._active = !0, this._activeInstructions.push(new e(this._ctx.quadraticCurveTo, [t, i, n, s])), this
        }, i.bezierCurveTo = function(t, i, n, s, a, r) {
            return this._dirty = this._active = !0, this._activeInstructions.push(new e(this._ctx.bezierCurveTo, [t, i, n, s, a, r])), this
        }, i.rect = function(t, i, n, s) {
            return this._dirty = this._active = !0, this._activeInstructions.push(new e(this._ctx.rect, [t, i, n, s])), this
        }, i.closePath = function() {
            return this._active && (this._dirty = !0, this._activeInstructions.push(new e(this._ctx.closePath, []))), this
        }, i.clear = function() {
            return this._instructions = [], this._oldInstructions = [], this._activeInstructions = [], this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = this._fillMatrix = null, this._active = this._dirty = this._strokeIgnoreScale = !1, this
        }, i.beginFill = function(t) {
            return this._active && this._newPath(), this._fillInstructions = t ? [new e(this._setProp, ["fillStyle", t], !1)] : null, this._fillMatrix = null, this
        }, i.beginLinearGradientFill = function(t, i, n, s, a, r) {
            this._active && this._newPath();
            for (var o = this._ctx.createLinearGradient(n, s, a, r), l = 0, h = t.length; h > l; l++) o.addColorStop(i[l], t[l]);
            return this._fillInstructions = [new e(this._setProp, ["fillStyle", o], !1)], this._fillMatrix = null, this
        }, i.beginRadialGradientFill = function(t, i, n, s, a, r, o, l) {
            this._active && this._newPath();
            for (var h = this._ctx.createRadialGradient(n, s, a, r, o, l), c = 0, u = t.length; u > c; c++) h.addColorStop(i[c], t[c]);
            return this._fillInstructions = [new e(this._setProp, ["fillStyle", h], !1)], this._fillMatrix = null, this
        }, i.beginBitmapFill = function(t, i, n) {
            this._active && this._newPath(), i = i || "";
            var s = this._ctx.createPattern(t, i);
            return this._fillInstructions = [new e(this._setProp, ["fillStyle", s], !1)], this._fillMatrix = n ? [n.a, n.b, n.c, n.d, n.tx, n.ty] : null, this
        }, i.endFill = function() {
            return this.beginFill()
        }, i.setStrokeStyle = function(i, n, s, a, r) {
            return this._active && this._newPath(), this._strokeStyleInstructions = [new e(this._setProp, ["lineWidth", null == i ? "1" : i], !1), new e(this._setProp, ["lineCap", null == n ? "butt" : isNaN(n) ? n : t.STROKE_CAPS_MAP[n]], !1), new e(this._setProp, ["lineJoin", null == s ? "miter" : isNaN(s) ? s : t.STROKE_JOINTS_MAP[s]], !1), new e(this._setProp, ["miterLimit", null == a ? "10" : a], !1)], this._strokeIgnoreScale = r, this
        }, i.beginStroke = function(t) {
            return this._active && this._newPath(), this._strokeInstructions = t ? [new e(this._setProp, ["strokeStyle", t], !1)] : null, this
        }, i.beginLinearGradientStroke = function(t, i, n, s, a, r) {
            this._active && this._newPath();
            for (var o = this._ctx.createLinearGradient(n, s, a, r), l = 0, h = t.length; h > l; l++) o.addColorStop(i[l], t[l]);
            return this._strokeInstructions = [new e(this._setProp, ["strokeStyle", o], !1)], this
        }, i.beginRadialGradientStroke = function(t, i, n, s, a, r, o, l) {
            this._active && this._newPath();
            for (var h = this._ctx.createRadialGradient(n, s, a, r, o, l), c = 0, u = t.length; u > c; c++) h.addColorStop(i[c], t[c]);
            return this._strokeInstructions = [new e(this._setProp, ["strokeStyle", h], !1)], this
        }, i.beginBitmapStroke = function(t, i) {
            this._active && this._newPath(), i = i || "";
            var n = this._ctx.createPattern(t, i);
            return this._strokeInstructions = [new e(this._setProp, ["strokeStyle", n], !1)], this
        }, i.endStroke = function() {
            return this.beginStroke(), this
        }, i.curveTo = i.quadraticCurveTo, i.drawRect = i.rect, i.drawRoundRect = function(e, t, i, n, s) {
            return this.drawRoundRectComplex(e, t, i, n, s, s, s, s), this
        }, i.drawRoundRectComplex = function(t, i, n, s, a, r, o, l) {
            var h = (s > n ? n : s) / 2,
                c = 0,
                u = 0,
                d = 0,
                p = 0;
            0 > a && (a *= c = -1), a > h && (a = h), 0 > r && (r *= u = -1), r > h && (r = h), 0 > o && (o *= d = -1), o > h && (o = h), 0 > l && (l *= p = -1), l > h && (l = h), this._dirty = this._active = !0;
            var _ = this._ctx.arcTo,
                v = this._ctx.lineTo;
            return this._activeInstructions.push(new e(this._ctx.moveTo, [t + n - r, i]), new e(_, [t + n + r * u, i - r * u, t + n, i + r, r]), new e(v, [t + n, i + s - o]), new e(_, [t + n + o * d, i + s + o * d, t + n - o, i + s, o]), new e(v, [t + l, i + s]), new e(_, [t - l * p, i + s + l * p, t, i + s - l, l]), new e(v, [t, i + a]), new e(_, [t - a * c, i - a * c, t + a, i, a]), new e(this._ctx.closePath)), this
        }, i.drawCircle = function(e, t, i) {
            return this.arc(e, t, i, 0, 2 * Math.PI), this
        }, i.drawEllipse = function(t, i, n, s) {
            this._dirty = this._active = !0;
            var a = .5522848,
                r = n / 2 * a,
                o = s / 2 * a,
                l = t + n,
                h = i + s,
                c = t + n / 2,
                u = i + s / 2;
            return this._activeInstructions.push(new e(this._ctx.moveTo, [t, u]), new e(this._ctx.bezierCurveTo, [t, u - o, c - r, i, c, i]), new e(this._ctx.bezierCurveTo, [c + r, i, l, u - o, l, u]), new e(this._ctx.bezierCurveTo, [l, u + o, c + r, h, c, h]), new e(this._ctx.bezierCurveTo, [c - r, h, t, u + o, t, u])), this
        }, i.inject = function(t, i) {
            return this._dirty = this._active = !0, this._activeInstructions.push(new e(t, [i])), this
        }, i.drawPolyStar = function(t, i, n, s, a, r) {
            this._dirty = this._active = !0, null == a && (a = 0), a = 1 - a, null == r ? r = 0 : r /= 180 / Math.PI;
            var o = Math.PI / s;
            this._activeInstructions.push(new e(this._ctx.moveTo, [t + Math.cos(r) * n, i + Math.sin(r) * n]));
            for (var l = 0; s > l; l++) r += o, 1 != a && this._activeInstructions.push(new e(this._ctx.lineTo, [t + Math.cos(r) * n * a, i + Math.sin(r) * n * a])), r += o, this._activeInstructions.push(new e(this._ctx.lineTo, [t + Math.cos(r) * n, i + Math.sin(r) * n]));
            return this
        }, i.decodePath = function(e) {
            for (var i = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], n = [2, 2, 4, 6, 0], s = 0, a = e.length, r = [], o = 0, l = 0, h = t.BASE_64; a > s;) {
                var c = e.charAt(s),
                    u = h[c],
                    d = u >> 3,
                    p = i[d];
                if (!p || 3 & u) throw "bad path data (@" + s + "): " + c;
                var _ = n[d];
                d || (o = l = 0), r.length = 0, s++;
                for (var v = (u >> 2 & 1) + 2, f = 0; _ > f; f++) {
                    var m = h[e.charAt(s)],
                        T = m >> 5 ? -1 : 1;
                    m = (31 & m) << 6 | h[e.charAt(s + 1)], 3 == v && (m = m << 6 | h[e.charAt(s + 2)]), m = T * m / 10, f % 2 ? o = m += o : l = m += l, r[f] = m, s += v
                }
                p.apply(this, r)
            }
            return this
        }, i.clone = function() {
            var e = new t;
            return e._instructions = this._instructions.slice(), e._activeInstructions = this._activeInstructions.slice(), e._oldInstructions = this._oldInstructions.slice(), this._fillInstructions && (e._fillInstructions = this._fillInstructions.slice()), this._strokeInstructions && (e._strokeInstructions = this._strokeInstructions.slice()), this._strokeStyleInstructions && (e._strokeStyleInstructions = this._strokeStyleInstructions.slice()), e._active = this._active, e._dirty = this._dirty, e._fillMatrix = this._fillMatrix, e._strokeIgnoreScale = this._strokeIgnoreScale, e
        }, i.toString = function() {
            return "[Graphics]"
        }, i.mt = i.moveTo, i.lt = i.lineTo, i.at = i.arcTo, i.bt = i.bezierCurveTo, i.qt = i.quadraticCurveTo, i.a = i.arc, i.r = i.rect, i.cp = i.closePath, i.c = i.clear, i.f = i.beginFill, i.lf = i.beginLinearGradientFill, i.rf = i.beginRadialGradientFill, i.bf = i.beginBitmapFill, i.ef = i.endFill, i.ss = i.setStrokeStyle, i.s = i.beginStroke, i.ls = i.beginLinearGradientStroke, i.rs = i.beginRadialGradientStroke, i.bs = i.beginBitmapStroke, i.es = i.endStroke, i.dr = i.drawRect, i.rr = i.drawRoundRect, i.rc = i.drawRoundRectComplex, i.dc = i.drawCircle, i.de = i.drawEllipse, i.dp = i.drawPolyStar, i.p = i.decodePath, i._updateInstructions = function() {
            this._instructions = this._oldInstructions.slice(), this._instructions.push(t.beginCmd), this._appendInstructions(this._fillInstructions), this._appendInstructions(this._strokeInstructions), this._appendInstructions(this._strokeInstructions && this._strokeStyleInstructions), this._appendInstructions(this._activeInstructions), this._fillInstructions && this._appendDraw(t.fillCmd, this._fillMatrix), this._strokeInstructions && this._appendDraw(t.strokeCmd, this._strokeIgnoreScale && [1, 0, 0, 1, 0, 0])
        }, i._appendInstructions = function(e) {
            e && this._instructions.push.apply(this._instructions, e)
        }, i._appendDraw = function(t, i) {
            i ? this._instructions.push(new e(this._ctx.save, [], !1), new e(this._ctx.transform, i, !1), t, new e(this._ctx.restore, [], !1)) : this._instructions.push(t)
        }, i._newPath = function() {
            this._dirty && this._updateInstructions(), this._oldInstructions = this._instructions, this._activeInstructions = [], this._active = this._dirty = !1
        }, i._setProp = function(e, t) {
            this[e] = t
        }, createjs.Graphics = t
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
                this.initialize()
            },
            t = e.prototype = new createjs.EventDispatcher;
        e.suppressCrossDomainErrors = !1;
        var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        i.getContext && (e._hitTestCanvas = i, e._hitTestContext = i.getContext("2d"), i.width = i.height = 1), e._nextCacheID = 1, t.alpha = 1, t.cacheCanvas = null, t.id = -1, t.mouseEnabled = !0, t.name = null, t.parent = null, t.regX = 0, t.regY = 0, t.rotation = 0, t.scaleX = 1, t.scaleY = 1, t.skewX = 0, t.skewY = 0, t.shadow = null, t.visible = !0, t.x = 0, t.y = 0, t.compositeOperation = null, t.snapToPixel = !1, t.filters = null, t.cacheID = 0, t.mask = null, t.hitArea = null, t.cursor = null, t._cacheOffsetX = 0, t._cacheOffsetY = 0, t._cacheScale = 1, t._cacheDataURLID = 0, t._cacheDataURL = null, t._matrix = null, t._rectangle = null, t._bounds = null, t.initialize = function() {
            this.id = createjs.UID.get(), this._matrix = new createjs.Matrix2D, this._rectangle = new createjs.Rectangle
        }, t.isVisible = function() {
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY)
        }, t.draw = function(e, t) {
            var i = this.cacheCanvas;
            if (t || !i) return !1;
            var n, s = this._cacheScale,
                a = this._cacheOffsetX,
                r = this._cacheOffsetY;
            return (n = this._applyFilterBounds(a, r, 0, 0)) && (a = n.x, r = n.y), e.drawImage(i, a, r, i.width / s, i.height / s), !0
        }, t.updateContext = function(e) {
            var t, i = this.mask,
                n = this;
            i && i.graphics && !i.graphics.isEmpty() && (t = i.getMatrix(i._matrix), e.transform(t.a, t.b, t.c, t.d, t.tx, t.ty), i.graphics.drawAsPath(e), e.clip(), t.invert(), e.transform(t.a, t.b, t.c, t.d, t.tx, t.ty)), t = n._matrix.identity().appendTransform(n.x, n.y, n.scaleX, n.scaleY, n.rotation, n.skewX, n.skewY, n.regX, n.regY), createjs.Stage._snapToPixelEnabled && n.snapToPixel ? e.transform(t.a, t.b, t.c, t.d, t.tx + .5 | 0, t.ty + .5 | 0) : e.transform(t.a, t.b, t.c, t.d, t.tx, t.ty), e.globalAlpha *= n.alpha, n.compositeOperation && (e.globalCompositeOperation = n.compositeOperation), n.shadow && this._applyShadow(e, n.shadow)
        }, t.cache = function(e, t, i, n, s) {
            s = s || 1, this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), this._cacheWidth = i, this._cacheHeight = n, this._cacheOffsetX = e, this._cacheOffsetY = t, this._cacheScale = s, this.updateCache()
        }, t.updateCache = function(t) {
            var i, n = this.cacheCanvas,
                s = this._cacheScale,
                a = this._cacheOffsetX * s,
                r = this._cacheOffsetY * s,
                o = this._cacheWidth,
                l = this._cacheHeight;
            if (!n) throw "cache() must be called before updateCache()";
            var h = n.getContext("2d");
            (i = this._applyFilterBounds(a, r, o, l)) && (a = i.x, r = i.y, o = i.width, l = i.height), o = Math.ceil(o * s), l = Math.ceil(l * s), o != n.width || l != n.height ? (n.width = o, n.height = l) : t || h.clearRect(0, 0, o + 1, l + 1), h.save(), h.globalCompositeOperation = t, h.setTransform(s, 0, 0, s, -a, -r), this.draw(h, !0), this._applyFilters(), h.restore(), this.cacheID = e._nextCacheID++
        }, t.uncache = function() {
            this._cacheDataURL = this.cacheCanvas = null, this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0, this._cacheScale = 1
        }, t.getCacheDataURL = function() {
            return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()), this._cacheDataURL) : null
        }, t.getStage = function() {
            for (var e = this; e.parent;) e = e.parent;
            return e instanceof createjs.Stage ? e : null
        }, t.localToGlobal = function(e, t) {
            var i = this.getConcatenatedMatrix(this._matrix);
            return null == i ? null : (i.append(1, 0, 0, 1, e, t), new createjs.Point(i.tx, i.ty))
        }, t.globalToLocal = function(e, t) {
            var i = this.getConcatenatedMatrix(this._matrix);
            return null == i ? null : (i.invert(), i.append(1, 0, 0, 1, e, t), new createjs.Point(i.tx, i.ty))
        }, t.localToLocal = function(e, t, i) {
            var n = this.localToGlobal(e, t);
            return i.globalToLocal(n.x, n.y)
        }, t.setTransform = function(e, t, i, n, s, a, r, o, l) {
            return this.x = e || 0, this.y = t || 0, this.scaleX = null == i ? 1 : i, this.scaleY = null == n ? 1 : n, this.rotation = s || 0, this.skewX = a || 0, this.skewY = r || 0, this.regX = o || 0, this.regY = l || 0, this
        }, t.getMatrix = function(e) {
            var t = this;
            return (e ? e.identity() : new createjs.Matrix2D).appendTransform(t.x, t.y, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.regX, t.regY).appendProperties(t.alpha, t.shadow, t.compositeOperation)
        }, t.getConcatenatedMatrix = function(e) {
            e ? e.identity() : e = new createjs.Matrix2D;
            for (var t = this; null != t;) e.prependTransform(t.x, t.y, t.scaleX, t.scaleY, t.rotation, t.skewX, t.skewY, t.regX, t.regY).prependProperties(t.alpha, t.shadow, t.compositeOperation), t = t.parent;
            return e
        }, t.hitTest = function(t, i) {
            var n = e._hitTestContext;
            n.setTransform(1, 0, 0, 1, -t, -i), this.draw(n);
            var s = this._testHit(n);
            return n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, 2, 2), s
        }, t.set = function(e) {
            for (var t in e) this[t] = e[t];
            return this
        }, t.getBounds = function() {
            if (this._bounds) return this._rectangle.copy(this._bounds);
            var e = this.cacheCanvas;
            if (e) {
                var t = this._cacheScale;
                return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, e.width / t, e.height / t)
            }
            return null
        }, t.getTransformedBounds = function() {
            return this._getBounds()
        }, t.setBounds = function(e, t, i, n) {
            null == e && (this._bounds = e), this._bounds = (this._bounds || new createjs.Rectangle).initialize(e, t, i, n)
        }, t.clone = function() {
            var t = new e;
            return this.cloneProps(t), t
        }, t.toString = function() {
            return "[DisplayObject (name=" + this.name + ")]"
        }, t.cloneProps = function(e) {
            e.alpha = this.alpha, e.name = this.name, e.regX = this.regX, e.regY = this.regY, e.rotation = this.rotation, e.scaleX = this.scaleX, e.scaleY = this.scaleY, e.shadow = this.shadow, e.skewX = this.skewX, e.skewY = this.skewY, e.visible = this.visible, e.x = this.x, e.y = this.y, e._bounds = this._bounds, e.mouseEnabled = this.mouseEnabled, e.compositeOperation = this.compositeOperation
        }, t._applyShadow = function(e, t) {
            t = t || Shadow.identity, e.shadowColor = t.color, e.shadowOffsetX = t.offsetX, e.shadowOffsetY = t.offsetY, e.shadowBlur = t.blur
        }, t._tick = function(e) {
            var t = this._listeners;
            if (t && t.tick) {
                var i = new createjs.Event("tick");
                i.params = e, this._dispatchEvent(i, this, 2)
            }
        }, t._testHit = function(t) {
            try {
                var i = t.getImageData(0, 0, 1, 1).data[3] > 1
            } catch (n) {
                if (!e.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
            }
            return i
        }, t._applyFilters = function() {
            if (this.filters && 0 != this.filters.length && this.cacheCanvas)
                for (var e = this.filters.length, t = this.cacheCanvas.getContext("2d"), i = this.cacheCanvas.width, n = this.cacheCanvas.height, s = 0; e > s; s++) this.filters[s].applyFilter(t, 0, 0, i, n)
        }, t._applyFilterBounds = function(e, t, i, n) {
            var s, a, r = this.filters;
            if (r && (a = r.length)) {
                for (var o = 0; a > o; o++) {
                    var l = this.filters[o],
                        h = l.getBounds && l.getBounds();
                    h && (s || (s = this._rectangle.initialize(e, t, i, n)), s.x += h.x, s.y += h.y, s.width += h.width, s.height += h.height)
                }
                return s
            }
        }, t._getBounds = function(e, t) {
            return this._transformBounds(this.getBounds(), e, t)
        }, t._transformBounds = function(e, t, i) {
            if (!e) return e;
            var n = e.x,
                s = e.y,
                a = e.width,
                r = e.height,
                o = i ? this._matrix.identity() : this.getMatrix(this._matrix);
            (n || s) && o.appendTransform(0, 0, 1, 1, 0, 0, 0, -n, -s), t && o.prependMatrix(t);
            var l = a * o.a,
                h = a * o.b,
                c = r * o.c,
                u = r * o.d,
                d = o.tx,
                p = o.ty,
                _ = d,
                v = d,
                f = p,
                m = p;
            return (n = l + d) < _ ? _ = n : n > v && (v = n), (n = l + c + d) < _ ? _ = n : n > v && (v = n), (n = c + d) < _ ? _ = n : n > v && (v = n), (s = h + p) < f ? f = s : s > m && (m = s), (s = h + u + p) < f ? f = s : s > m && (m = s), (s = u + p) < f ? f = s : s > m && (m = s), e.initialize(_, f, v - _, m - f)
        }, t.isRoot = !1, t.bounding_box = null, t.isCheckMouseWithDraw = !1, t.isOnlyBoundsCheck = !1, t.setBoundingBox = function(e, t, i, n) {
            return this.bounding_box = new createjs.Rectangle(e, t, i, n)
        }, createjs.DisplayObject = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
                this.initialize()
            },
            t = e.prototype = new createjs.DisplayObject;
        t.children = null, t.mouseChildren = !0, t.DisplayObject_initialize = t.initialize, t.initialize = function() {
            this.DisplayObject_initialize(), this.children = []
        }, t.isVisible = function() {
            var e = this.cacheCanvas || this.children.length;
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
        }, t.DisplayObject_draw = t.draw, t.draw = function(e, t) {
            if (this.DisplayObject_draw(e, t)) return !0;
            for (var i = this.children.slice(0), n = 0, s = i.length; s > n; n++) {
                var a = i[n];
                a.isVisible() && (e.save(), a.updateContext(e), a.draw(e), e.restore())
            }
            return !0
        }, t.addChild = function(e) {
            if (null == e) return e;
            var t = arguments.length;
            if (t > 1) {
                for (var i = 0; t > i; i++) this.addChild(arguments[i]);
                return arguments[t - 1]
            }
            return e.parent && e.parent.removeChild(e), e.parent = this, this.children.push(e), e
        }, t.addChildAt = function(e, t) {
            var i = arguments.length,
                n = arguments[i - 1];
            if (0 > n || n > this.children.length) return arguments[i - 2];
            if (i > 2) {
                for (var s = 0; i - 1 > s; s++) this.addChildAt(arguments[s], n + s);
                return arguments[i - 2]
            }
            return e.parent && e.parent.removeChild(e), e.parent = this, this.children.splice(t, 0, e), e
        }, t.removeChild = function(e) {
            var t = arguments.length;
            if (t > 1) {
                for (var i = !0, n = 0; t > n; n++) i = i && this.removeChild(arguments[n]);
                return i
            }
            return this.removeChildAt(createjs.indexOf(this.children, e))
        }, t.removeChildAt = function(e) {
            var t = arguments.length;
            if (t > 1) {
                for (var i = [], n = 0; t > n; n++) i[n] = arguments[n];
                i.sort(function(e, t) {
                    return t - e
                });
                for (var s = !0, n = 0; t > n; n++) s = s && this.removeChildAt(i[n]);
                return s
            }
            if (0 > e || e > this.children.length - 1) return !1;
            var a = this.children[e];
            return a && (a.parent = null), this.children.splice(e, 1), !0
        }, t.removeAllChildren = function() {
            for (var e = this.children; e.length;) e.pop().parent = null
        }, t.getChildAt = function(e) {
            return this.children[e]
        }, t.getChildByName = function(e) {
            for (var t = this.children, i = 0, n = t.length; n > i; i++)
                if (t[i].name == e) return t[i];
            return null
        }, t.sortChildren = function(e) {
            this.children.sort(e)
        }, t.getChildIndex = function(e) {
            return createjs.indexOf(this.children, e)
        }, t.getNumChildren = function() {
            return this.children.length
        }, t.swapChildrenAt = function(e, t) {
            var i = this.children,
                n = i[e],
                s = i[t];
            n && s && (i[e] = s, i[t] = n)
        }, t.swapChildren = function(e, t) {
            for (var i, n, s = this.children, a = 0, r = s.length; r > a && (s[a] == e && (i = a), s[a] == t && (n = a), null == i || null == n); a++);
            a != r && (s[i] = t, s[n] = e)
        }, t.setChildIndex = function(e, t) {
            var i = this.children,
                n = i.length;
            if (!(e.parent != this || 0 > t || t >= n)) {
                for (var s = 0; n > s && i[s] != e; s++);
                s != n && s != t && (i.splice(s, 1), i.splice(t, 0, e))
            }
        }, t.contains = function(e) {
            for (; e;) {
                if (e == this) return !0;
                e = e.parent
            }
            return !1
        }, t.hitTest = function(e, t) {
            return null != this.getObjectUnderPoint(e, t)
        }, t.getObjectsUnderPoint = function(e, t) {
            var i = [],
                n = this.localToGlobal(e, t);
            return this._getObjectsUnderPoint(n.x, n.y, i), i
        }, t.getObjectUnderPoint = function(e, t) {
            var i = this.localToGlobal(e, t);
            return this._getObjectsUnderPoint(i.x, i.y)
        }, t.DisplayObject_getBounds = t.getBounds, t.getBounds = function() {
            return this._getBounds(null, !0)
        }, t.getTransformedBounds = function() {
            return this._getBounds()
        }, t.clone = function(t) {
            var i = new e;
            if (this.cloneProps(i), t)
                for (var n = i.children = [], s = 0, a = this.children.length; a > s; s++) {
                    var r = this.children[s].clone(t);
                    r.parent = i, n.push(r)
                }
            return i
        }, t.toString = function() {
            return "[Container (name=" + this.name + ")]"
        }, t.DisplayObject__tick = t._tick, t._tick = function(e) {
            for (var t = this.children.length - 1; t >= 0; t--) {
                var i = this.children[t];
                i._tick && i._tick(e)
            }
            this.DisplayObject__tick(e)
        }, t._getObjectsUnderPoint = function(t, i, n, s) {
            var a, r, o = this.children.length;
            if (!isDesktopBrowser) {
                var l, h, c;
                for (a = o - 1; a >= 0; a--)
                    if (r = this.children[a], r.visible && r.mouseEnabled && !(r.alpha <= 0)) {
                        if (l = r.bounding_box) {
                            if (h = r.isRoot ? r.x + l.x <= t && t < r.x + l.x + l.width && r.y + l.y <= i && i < r.y + l.y + l.height : (r.x + l.x) * scaleFactor <= t && t < scaleFactor * (r.x + l.x + l.width) && (r.y + l.y) * scaleFactor <= i && i < scaleFactor * (r.y + l.y + l.height)) {
                                if (n) {
                                    n.push(r);
                                    continue
                                }
                                return r
                            }
                        } else if (r.isCheckMouseWithDraw) {
                            var u = createjs.DisplayObject._hitTestContext,
                                d = this._matrix,
                                p = s && r.hitArea;
                            if (r.getConcatenatedMatrix(d), p && (d.appendTransform(p.x, p.y, p.scaleX, p.scaleY, p.rotation, p.skewX, p.skewY, p.regX, p.regY), d.alpha = p.alpha), u.globalAlpha = d.alpha, u.setTransform(d.a, d.b, d.c, d.d, d.tx - t, d.ty - i), (p || r).draw(u), !this._testHit(u)) continue;
                            if (u.setTransform(1, 0, 0, 1, 0, 0), u.clearRect(0, 0, 2, 2), !n) return s && !this.mouseChildren ? this : r;
                            n.push(r)
                        }
                        if (r instanceof e && (c = r.isRoot ? r._getObjectsUnderPoint(t - (r.x + r.regX), i - (r.y + r.regY), n, s) : r._getObjectsUnderPoint(t - (r.x + r.regX) * scaleFactor, i - (r.y + r.regY) * scaleFactor, n, s))) {
                            if (n) {
                                n.push(c);
                                continue
                            }
                            return c
                        }
                    }
                return null
            }
            var u = createjs.DisplayObject._hitTestContext,
                d = this._matrix;
            for (a = o - 1; a >= 0; a--) {
                r = this.children[a];
                var p = s && r.hitArea;
                if (r.visible && (p || r.isVisible()) && (!s || r.mouseEnabled))
                    if (!p && r instanceof e) {
                        var c = r._getObjectsUnderPoint(t, i, n, s);
                        if (!n && c) return s && !this.mouseChildren ? this : c
                    } else {
                        if (r.getConcatenatedMatrix(d), p && (d.appendTransform(p.x, p.y, p.scaleX, p.scaleY, p.rotation, p.skewX, p.skewY, p.regX, p.regY), d.alpha = p.alpha), r.isOnlyBoundsCheck) {
                            var l = r.bounding_box;
                            if (l && !((t - d.tx) / scaleFactor >= l.x && (t - d.tx) / scaleFactor <= l.x + l.width && (i - d.ty) / scaleFactor >= l.y && (i - d.ty) / scaleFactor <= l.y + l.height)) continue
                        } else {
                            if (u.globalAlpha = d.alpha, u.setTransform(d.a, d.b, d.c, d.d, d.tx - t, d.ty - i), (p || r).draw(u), !this._testHit(u)) continue;
                            u.setTransform(1, 0, 0, 1, 0, 0), u.clearRect(0, 0, 2, 2)
                        }
                        if (!n) return s && !this.mouseChildren ? this : r;
                        n.push(r)
                    }
            }
            return null
        }, t._getBounds = function(e, t) {
            var i = this.DisplayObject_getBounds();
            if (i) return this._transformBounds(i, e, t);
            var n, s, a, r, o = t ? this._matrix.identity() : this.getMatrix(this._matrix);
            e && o.prependMatrix(e);
            for (var l = this.children.length, h = 0; l > h; h++) {
                var c = this.children[h];
                if (c.visible && (i = c._getBounds(o))) {
                    var u = i.x,
                        d = i.y,
                        p = u + i.width,
                        _ = d + i.height;
                    (n > u || null == n) && (n = u), (p > s || null == s) && (s = p), (a > d || null == a) && (a = d), (_ > r || null == r) && (r = _)
                }
            }
            return null == s ? null : this._rectangle.initialize(n, a, s - n, r - a)
        }, createjs.Container = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.Container;
        e._snapToPixelEnabled = !1, t.autoClear = !0, t.canvas = null, t.mouseX = 0, t.mouseY = 0, t.snapToPixelEnabled = !1, t.mouseInBounds = !1, t.tickOnUpdate = !0, t.mouseMoveOutside = !1, t.nextStage = null, t._pointerData = null, t._pointerCount = 0, t._primaryPointerID = null, t._mouseOverIntervalID = null, t.Container_initialize = t.initialize, t.initialize = function(e) {
            this.Container_initialize(), this.canvas = "string" == typeof e ? document.getElementById(e) : e, this._pointerData = {}, this.enableDOMEvents(!0)
        }, t.update = function() {
            if (this.canvas) {
                this.tickOnUpdate && (this.dispatchEvent("tickstart"), this._tick(arguments.length ? arguments : null), this.dispatchEvent("tickend")), this.dispatchEvent("drawstart"), e._snapToPixelEnabled = this.snapToPixelEnabled, this.autoClear && this.clear();
                var t = this.canvas.getContext("2d");
                t.save(), this.updateContext(t), this.draw(t, !1), t.restore(), this.dispatchEvent("drawend")
            }
        }, t.handleEvent = function(e) {
            "tick" == e.type && this.update(e)
        }, t.clear = function() {
            if (this.canvas) {
                var e = this.canvas.getContext("2d");
                e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
            }
        }, t.toDataURL = function(e, t) {
            t || (t = "image/png");
            var i, n = this.canvas.getContext("2d"),
                s = this.canvas.width,
                a = this.canvas.height;
            if (e) {
                i = n.getImageData(0, 0, s, a);
                var r = n.globalCompositeOperation;
                n.globalCompositeOperation = "destination-over", n.fillStyle = e, n.fillRect(0, 0, s, a)
            }
            var o = this.canvas.toDataURL(t);
            return e && (n.clearRect(0, 0, s + 1, a + 1), n.putImageData(i, 0, 0), n.globalCompositeOperation = r), o
        }, t.enableMouseOver = function(e) {
            if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == e && this._testMouseOver(!0)), null == e) e = 20;
            else if (0 >= e) return;
            var t = this;
            this._mouseOverIntervalID = setInterval(function() {
                t._testMouseOver()
            }, 1e3 / Math.min(50, e))
        }, t.enableDOMEvents = function(e) {
            null == e && (e = !0);
            var t, i, n = this._eventListeners;
            if (!e && n) {
                for (t in n) i = n[t], i.t.removeEventListener(t, i.f, !1);
                this._eventListeners = null
            } else if (e && !n && this.canvas) {
                var s = window.addEventListener ? window : document,
                    a = this;
                n = this._eventListeners = {}, n.mouseup = {
                    t: s,
                    f: function(e) {
                        a._handleMouseUp(e)
                    }
                }, n.mousemove = {
                    t: s,
                    f: function(e) {
                        a._handleMouseMove(e)
                    }
                }, n.dblclick = {
                    t: s,
                    f: function(e) {
                        a._handleDoubleClick(e)
                    }
                }, n.mousedown = {
                    t: this.canvas,
                    f: function(e) {
                        a._handleMouseDown(e)
                    }
                };
                for (t in n) i = n[t], i.t.addEventListener(t, i.f, !1)
            }
        }, t.clone = function() {
            var t = new e(null);
            return this.cloneProps(t), t
        }, t.toString = function() {
            return "[Stage (name=" + this.name + ")]"
        }, t._getElementRect = function(e) {
            var t;
            try {
                t = e.getBoundingClientRect()
            } catch (i) {
                t = {
                    top: e.offsetTop,
                    left: e.offsetLeft,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                }
            }
            var n = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
                s = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
                a = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle,
                r = parseInt(a.paddingLeft) + parseInt(a.borderLeftWidth),
                o = parseInt(a.paddingTop) + parseInt(a.borderTopWidth),
                l = parseInt(a.paddingRight) + parseInt(a.borderRightWidth),
                h = parseInt(a.paddingBottom) + parseInt(a.borderBottomWidth);
            return {
                left: t.left + n + r,
                right: t.right + n - l,
                top: t.top + s + o,
                bottom: t.bottom + s - h
            }
        }, t._getPointerData = function(e) {
            var t = this._pointerData[e];
            return t || (t = this._pointerData[e] = {
                x: 0,
                y: 0
            }, (null == this._primaryPointerID || -1 == this._primaryPointerID) && (this._primaryPointerID = e)), t
        }, t._handleMouseMove = function(e) {
            e || (e = window.event), this._handlePointerMove(-1, e, e.pageX, e.pageY)
        }, t._handlePointerMove = function(e, t, i, n) {
            if (this.canvas) {
                var s = this._getPointerData(e),
                    a = s.inBounds;
                if (this._updatePointerPosition(e, t, i, n), a || s.inBounds || this.mouseMoveOutside) {
                    -1 == e && s.inBounds == !a && this._dispatchMouseEvent(this, a ? "mouseleave" : "mouseenter", !1, e, s, t), this._dispatchMouseEvent(this, "stagemousemove", !1, e, s, t), this._dispatchMouseEvent(s.target, "pressmove", !0, e, s, t);
                    var r = s.event;
                    r && r.hasEventListener("mousemove") && r.dispatchEvent(new createjs.MouseEvent("mousemove", !1, !1, s.x, s.y, t, e, e == this._primaryPointerID, s.rawX, s.rawY), oTarget), this.nextStage && this.nextStage._handlePointerMove(e, t, i, n)
                }
            }
        }, t._updatePointerPosition = function(e, t, i, n) {
            var s = this._getElementRect(this.canvas);
            i -= s.left, n -= s.top;
            var a = this.canvas.width,
                r = this.canvas.height;
            i /= (s.right - s.left) / a, n /= (s.bottom - s.top) / r;
            var o = this._getPointerData(e);
            (o.inBounds = i >= 0 && n >= 0 && a - 1 >= i && r - 1 >= n) ? (o.x = i, o.y = n) : this.mouseMoveOutside && (o.x = 0 > i ? 0 : i > a - 1 ? a - 1 : i, o.y = 0 > n ? 0 : n > r - 1 ? r - 1 : n), o.posEvtObj = t, o.rawX = i, o.rawY = n, e == this._primaryPointerID && (this.mouseX = o.x, this.mouseY = o.y, this.mouseInBounds = o.inBounds)
        }, t._handleMouseUp = function(e) {
            this._handlePointerUp(-1, e, !1)
        }, t._handlePointerUp = function(e, t, i) {
            var n = this._getPointerData(e),
                s = n.target;
            s && (s.hasEventListener("pressup") || s.hasEventListener("click")) ? (s.hasEventListener("click") && this._getObjectsUnderPoint(n.x, n.y, null, !0) == s && this._dispatchMouseEvent(s, "click", !0, e, n, t), this._dispatchMouseEvent(s, "pressup", !0, e, n, t)) : this._dispatchMouseEvent(this, "stagemouseup", !1, e, n, t), i ? (e == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[e]) : n.event = n.target = null, this.nextStage && this.nextStage._handlePointerUp(e, t, i)
        }, t._handleMouseDown = function(e) {
            this._handlePointerDown(-1, e, e.pageX, e.pageY)
        }, t._handlePointerDown = function(e, t, i, n) {
            null != n && this._updatePointerPosition(e, t, i, n);
            var s = this._getPointerData(e);
            s.target = this._getObjectsUnderPoint(s.x, s.y, null, !0), this._dispatchMouseEvent(s.target, "mousedown", !0, e, s, t), s.target && s.target.hasEventListener("mousedown") || this._dispatchMouseEvent(this, "stagemousedown", !1, e, s, t), this.nextStage && this.nextStage._handlePointerDown(e, t, i, n)
        }, t._testMouseOver = function(e) {
            if (-1 == this._primaryPointerID && (e || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
                var t, i, n, s, a = this._getPointerData(-1),
                    r = a.posEvtObj,
                    o = -1,
                    l = "";
                (e || this.mouseInBounds && r && r.target == this.canvas) && (t = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY);
                var h = this._mouseOverTarget || [],
                    c = h[h.length - 1],
                    u = this._mouseOverTarget = [];
                for (i = t; i;) u.unshift(i), null != i.cursor && (l = i.cursor), i = i.parent;
                for (this.canvas.style.cursor = l, n = 0, s = u.length; s > n && u[n] == h[n]; n++) o = n;
                for (c != t && this._dispatchMouseEvent(c, "mouseout", !0, -1, a, r), n = h.length - 1; n > o; n--) this._dispatchMouseEvent(h[n], "rollout", !1, -1, a, r);
                for (n = u.length - 1; n > o; n--) this._dispatchMouseEvent(u[n], "rollover", !1, -1, a, r);
                c != t && this._dispatchMouseEvent(t, "mouseover", !0, -1, a, r)
            }
        }, t._handleDoubleClick = function(e) {
            var t = this._getPointerData(-1),
                i = this._getObjectsUnderPoint(t.x, t.y, null, !0);
            this._dispatchMouseEvent(i, "dblclick", !0, -1, t, e), this.nextStage && this.nextStage._handleDoubleClick(e)
        }, t._dispatchMouseEvent = function(e, t, i, n, s, a) {
            if (e && (i || e.hasEventListener(t))) {
                var r = new createjs.MouseEvent(t, i, !1, s.x, s.y, a, n, n == this._primaryPointerID, s.rawX, s.rawY);
                e.dispatchEvent(r)
            }
        }, createjs.Stage = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.DisplayObject;
        t.image = null, t.snapToPixel = !0, t.sourceRect = null, t.DisplayObject_initialize = t.initialize, t.initialize = function(e) {
            this.DisplayObject_initialize(), "string" == typeof e ? (this.image = document.createElement("img"), this.image.src = e) : this.image = e
        }, t.isVisible = function() {
            var e = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
        }, t.DisplayObject_draw = t.draw, t.draw = function(e, t) {
            if (this.DisplayObject_draw(e, t)) return !0;
            var i = this.sourceRect;
            return i ? e.drawImage(this.image, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height) : e.drawImage(this.image, 0, 0), !0
        }, t.DisplayObject_getBounds = t.getBounds, t.getBounds = function() {
            var e = this.DisplayObject_getBounds();
            if (e) return e;
            var t = this.sourceRect || this.image,
                i = this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
            return i ? this._rectangle.initialize(0, 0, t.width, t.height) : null
        }, t.clone = function() {
            var t = new e(this.image);
            return this.sourceRect && (t.sourceRect = this.sourceRect.clone()), this.cloneProps(t), t
        }, t.toString = function() {
            return "[Bitmap (name=" + this.name + ")]"
        }, createjs.Bitmap = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t) {
                this.initialize(e, t)
            },
            t = e.prototype = new createjs.DisplayObject;
        t.currentFrame = 0, t.currentAnimation = null, t.paused = !0, t.spriteSheet = null, t.snapToPixel = !0, t.isLoop = !0, t.offset = 0, t.currentAnimationFrame = 0, t.framerate = 0, t._advanceCount = 0, t._animation = null, t._currentFrame = null, t.rectMask = null, t.DisplayObject_initialize = t.initialize, t.initialize = function(e, t) {
            this.DisplayObject_initialize(), this.spriteSheet = e, t && this.gotoAndPlay(t)
        }, t.isVisible = function() {
            var e = this.cacheCanvas || this.spriteSheet.complete;
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
        }, t.DisplayObject_draw = t.draw, t.draw = function(e, t) {
            if (this.DisplayObject_draw(e, t)) return !0;
            this._normalizeFrame();
            var i = this.spriteSheet.getFrame(0 | this._currentFrame);
            if (!i) return !1;
            var n = i.rect;
            return this.rectMask ? e.drawImage(i.image, n.x + this.rectMask.x, n.y + this.rectMask.y, n.width + this.rectMask.width, n.height + this.rectMask.height, -i.regX + this.rectMask.x, -i.regY + this.rectMask.y, n.width + this.rectMask.width, n.height + this.rectMask.height) : n.width >= 1 && n.height >= 1 && e.drawImage(i.image, n.x, n.y, n.width, n.height, -i.regX, -i.regY, n.width, n.height), !0
        }, t.play = function() {
            this.paused = !1
        }, t.stop = function() {
            this.paused = !0
        }, t.gotoAndPlay = function(e) {
            this.paused = !1, this._goto(e)
        }, t.gotoAndStop = function(e) {
            this.paused = !0, this._goto(e)
        }, t.advance = function(e) {
            var t = this._animation && this._animation.speed || 1,
                i = this.framerate || this.spriteSheet.framerate,
                n = i && null != e ? e / (1e3 / i) : 1;
            this._animation ? this.currentAnimationFrame += n * t : this._currentFrame += n * t, this._normalizeFrame()
        }, t.DisplayObject_getBounds = t.getBounds, t.getBounds = function() {
            return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
        }, t.clone = function() {
            var t = new e(this.spriteSheet);
            return this.cloneProps(t), t
        }, t.toString = function() {
            return "[Sprite (name=" + this.name + ")]"
        }, t.DisplayObject__tick = t._tick, t._tick = function(e) {
            this.paused || this.advance(e && e[0] && e[0].delta), this.DisplayObject__tick(e)
        }, t._normalizeFrame = function() {
            var e, t = this._animation,
                i = this.paused,
                n = this._currentFrame,
                s = this.currentAnimationFrame;
            if (t)
                if (e = t.frames.length, (0 | s) >= e) {
                    var a = t.next;
                    if (this._dispatchAnimationEnd(t, n, i, a, e - 1));
                    else {
                        if (a && this.isLoop) return this._goto(a, s - e);
                        this.paused = !0, s = this.currentAnimationFrame = t.frames.length - 1, this._currentFrame = t.frames[s]
                    }
                } else this._currentFrame = t.frames[0 | s];
            else if (e = this.spriteSheet.getNumFrames(), n >= e && !this._dispatchAnimationEnd(t, n, i, e - 1) && (this._currentFrame -= e) >= e) return this._normalizeFrame();
            this.currentFrame = 0 | this._currentFrame
        }, t._dispatchAnimationEnd = function(e, t, i, n, s) {
            var a = e ? e.name : null;
            if (this.hasEventListener("animationend")) {
                var r = new createjs.Event("animationend");
                r.name = a, r.next = n, this.dispatchEvent(r)
            }
            var o = this._animation != e || this._currentFrame != t;
            return o || i || !this.paused || (this.currentAnimationFrame = s, o = !0), o
        }, t.DisplayObject_cloneProps = t.cloneProps, t.cloneProps = function(e) {
            this.DisplayObject_cloneProps(e), e.currentFrame = this.currentFrame, e._currentFrame = this._currentFrame, e.currentAnimation = this.currentAnimation, e.paused = this.paused, e._animation = this._animation, e.currentAnimationFrame = this.currentAnimationFrame, e.framerate = this.framerate
        }, t._goto = function(e, t) {
            if (isNaN(e)) {
                var i = this.spriteSheet.getAnimation(e);
                i && (this.currentAnimationFrame = t || 0, this._animation = i, this.currentAnimation = e, this._normalizeFrame())
            } else this.currentAnimationFrame = 0, this.currentAnimation = this._animation = null, this._currentFrame = e, this._normalizeFrame()
        }, createjs.Sprite = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
        if (!createjs.Sprite) throw e;
        (createjs.BitmapAnimation = function(t) {
            console.log(e), this.initialize(t)
        }).prototype = new createjs.Sprite
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.DisplayObject;
        t.graphics = null, t.DisplayObject_initialize = t.initialize, t.initialize = function(e) {
            this.DisplayObject_initialize(), this.graphics = e ? e : new createjs.Graphics
        }, t.isVisible = function() {
            var e = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
        }, t.DisplayObject_draw = t.draw, t.draw = function(e, t) {
            return this.DisplayObject_draw(e, t) ? !0 : (this.graphics.draw(e), !0)
        }, t.clone = function(t) {
            var i = new e(t && this.graphics ? this.graphics.clone() : this.graphics);
            return this.cloneProps(i), i
        }, t.toString = function() {
            return "[Shape (name=" + this.name + ")]"
        }, createjs.Shape = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype = new createjs.DisplayObject,
            i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        i.getContext && (e._workingContext = i.getContext("2d"), i.width = i.height = 1), e.H_OFFSETS = {
            start: 0,
            left: 0,
            center: -.5,
            end: -1,
            right: -1
        }, e.V_OFFSETS = {
            top: 0,
            hanging: -.01,
            middle: -.4,
            alphabetic: -.8,
            ideographic: -.85,
            bottom: -1
        }, t.text = "", t.font = null, t.color = null, t.textAlign = "left", t.textBaseline = "top", t.maxWidth = null, t.outline = 0, t.lineHeight = 0, t.lineWidth = null, t.DisplayObject_initialize = t.initialize, t.initialize = function(e, t, i) {
            this.DisplayObject_initialize(), this.text = e, this.font = t, this.color = i
        }, t.isVisible = function() {
            var e = this.cacheCanvas || null != this.text && "" !== this.text;
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
        }, t.DisplayObject_draw = t.draw, t.draw = function(e, t) {
            if (this.DisplayObject_draw(e, t)) return !0;
            var i = this.color || "#000";
            return this.outline ? (e.strokeStyle = i, e.lineWidth = 1 * this.outline) : e.fillStyle = i, this._drawText(this._prepContext(e)), !0
        }, t.getMeasuredWidth = function() {
            return this._prepContext(e._workingContext).measureText(this.text).width
        }, t.getMeasuredLineHeight = function() {
            return 1.2 * this._prepContext(e._workingContext).measureText("M").width
        }, t.getMeasuredHeight = function() {
            return this._drawText(null, {}).height
        }, t.DisplayObject_getBounds = t.getBounds, t.getBounds = function() {
            var t = this.DisplayObject_getBounds();
            if (t) return t;
            if (null == this.text || "" == this.text) return null;
            var i = this._drawText(null, {}),
                n = this.maxWidth && this.maxWidth < i.width ? this.maxWidth : i.width,
                s = n * e.H_OFFSETS[this.textAlign || "left"],
                a = this.lineHeight || this.getMeasuredLineHeight(),
                r = a * e.V_OFFSETS[this.textBaseline || "top"];
            return this._rectangle.initialize(s, r, n, i.height)
        }, t.clone = function() {
            var t = new e(this.text, this.font, this.color);
            return this.cloneProps(t), t
        }, t.toString = function() {
            return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
        }, t.DisplayObject_cloneProps = t.cloneProps, t.cloneProps = function(e) {
            this.DisplayObject_cloneProps(e), e.textAlign = this.textAlign, e.textBaseline = this.textBaseline, e.maxWidth = this.maxWidth, e.outline = this.outline, e.lineHeight = this.lineHeight, e.lineWidth = this.lineWidth
        }, t._prepContext = function(e) {
            return e.font = this.font, e.textAlign = this.textAlign || "left", e.textBaseline = this.textBaseline || "top", e
        }, t._drawText = function(t, i) {
            var n = !!t;
            n || (t = this._prepContext(e._workingContext));
            for (var s = this.lineHeight || this.getMeasuredLineHeight(), a = 0, r = 0, o = String(this.text).split(/(?:\r\n|\r|\n)/), l = 0, h = o.length; h > l; l++) {
                var c = o[l],
                    u = null;
                if (null != this.lineWidth && (u = t.measureText(c).width) > this.lineWidth) {
                    var d = c.split(/(\s)/);
                    c = d[0], u = t.measureText(c).width;
                    for (var p = 1, _ = d.length; _ > p; p += 2) {
                        var v = t.measureText(d[p] + d[p + 1]).width;
                        u + v > this.lineWidth ? (n && this._drawTextLine(t, c, r * s), u > a && (a = u), c = d[p + 1], u = t.measureText(c).width, r++) : (c += d[p] + d[p + 1], u += v)
                    }
                }
                n && this._drawTextLine(t, c, r * s), i && null == u && (u = t.measureText(c).width), u > a && (a = u), r++
            }
            return i && (i.count = r, i.width = a, i.height = r * s), i
        }, t._drawTextLine = function(e, t, i) {
            this.outline ? e.strokeText(t, 0, i, this.maxWidth || 65535) : e.fillText(t, 0, i, this.maxWidth || 65535)
        }, createjs.Text = e
    }(), this.createjs = this.createjs || {},
    function() {
        function e(e, t) {
            this.initialize(e, t)
        }
        var t = e.prototype = new createjs.DisplayObject;
        t.text = "", t.spriteSheet = null, t.lineHeight = 0, t.letterSpacing = 0, t.isNeedCenter = !1, t.centerX = 0, t.centerY = 0, t.textBounds, t.spaceWidth = 0, t.postfix = "", t.DisplayObject_initialize = t.initialize, t.initialize = function(e, i) {
            this.DisplayObject_initialize(), this.text = e, this.spriteSheet = i, t.textBounds = new createjs.Rectangle
        }, t.DisplayObject_draw = t.draw, t.draw = function(e, t) {
            return this.DisplayObject_draw(e, t) ? !0 : void this._drawText(e)
        }, t.isVisible = function() {
            var e = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;
            return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && e)
        }, t.getBounds = function() {
            var e = this._rectangle;
            return this._drawText(null, e), e.width ? e : null
        }, t._getFrame = function(e, t) {
            var i, n = t.getAnimation(e + this.postfix);
            return n || (e != (i = e.toUpperCase()) || e != (i = e.toLowerCase()) || (i = null), i && (n = t.getAnimation(i + this.postfix))), n && t.getFrame(n.frames[0])
        }, t._getLineHeight = function(e) {
            var t = this._getFrame("1", e) || this._getFrame("T", e) || this._getFrame("L", e) || e.getFrame(0);
            return t ? t.rect.height : 1
        }, t._getSpaceWidth = function(e) {
            var t = this._getFrame("1", e) || this._getFrame("l", e) || this._getFrame("e", e) || this._getFrame("a", e) || e.getFrame(0);
            return t ? t.rect.width : 1
        }, t._drawText = function(e, t) {
            var i, n, s, a = 0,
                r = 0,
                o = this.spaceWidth,
                l = this.lineHeight,
                h = this.spriteSheet;
            0 == o && (o = this._getSpaceWidth(h)), 0 == l && (l = this._getLineHeight(h));
            for (var c = 0, u = 0, d = this.text.length; d > u; u++) {
                var p = this.text.charAt(u);
                if (" " != p)
                    if ("\n" != p && "\r" != p) {
                        var _ = this._getFrame(p, h);
                        if (_) {
                            var v = _.rect;
                            s = _.regX, i = v.width, e && e.drawImage(_.image, v.x, v.y, i, n = v.height, a - s, r - _.regY, i, n), a += i + this.letterSpacing
                        }
                    } else "\r" == p && "\n" == this.text.charAt(u + 1) && u++, a - s > c && (c = a - s), a = 0, r += l;
                else a += o
            }
            a - s > c && (c = a - s), t && (t.width = c - this.letterSpacing, t.height = r + l), this.textBounds.width = c - this.letterSpacing, this.textBounds.height = r + l
        }, createjs.BitmapText = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
                throw "SpriteSheetUtils cannot be instantiated"
            },
            t = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        t.getContext && (e._workingCanvas = t, e._workingContext = t.getContext("2d"), t.width = t.height = 1), e.addFlippedFrames = function(t, i, n, s) {
            if (i || n || s) {
                var a = 0;
                i && e._flip(t, ++a, !0, !1), n && e._flip(t, ++a, !1, !0), s && e._flip(t, ++a, !0, !0)
            }
        }, e.extractFrame = function(t, i) {
            isNaN(i) && (i = t.getAnimation(i).frames[0]);
            var n = t.getFrame(i);
            if (!n) return null;
            var s = n.rect,
                a = e._workingCanvas;
            a.width = s.width, a.height = s.height, e._workingContext.drawImage(n.image, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height);
            var r = document.createElement("img");
            return r.src = a.toDataURL("image/png"), r
        }, e.mergeAlpha = function(e, t, i) {
            i || (i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), i.width = Math.max(t.width, e.width), i.height = Math.max(t.height, e.height);
            var n = i.getContext("2d");
            return n.save(), n.drawImage(e, 0, 0), n.globalCompositeOperation = "destination-in", n.drawImage(t, 0, 0), n.restore(), i
        }, e._flip = function(t, i, n, s) {
            for (var a = t._images, r = e._workingCanvas, o = e._workingContext, l = a.length / i, h = 0; l > h; h++) {
                var c = a[h];
                c.__tmp = h, o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, r.width + 1, r.height + 1), r.width = c.width, r.height = c.height, o.setTransform(n ? -1 : 1, 0, 0, s ? -1 : 1, n ? c.width : 0, s ? c.height : 0), o.drawImage(c, 0, 0);
                var u = document.createElement("img");
                u.src = r.toDataURL("image/png"), u.width = c.width, u.height = c.height, a.push(u)
            }
            var d = t._frames,
                p = d.length / i;
            for (h = 0; p > h; h++) {
                c = d[h];
                var _ = c.rect.clone();
                u = a[c.image.__tmp + l * i];
                var v = {
                    image: u,
                    rect: _,
                    regX: c.regX,
                    regY: c.regY
                };
                n && (_.x = u.width - _.x - _.width, v.regX = _.width - c.regX), s && (_.y = u.height - _.y - _.height, v.regY = _.height - c.regY), d.push(v)
            }
            var f = "_" + (n ? "h" : "") + (s ? "v" : ""),
                m = t._animations,
                T = t._data,
                g = m.length / i;
            for (h = 0; g > h; h++) {
                var S = m[h];
                c = T[S];
                var E = {
                    name: S + f,
                    frequency: c.frequency,
                    next: c.next,
                    frames: []
                };
                c.next && (E.next += f), d = c.frames;
                for (var y = 0, P = d.length; P > y; y++) E.frames.push(d[y] + p * i);
                T[E.name] = E, m.push(E.name)
            }
        }, createjs.SpriteSheetUtils = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
                this.initialize()
            },
            t = e.prototype = new createjs.EventDispatcher;
        e.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions", e.ERR_RUNNING = "a build is already running", t.maxWidth = 2048, t.maxHeight = 2048, t.spriteSheet = null, t.scale = 1, t.padding = 1, t.timeSlice = .3, t.progress = -1, t._frames = null, t._animations = null, t._data = null, t._nextFrameIndex = 0, t._index = 0, t._timerID = null, t._scale = 1, t.initialize = function() {
            this._frames = [], this._animations = {}
        }, t.addFrame = function(t, i, n, s, a, r) {
            if (this._data) throw e.ERR_RUNNING;
            var o = i || t.bounds || t.nominalBounds;
            return !o && t.getBounds && (o = t.getBounds()), o ? (n = n || 1, this._frames.push({
                source: t,
                sourceRect: o,
                scale: n,
                funct: s,
                params: a,
                scope: r,
                index: this._frames.length,
                height: o.height * n
            }) - 1) : null
        }, t.addAnimation = function(t, i, n, s) {
            if (this._data) throw e.ERR_RUNNING;
            this._animations[t] = {
                frames: i,
                next: n,
                frequency: s
            }
        }, t.addMovieClip = function(t, i, n) {
            if (this._data) throw e.ERR_RUNNING;
            var s = t.frameBounds,
                a = i || t.bounds || t.nominalBounds;
            if (!a && t.getBounds && (a = t.getBounds()), !a && !s) return null;
            for (var r = this._frames.length, o = t.timeline.duration, l = 0; o > l; l++) {
                var h = s && s[l] ? s[l] : a;
                this.addFrame(t, h, n, function(e) {
                    var t = this.actionsEnabled;
                    this.actionsEnabled = !1, this.gotoAndStop(e), this.actionsEnabled = t
                }, [l], t)
            }
            var c = t.timeline._labels,
                u = [];
            for (var d in c) u.push({
                index: c[d],
                label: d
            });
            if (u.length) {
                u.sort(function(e, t) {
                    return e.index - t.index
                });
                for (var l = 0, p = u.length; p > l; l++) {
                    for (var _ = u[l].label, v = r + u[l].index, f = r + (l == p - 1 ? o : u[l + 1].index), m = [], T = v; f > T; T++) m.push(T);
                    this.addAnimation(_, m, !0)
                }
            }
        }, t.build = function() {
            if (this._data) throw e.ERR_RUNNING;
            for (this._startBuild(); this._drawNext(););
            return this._endBuild(), this.spriteSheet
        }, t.buildAsync = function(t) {
            if (this._data) throw e.ERR_RUNNING;
            this.timeSlice = t, this._startBuild();
            var i = this;
            this._timerID = setTimeout(function() {
                i._run()
            }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
        }, t.stopAsync = function() {
            clearTimeout(this._timerID), this._data = null
        }, t.clone = function() {
            throw "SpriteSheetBuilder cannot be cloned."
        }, t.toString = function() {
            return "[SpriteSheetBuilder]"
        }, t._startBuild = function() {
            var t = this.padding || 0;
            this.progress = 0, this.spriteSheet = null, this._index = 0, this._scale = this.scale;
            var i = [];
            this._data = {
                images: [],
                frames: i,
                animations: this._animations
            };
            var n = this._frames.slice();
            if (n.sort(function(e, t) {
                    return e.height <= t.height ? -1 : 1
                }), n[n.length - 1].height + 2 * t > this.maxHeight) throw e.ERR_DIMENSIONS;
            for (var s = 0, a = 0, r = 0; n.length;) {
                var o = this._fillRow(n, s, r, i, t);
                if (o.w > a && (a = o.w), s += o.h, !o.h || !n.length) {
                    var l = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                    l.width = this._getSize(a, this.maxWidth), l.height = this._getSize(s, this.maxHeight), this._data.images[r] = l, o.h || (a = s = 0, r++)
                }
            }
        }, t._getSize = function(e, t) {
            for (var i = 4; Math.pow(2, ++i) < e;);
            return Math.min(t, Math.pow(2, i))
        }, t._fillRow = function(t, i, n, s, a) {
            var r = this.maxWidth,
                o = this.maxHeight;
            i += a;
            for (var l = o - i, h = a, c = 0, u = t.length - 1; u >= 0; u--) {
                var d = t[u],
                    p = this._scale * d.scale,
                    _ = d.sourceRect,
                    v = d.source,
                    f = Math.floor(p * _.x - a),
                    m = Math.floor(p * _.y - a),
                    T = Math.ceil(p * _.height + 2 * a),
                    g = Math.ceil(p * _.width + 2 * a);
                if (g > r) throw e.ERR_DIMENSIONS;
                T > l || h + g > r || (d.img = n, d.rect = new createjs.Rectangle(h, i, g, T), c = c || T, t.splice(u, 1), s[d.index] = [h, i, g, T, n, Math.round(-f + p * v.regX - a), Math.round(-m + p * v.regY - a)], h += g)
            }
            return {
                w: h,
                h: c
            }
        }, t._endBuild = function() {
            this.spriteSheet = new createjs.SpriteSheet(this._data), this._data = null, this.progress = 1, this.dispatchEvent("complete")
        }, t._run = function() {
            for (var e = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), t = (new Date).getTime() + e, i = !1; t > (new Date).getTime();)
                if (!this._drawNext()) {
                    i = !0;
                    break
                }
            if (i) this._endBuild();
            else {
                var n = this;
                this._timerID = setTimeout(function() {
                    n._run()
                }, 50 - e)
            }
            var s = this.progress = this._index / this._frames.length;
            if (this.hasEventListener("progress")) {
                var a = new createjs.Event("progress");
                a.progress = s, this.dispatchEvent(a)
            }
        }, t._drawNext = function() {
            var e = this._frames[this._index],
                t = e.scale * this._scale,
                i = e.rect,
                n = e.sourceRect,
                s = this._data.images[e.img],
                a = s.getContext("2d");
            return e.funct && e.funct.apply(e.scope, e.params), a.save(), a.beginPath(), a.rect(i.x, i.y, i.width, i.height), a.clip(), a.translate(Math.ceil(i.x - n.x * t), Math.ceil(i.y - n.y * t)), a.scale(t, t), e.source.draw(a), a.restore(), ++this._index < this._frames.length
        }, createjs.SpriteSheetBuilder = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.DisplayObject;
        t.htmlElement = null, t._oldMtx = null, t._visible = !1, t.DisplayObject_initialize = t.initialize, t.initialize = function(e) {
            "string" == typeof e && (e = document.getElementById(e)), this.DisplayObject_initialize(), this.mouseEnabled = !1, this.htmlElement = e;
            var t = e.style;
            t.position = "absolute", t.transformOrigin = t.WebkitTransformOrigin = t.msTransformOrigin = t.MozTransformOrigin = t.OTransformOrigin = "0% 0%"
        }, t.isVisible = function() {
            return null != this.htmlElement
        }, t.draw = function() {
            return this.visible && (this._visible = !0), !0
        }, t.cache = function() {}, t.uncache = function() {}, t.updateCache = function() {}, t.hitTest = function() {}, t.localToGlobal = function() {}, t.globalToLocal = function() {}, t.localToLocal = function() {}, t.clone = function() {
            throw "DOMElement cannot be cloned."
        }, t.toString = function() {
            return "[DOMElement (name=" + this.name + ")]"
        }, t.DisplayObject__tick = t._tick, t._tick = function(e) {
            var t = this.getStage();
            this._visible = !1, t && t.on("drawend", this._handleDrawEnd, this, !0), this.DisplayObject__tick(e)
        }, t._handleDrawEnd = function() {
            var e = this.htmlElement;
            if (e) {
                var t = e.style,
                    i = this._visible ? "visible" : "hidden";
                if (i != t.visibility && (t.visibility = i), this._visible) {
                    var n = this.getConcatenatedMatrix(this._matrix),
                        s = this._oldMtx,
                        a = 1e4;
                    if (s && s.alpha == n.alpha || (t.opacity = "" + (n.alpha * a | 0) / a, s && (s.alpha = n.alpha)), !s || s.tx != n.tx || s.ty != n.ty || s.a != n.a || s.b != n.b || s.c != n.c || s.d != n.d) {
                        var r = "matrix(" + (n.a * a | 0) / a + "," + (n.b * a | 0) / a + "," + (n.c * a | 0) / a + "," + (n.d * a | 0) / a + "," + (n.tx + .5 | 0);
                        t.transform = t.WebkitTransform = t.OTransform = t.msTransform = r + "," + (n.ty + .5 | 0) + ")", t.MozTransform = r + "px," + (n.ty + .5 | 0) + "px)", this._oldMtx = s ? s.copy(n) : n.clone()
                    }
                }
            }
        }, createjs.DOMElement = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
                this.initialize()
            },
            t = e.prototype;
        t.initialize = function() {}, t.getBounds = function() {
            return null
        }, t.applyFilter = function() {}, t.toString = function() {
            return "[Filter]"
        }, t.clone = function() {
            return new e
        }, createjs.Filter = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype = new createjs.Filter;
        t.initialize = function(e, t, i) {
            (isNaN(e) || 0 > e) && (e = 0), this.blurX = 0 | e, (isNaN(t) || 0 > t) && (t = 0), this.blurY = 0 | t, (isNaN(i) || 1 > i) && (i = 1), this.quality = 0 | i
        }, t.blurX = 0, t.blurY = 0, t.quality = 1, t.mul_table = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1], t.shg_table = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9], t.getBounds = function() {
            var e = .5 * Math.pow(this.quality, .6);
            return new createjs.Rectangle(-this.blurX * e, -this.blurY * e, 2 * this.blurX * e, 2 * this.blurY * e)
        }, t.applyFilter = function(e, t, i, n, s, a, r, o) {
            a = a || e, null == r && (r = t), null == o && (o = i);
            try {
                var l = e.getImageData(t, i, n, s)
            } catch (h) {
                return !1
            }
            var c = this.blurX / 2;
            if (isNaN(c) || 0 > c) return !1;
            c |= 0;
            var u = this.blurY / 2;
            if (isNaN(u) || 0 > u) return !1;
            if (u |= 0, 0 == c && 0 == u) return !1;
            var d = this.quality;
            (isNaN(d) || 1 > d) && (d = 1), d |= 0, d > 3 && (d = 3), 1 > d && (d = 1);
            var t, i, p, _, v, f, m, T, g, S, E, y, P, A, b, C = l.data,
                B = c + c + 1,
                w = u + u + 1,
                L = n - 1,
                O = s - 1,
                I = c + 1,
                x = u + 1,
                Y = {
                    r: 0,
                    b: 0,
                    g: 0,
                    a: 0,
                    next: null
                },
                M = Y;
            for (p = 1; B > p; p++)
                if (M = M.next = {
                        r: 0,
                        b: 0,
                        g: 0,
                        a: 0,
                        next: null
                    }, p == I);
            M.next = Y;
            var R = {
                    r: 0,
                    b: 0,
                    g: 0,
                    a: 0,
                    next: null
                },
                N = R;
            for (p = 1; w > p; p++)
                if (N = N.next = {
                        r: 0,
                        b: 0,
                        g: 0,
                        a: 0,
                        next: null
                    }, p == x);
            N.next = R;
            for (var D = null; d-- > 0;) {
                m = f = 0;
                var j = this.mul_table[c],
                    k = this.shg_table[c];
                for (i = s; --i > -1;) {
                    for (T = I * (y = C[f]), g = I * (P = C[f + 1]), S = I * (A = C[f + 2]), E = I * (b = C[f + 3]), M = Y, p = I; --p > -1;) M.r = y, M.g = P, M.b = A, M.a = b, M = M.next;
                    for (p = 1; I > p; p++) _ = f + ((p > L ? L : p) << 2), T += M.r = C[_], g += M.g = C[_ + 1], S += M.b = C[_ + 2], E += M.a = C[_ + 3], M = M.next;
                    for (D = Y, t = 0; n > t; t++) C[f++] = T * j >>> k, C[f++] = g * j >>> k, C[f++] = S * j >>> k, C[f++] = E * j >>> k, _ = m + ((_ = t + c + 1) < L ? _ : L) << 2, T -= D.r - (D.r = C[_]), g -= D.g - (D.g = C[_ + 1]), S -= D.b - (D.b = C[_ + 2]), E -= D.a - (D.a = C[_ + 3]), D = D.next;
                    m += n
                }
                for (j = this.mul_table[u], k = this.shg_table[u], t = 0; n > t; t++) {
                    for (f = t << 2, T = x * (y = C[f]), g = x * (P = C[f + 1]), S = x * (A = C[f + 2]), E = x * (b = C[f + 3]), N = R, p = 0; x > p; p++) N.r = y, N.g = P, N.b = A, N.a = b, N = N.next;
                    for (v = n, p = 1; u >= p; p++) f = v + t << 2, T += N.r = C[f], g += N.g = C[f + 1], S += N.b = C[f + 2], E += N.a = C[f + 3], N = N.next, O > p && (v += n);
                    if (f = t, D = R, d > 0)
                        for (i = 0; s > i; i++) _ = f << 2, C[_ + 3] = b = E * j >>> k, b > 0 ? (C[_] = T * j >>> k, C[_ + 1] = g * j >>> k, C[_ + 2] = S * j >>> k) : C[_] = C[_ + 1] = C[_ + 2] = 0, _ = t + ((_ = i + x) < O ? _ : O) * n << 2, T -= D.r - (D.r = C[_]), g -= D.g - (D.g = C[_ + 1]), S -= D.b - (D.b = C[_ + 2]), E -= D.a - (D.a = C[_ + 3]), D = D.next, f += n;
                    else
                        for (i = 0; s > i; i++) _ = f << 2, C[_ + 3] = b = E * j >>> k, b > 0 ? (b = 255 / b, C[_] = (T * j >>> k) * b, C[_ + 1] = (g * j >>> k) * b, C[_ + 2] = (S * j >>> k) * b) : C[_] = C[_ + 1] = C[_ + 2] = 0, _ = t + ((_ = i + x) < O ? _ : O) * n << 2, T -= D.r - (D.r = C[_]), g -= D.g - (D.g = C[_ + 1]), S -= D.b - (D.b = C[_ + 2]), E -= D.a - (D.a = C[_ + 3]), D = D.next, f += n
                }
            }
            return a.putImageData(l, r, o), !0
        }, t.clone = function() {
            return new e(this.blurX, this.blurY, this.quality)
        }, t.toString = function() {
            return "[BlurFilter]"
        }, createjs.BlurFilter = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.Filter;
        t.initialize = function(e) {
            this.alphaMap = e
        }, t.alphaMap = null, t._alphaMap = null, t._mapData = null, t.applyFilter = function(e, t, i, n, s, a, r, o) {
            if (!this.alphaMap) return !0;
            if (!this._prepAlphaMap()) return !1;
            a = a || e, null == r && (r = t), null == o && (o = i);
            try {
                var l = e.getImageData(t, i, n, s)
            } catch (h) {
                return !1
            }
            for (var c = l.data, u = this._mapData, d = c.length, p = 0; d > p; p += 4) c[p + 3] = u[p] || 0;
            return l.data = c, a.putImageData(l, r, o), !0
        }, t.clone = function() {
            return new e(this.alphaMap)
        }, t.toString = function() {
            return "[AlphaMapFilter]"
        }, t._prepAlphaMap = function() {
            if (!this.alphaMap) return !1;
            if (this.alphaMap == this._alphaMap && this._mapData) return !0;
            this._mapData = null;
            var e, t = this._alphaMap = this.alphaMap,
                i = t;
            t instanceof HTMLCanvasElement ? e = i.getContext("2d") : (i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), i.width = t.width, i.height = t.height, e = i.getContext("2d"), e.drawImage(t, 0, 0));
            try {
                var n = e.getImageData(0, 0, t.width, t.height)
            } catch (s) {
                return !1
            }
            return this._mapData = n.data, !0
        }, createjs.AlphaMapFilter = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.Filter;
        t.initialize = function(e) {
            this.mask = e
        }, t.mask = null, t.applyFilter = function(e, t, i, n, s, a, r, o) {
            return this.mask ? (a = a || e, null == r && (r = t), null == o && (o = i), a.save(), a.globalCompositeOperation = "destination-in", a.drawImage(this.mask, r, o), a.restore(), !0) : !0
        }, t.clone = function() {
            return new e(this.mask)
        }, t.toString = function() {
            return "[AlphaMaskFilter]"
        }, createjs.AlphaMaskFilter = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n, s, a, r, o) {
                this.initialize(e, t, i, n, s, a, r, o)
            },
            t = e.prototype = new createjs.Filter;
        t.redMultiplier = 1, t.greenMultiplier = 1, t.blueMultiplier = 1, t.alphaMultiplier = 1, t.redOffset = 0, t.greenOffset = 0, t.blueOffset = 0, t.alphaOffset = 0, t.initialize = function(e, t, i, n, s, a, r, o) {
            this.redMultiplier = null != e ? e : 1, this.greenMultiplier = null != t ? t : 1, this.blueMultiplier = null != i ? i : 1, this.alphaMultiplier = null != n ? n : 1, this.redOffset = s || 0, this.greenOffset = a || 0, this.blueOffset = r || 0, this.alphaOffset = o || 0
        }, t.applyFilter = function(e, t, i, n, s, a, r, o) {
            a = a || e, null == r && (r = t), null == o && (o = i);
            try {
                var l = e.getImageData(t, i, n, s)
            } catch (h) {
                return !1
            }
            for (var c = l.data, u = c.length, d = 0; u > d; d += 4) c[d] = c[d] * this.redMultiplier + this.redOffset, c[d + 1] = c[d + 1] * this.greenMultiplier + this.greenOffset, c[d + 2] = c[d + 2] * this.blueMultiplier + this.blueOffset, c[d + 3] = c[d + 3] * this.alphaMultiplier + this.alphaOffset;
            return a.putImageData(l, r, o), !0
        }, t.toString = function() {
            return "[ColorFilter]"
        }, t.clone = function() {
            return new e(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
        }, createjs.ColorFilter = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i, n) {
                this.initialize(e, t, i, n)
            },
            t = e.prototype = [];
        e.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10], e.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], e.LENGTH = e.IDENTITY_MATRIX.length, t.initialize = function(e, t, i, n) {
            return this.reset(), this.adjustColor(e, t, i, n), this
        }, t.reset = function() {
            return this.copyMatrix(e.IDENTITY_MATRIX)
        }, t.adjustColor = function(e, t, i, n) {
            return this.adjustHue(n), this.adjustContrast(t), this.adjustBrightness(e), this.adjustSaturation(i)
        }, t.adjustBrightness = function(e) {
            return 0 == e || isNaN(e) ? this : (e = this._cleanValue(e, 255), this._multiplyMatrix([1, 0, 0, 0, e, 0, 1, 0, 0, e, 0, 0, 1, 0, e, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this)
        }, t.adjustContrast = function(t) {
            if (0 == t || isNaN(t)) return this;
            t = this._cleanValue(t, 100);
            var i;
            return 0 > t ? i = 127 + t / 100 * 127 : (i = t % 1, i = 0 == i ? e.DELTA_INDEX[t] : e.DELTA_INDEX[t << 0] * (1 - i) + e.DELTA_INDEX[(t << 0) + 1] * i, i = 127 * i + 127), this._multiplyMatrix([i / 127, 0, 0, 0, .5 * (127 - i), 0, i / 127, 0, 0, .5 * (127 - i), 0, 0, i / 127, 0, .5 * (127 - i), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
        }, t.adjustSaturation = function(e) {
            if (0 == e || isNaN(e)) return this;
            e = this._cleanValue(e, 100);
            var t = 1 + (e > 0 ? 3 * e / 100 : e / 100),
                i = .3086,
                n = .6094,
                s = .082;
            return this._multiplyMatrix([i * (1 - t) + t, n * (1 - t), s * (1 - t), 0, 0, i * (1 - t), n * (1 - t) + t, s * (1 - t), 0, 0, i * (1 - t), n * (1 - t), s * (1 - t) + t, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
        }, t.adjustHue = function(e) {
            if (0 == e || isNaN(e)) return this;
            e = this._cleanValue(e, 180) / 180 * Math.PI;
            var t = Math.cos(e),
                i = Math.sin(e),
                n = .213,
                s = .715,
                a = .072;
            return this._multiplyMatrix([n + t * (1 - n) + i * -n, s + t * -s + i * -s, a + t * -a + i * (1 - a), 0, 0, n + t * -n + .143 * i, s + t * (1 - s) + .14 * i, a + t * -a + i * -.283, 0, 0, n + t * -n + i * -(1 - n), s + t * -s + i * s, a + t * (1 - a) + i * a, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this
        }, t.concat = function(t) {
            return t = this._fixMatrix(t), t.length != e.LENGTH ? this : (this._multiplyMatrix(t), this)
        }, t.clone = function() {
            return new e(this)
        }, t.toArray = function() {
            return this.slice(0, e.LENGTH)
        }, t.copyMatrix = function(t) {
            for (var i = e.LENGTH, n = 0; i > n; n++) this[n] = t[n];
            return this
        }, t._multiplyMatrix = function(e) {
            for (var t = [], i = 0; 5 > i; i++) {
                for (var n = 0; 5 > n; n++) t[n] = this[n + 5 * i];
                for (var n = 0; 5 > n; n++) {
                    for (var s = 0, a = 0; 5 > a; a++) s += e[n + 5 * a] * t[a];
                    this[n + 5 * i] = s
                }
            }
        }, t._cleanValue = function(e, t) {
            return Math.min(t, Math.max(-t, e))
        }, t._fixMatrix = function(t) {
            return t instanceof e && (t = t.slice(0)), t.length < e.LENGTH ? t = t.slice(0, t.length).concat(e.IDENTITY_MATRIX.slice(t.length, e.LENGTH)) : t.length > e.LENGTH && (t = t.slice(0, e.LENGTH)), t
        }, createjs.ColorMatrix = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e) {
                this.initialize(e)
            },
            t = e.prototype = new createjs.Filter;
        t.matrix = null, t.initialize = function(e) {
            this.matrix = e
        }, t.applyFilter = function(e, t, i, n, s, a, r, o) {
            a = a || e, null == r && (r = t), null == o && (o = i);
            try {
                var l = e.getImageData(t, i, n, s)
            } catch (h) {
                return !1
            }
            for (var c, u, d, p, _ = l.data, v = _.length, f = this.matrix, m = f[0], T = f[1], g = f[2], S = f[3], E = f[4], y = f[5], P = f[6], A = f[7], b = f[8], C = f[9], B = f[10], w = f[11], L = f[12], O = f[13], I = f[14], x = f[15], Y = f[16], M = f[17], R = f[18], N = f[19], D = 0; v > D; D += 4) c = _[D], u = _[D + 1], d = _[D + 2], p = _[D + 3], _[D] = c * m + u * T + d * g + p * S + E, _[D + 1] = c * y + u * P + d * A + p * b + C, _[D + 2] = c * B + u * w + d * L + p * O + I, _[D + 3] = c * x + u * Y + d * M + p * R + N;
            return a.putImageData(l, r, o), !0
        }, t.toString = function() {
            return "[ColorMatrixFilter]"
        }, t.clone = function() {
            return new e(this.matrix)
        }, createjs.ColorMatrixFilter = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
            throw "Touch cannot be instantiated"
        };
        e.isSupported = function() {
            return "ontouchstart" in window || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0
        }, e.enable = function(t, i, n) {
            return t && t.canvas && e.isSupported() ? (t.__touch = {
                pointers: {},
                multitouch: !i,
                preventDefault: !n,
                count: 0
            }, "ontouchstart" in window ? e._IOS_enable(t) : window.navigator.msPointerEnabled && e._IE_enable(t), !0) : !1
        }, e.disable = function(t) {
            t && ("ontouchstart" in window ? e._IOS_disable(t) : window.navigator.msPointerEnabled && e._IE_disable(t))
        }, e._IOS_enable = function(t) {
            var i = t.canvas,
                n = t.__touch.f = function(i) {
                    e._IOS_handleEvent(t, i)
                };
            i.addEventListener("touchstart", n, !1), i.addEventListener("touchmove", n, !1), i.addEventListener("touchend", n, !1), i.addEventListener("touchcancel", n, !1)
        }, e._IOS_disable = function(e) {
            var t = e.canvas;
            if (t) {
                var i = e.__touch.f;
                t.removeEventListener("touchstart", i, !1), t.removeEventListener("touchmove", i, !1), t.removeEventListener("touchend", i, !1), t.removeEventListener("touchcancel", i, !1)
            }
        }, e._IOS_handleEvent = function(e, t) {
            if (e) {
                e.__touch.preventDefault && t.preventDefault && t.preventDefault();
                for (var i = t.changedTouches, n = t.type, s = 0, a = i.length; a > s; s++) {
                    var r = i[s],
                        o = r.identifier;
                    r.target == e.canvas && ("touchstart" == n ? this._handleStart(e, o, t, r.pageX, r.pageY) : "touchmove" == n ? this._handleMove(e, o, t, r.pageX, r.pageY) : ("touchend" == n || "touchcancel" == n) && this._handleEnd(e, o, t))
                }
            }
        }, e._IE_enable = function(t) {
            var i = t.canvas,
                n = t.__touch.f = function(i) {
                    e._IE_handleEvent(t, i)
                };
            i.addEventListener("MSPointerDown", n, !1), window.addEventListener("MSPointerMove", n, !1), window.addEventListener("MSPointerUp", n, !1), window.addEventListener("MSPointerCancel", n, !1), t.__touch.preventDefault && (i.style.msTouchAction = "none"), t.__touch.activeIDs = {}
        }, e._IE_disable = function(e) {
            var t = e.__touch.f;
            window.removeEventListener("MSPointerMove", t, !1), window.removeEventListener("MSPointerUp", t, !1), window.removeEventListener("MSPointerCancel", t, !1), e.canvas && e.canvas.removeEventListener("MSPointerDown", t, !1)
        }, e._IE_handleEvent = function(e, t) {
            if (e) {
                e.__touch.preventDefault && t.preventDefault && t.preventDefault();
                var i = t.type,
                    n = t.pointerId,
                    s = e.__touch.activeIDs;
                if ("MSPointerDown" == i) {
                    if (t.srcElement != e.canvas) return;
                    s[n] = !0, this._handleStart(e, n, t, t.pageX, t.pageY)
                } else s[n] && ("MSPointerMove" == i ? this._handleMove(e, n, t, t.pageX, t.pageY) : ("MSPointerUp" == i || "MSPointerCancel" == i) && (delete s[n], this._handleEnd(e, n, t)))
            }
        }, e._handleStart = function(e, t, i, n, s) {
            var a = e.__touch;
            if (a.multitouch || !a.count) {
                var r = a.pointers;
                r[t] || (r[t] = !0, a.count++, e._handlePointerDown(t, i, n, s))
            }
        }, e._handleMove = function(e, t, i, n, s) {
            e.__touch.pointers[t] && e._handlePointerMove(t, i, n, s)
        }, e._handleEnd = function(e, t, i) {
            var n = e.__touch,
                s = n.pointers;
            s[t] && (n.count--, e._handlePointerUp(t, i, !0), delete s[t])
        }, createjs.Touch = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = createjs.EaselJS = createjs.EaselJS || {};
        e.version = "NEXT", e.buildDate = "Sun, 06 Oct 2013 10:56:52 GMT"
    }(),
    function() {
        var e = createjs.Stage.prototype._handlePointerDown,
            t = createjs.Stage.prototype._handlePointerUp,
            i = !1;
        navigator.userAgent.indexOf("Android") > -1 && (createjs.Stage.prototype._handlePointerDown = function(t, n, s, a) {
            n.touches && (i = !0, this.enableDOMEvents(!1)), i ? n.touches && "undefined" != typeof n.touches[0].pageX && (n.screenX = n.touches[0].pageX, n.screenY = n.touches[0].pageY, e.call(this, t, n, s, a)) : (n.screenX = n.x, n.screenY = n.y, e.call(this, t, n, s, a))
        }, createjs.Stage.prototype._handlePointerUp = function(e, n, s) {
            n.changedTouches && (i = !0), i ? n.changedTouches && "undefined" != typeof n.changedTouches[0].pageX && (n.screenX = n.changedTouches[0].pageX, n.screenY = n.changedTouches[0].pageY, t.call(this, e, n, s)) : (n.screenX = n.x, n.screenY = n.y, t.call(this, e, n, s))
        })
    }(), this.createjs = this.createjs || {},
    function() {
        var e = createjs.PreloadJS = createjs.PreloadJS || {};
        e.version = "0.4.0", e.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype;
        t.type = null, t.target = null, t.currentTarget = null, t.eventPhase = 0, t.bubbles = !1, t.cancelable = !1, t.timeStamp = 0, t.defaultPrevented = !1, t.propagationStopped = !1, t.immediatePropagationStopped = !1, t.removed = !1, t.initialize = function(e, t, i) {
            this.type = e, this.bubbles = t, this.cancelable = i, this.timeStamp = (new Date).getTime()
        }, t.preventDefault = function() {
            this.defaultPrevented = !0
        }, t.stopPropagation = function() {
            this.propagationStopped = !0
        }, t.stopImmediatePropagation = function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        }, t.remove = function() {
            this.removed = !0
        }, t.clone = function() {
            return new e(this.type, this.bubbles, this.cancelable)
        }, t.toString = function() {
            return "[Event (type=" + this.type + ")]"
        }, createjs.Event = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {},
            t = e.prototype;
        e.initialize = function(e) {
            e.addEventListener = t.addEventListener, e.on = t.on, e.removeEventListener = e.off = t.removeEventListener, e.removeAllEventListeners = t.removeAllEventListeners, e.hasEventListener = t.hasEventListener, e.dispatchEvent = t.dispatchEvent, e._dispatchEvent = t._dispatchEvent
        }, t._listeners = null, t._captureListeners = null, t.initialize = function() {}, t.addEventListener = function(e, t, i) {
            var n;
            n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
            var s = n[e];
            return s && this.removeEventListener(e, t, i), s = n[e], s ? s.push(t) : n[e] = [t], t
        }, t.on = function(e, t, i, n, s, a) {
            return t.handleEvent && (i = i || t, t = t.handleEvent), i = i || this, this.addEventListener(e, function(e) {
                t.call(i, e, s), n && e.remove()
            }, a)
        }, t.removeEventListener = function(e, t, i) {
            var n = i ? this._captureListeners : this._listeners;
            if (n) {
                var s = n[e];
                if (s)
                    for (var a = 0, r = s.length; r > a; a++)
                        if (s[a] == t) {
                            1 == r ? delete n[e] : s.splice(a, 1);
                            break
                        }
            }
        }, t.off = t.removeEventListener, t.removeAllEventListeners = function(e) {
            e ? (this._listeners && delete this._listeners[e], this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
        }, t.dispatchEvent = function(e, t) {
            if ("string" == typeof e) {
                var i = this._listeners;
                if (!i || !i[e]) return !1;
                e = new createjs.Event(e)
            }
            if (e.target = t || this, e.bubbles && this.parent) {
                for (var n = this, s = [n]; n.parent;) s.push(n = n.parent);
                var a, r = s.length;
                for (a = r - 1; a >= 0 && !e.propagationStopped; a--) s[a]._dispatchEvent(e, 1 + (0 == a));
                for (a = 1; r > a && !e.propagationStopped; a++) s[a]._dispatchEvent(e, 3)
            } else this._dispatchEvent(e, 2);
            return e.defaultPrevented
        }, t.hasEventListener = function(e) {
            var t = this._listeners,
                i = this._captureListeners;
            return !!(t && t[e] || i && i[e])
        }, t.toString = function() {
            return "[EventDispatcher]"
        }, t._dispatchEvent = function(e, t) {
            var i, n = 1 == t ? this._captureListeners : this._listeners;
            if (e && n) {
                var s = n[e.type];
                if (!s || !(i = s.length)) return;
                e.currentTarget = this, e.eventPhase = t, e.removed = !1, s = s.slice();
                for (var a = 0; i > a && !e.immediatePropagationStopped; a++) {
                    var r = s[a];
                    r.handleEvent ? r.handleEvent(e) : r(e), e.removed && (this.off(e.type, r, 1 == t), e.removed = !1)
                }
            }
        }, createjs.EventDispatcher = e
    }(), this.createjs = this.createjs || {},
    function() {
        createjs.indexOf = function(e, t) {
            for (var i = 0, n = e.length; n > i; i++)
                if (t === e[i]) return i;
            return -1
        }
    }(), this.createjs = this.createjs || {},
    function() {
        createjs.proxy = function(e, t) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function() {
                return e.apply(t, Array.prototype.slice.call(arguments, 0).concat(i))
            }
        }
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
            this.init()
        };
        e.prototype = {};
        var t = e.prototype,
            i = e;
        i.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/, t.loaded = !1, t.canceled = !1, t.progress = 0, t._item = null, t._basePath = null, t.addEventListener = null, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, createjs.EventDispatcher.initialize(t), t.getItem = function() {
            return this._item
        }, t.init = function() {}, t.load = function() {}, t.close = function() {}, t._sendLoadStart = function() {
            this._isCanceled() || this.dispatchEvent("loadstart")
        }, t._sendProgress = function(e) {
            if (!this._isCanceled()) {
                var t = null;
                "number" == typeof e ? (this.progress = e, t = new createjs.Event("progress"), t.loaded = this.progress, t.total = 1) : (t = e, this.progress = e.loaded / e.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)), t.progress = this.progress, this.hasEventListener("progress") && this.dispatchEvent(t)
            }
        }, t._sendComplete = function() {
            this._isCanceled() || this.dispatchEvent("complete")
        }, t._sendError = function(e) {
            !this._isCanceled() && this.hasEventListener("error") && (null == e && (e = new createjs.Event("error")), this.dispatchEvent(e))
        }, t._isCanceled = function() {
            return null == window.createjs || this.canceled ? !0 : !1
        }, t._parseURI = function(e) {
            return e ? e.match(i.FILE_PATTERN) : null
        }, t._formatQueryString = function(e, t) {
            if (null == e) throw new Error("You must specify data.");
            var i = [];
            for (var n in e) i.push(n + "=" + escape(e[n]));
            return t && (i = i.concat(t)), i.join("&")
        }, t.buildPath = function(e, t, i) {
            if (null != t) {
                var n = this._parseURI(e);
                (null == n || null == n[1] || "" == n[1]) && (e = t + e)
            }
            if (null == i) return e;
            var s = [],
                a = e.indexOf("?");
            if (-1 != a) {
                var r = e.slice(a + 1);
                s = s.concat(r.split("&"))
            }
            return -1 != a ? e.slice(0, a) + "?" + this._formatQueryString(i, s) : e + "?" + this._formatQueryString(i, s)
        }, t.toString = function() {
            return "[PreloadJS AbstractLoader]"
        }, createjs.AbstractLoader = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t) {
                this.init(e, t)
            },
            t = e.prototype = new createjs.AbstractLoader,
            n = e;
        n.LOAD_TIMEOUT = 8e3, n.BINARY = "binary", n.CSS = "css", n.IMAGE = "image", n.JAVASCRIPT = "javascript", n.JSON = "json", n.JSONP = "jsonp", n.SOUND = "sound", n.SVG = "svg", n.TEXT = "text", n.XML = "xml", n.POST = "POST", n.GET = "GET", t.useXHR = !0, t.stopOnError = !1, t.maintainScriptOrder = !0, t.next = null, t._typeCallbacks = null, t._extensionCallbacks = null, t._loadStartWasDispatched = !1, t._maxConnections = 1, t._currentlyLoadingScript = null, t._currentLoads = null, t._loadQueue = null, t._loadQueueBackup = null, t._loadItemsById = null, t._loadItemsBySrc = null, t._loadedResults = null, t._loadedRawResults = null, t._numItems = 0, t._numItemsLoaded = 0, t._scriptOrder = null, t._loadedScripts = null, t.init = function(e, t) {
            this._numItems = this._numItemsLoaded = 0, this._paused = !1, this._loadStartWasDispatched = !1, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._scriptOrder = [], this._loadedScripts = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._typeCallbacks = {}, this._extensionCallbacks = {}, this._basePath = t, this.setUseXHR(e)
        }, t.setUseXHR = function(e) {
            return this.useXHR = 0 != e && null != window.XMLHttpRequest, this.useXHR
        }, t.removeAll = function() {
            this.remove()
        }, t.remove = function(e) {
            var t = null;
            if (!e || e instanceof Array) {
                if (e) t = e;
                else if (arguments.length > 0) return
            } else t = [e];
            var i = !1;
            if (t) {
                for (; t.length;) {
                    var n = t.pop(),
                        s = this.getResult(n);
                    for (a = this._loadQueue.length - 1; a >= 0; a--)
                        if (r = this._loadQueue[a].getItem(), r.id == n || r.src == n) {
                            this._loadQueue.splice(a, 1)[0].cancel();
                            break
                        }
                    for (a = this._loadQueueBackup.length - 1; a >= 0; a--)
                        if (r = this._loadQueueBackup[a].getItem(), r.id == n || r.src == n) {
                            this._loadQueueBackup.splice(a, 1)[0].cancel();
                            break
                        }
                    if (s) delete this._loadItemsById[s.id], delete this._loadItemsBySrc[s.src], this._disposeItem(s);
                    else
                        for (var a = this._currentLoads.length - 1; a >= 0; a--) {
                            var r = this._currentLoads[a].getItem();
                            if (r.id == n || r.src == n) {
                                this._currentLoads.splice(a, 1)[0].cancel(), i = !0;
                                break
                            }
                        }
                }
                i && this._loadNext()
            } else {
                this.close();
                for (var o in this._loadItemsById) this._disposeItem(this._loadItemsById[o]);
                this.init(this.useXHR)
            }
        }, t.reset = function() {
            this.close();
            for (var e in this._loadItemsById) this._disposeItem(this._loadItemsById[e]);
            var t = [];
            for (i = 0, l = this._loadQueueBackup.length; l > i; i++) t.push(this._loadQueueBackup[i].getItem());
            this.loadManifest(t, !1)
        }, n.isBinary = function(e) {
            switch (e) {
                case createjs.LoadQueue.IMAGE:
                case createjs.LoadQueue.BINARY:
                    return !0;
                default:
                    return !1
            }
        }, t.installPlugin = function(e) {
            if (null != e && null != e.getPreloadHandlers) {
                var t = e.getPreloadHandlers();
                if (null != t.types)
                    for (var i = 0, n = t.types.length; n > i; i++) this._typeCallbacks[t.types[i]] = t.callback;
                if (null != t.extensions)
                    for (i = 0, n = t.extensions.length; n > i; i++) this._extensionCallbacks[t.extensions[i]] = t.callback
            }
        }, t.setMaxConnections = function(e) {
            this._maxConnections = e, !this._paused && this._loadQueue.length > 0 && this._loadNext()
        }, t.loadFile = function(e, t, i) {
            if (null == e) {
                var n = new createjs.Event("error");
                return n.text = "PRELOAD_NO_FILE", void this._sendError(n)
            }
            this._addItem(e, i), this.setPaused(t !== !1 ? !1 : !0)
        }, t.loadManifest = function(e, t, i) {
            var n = null;
            if (e instanceof Array) {
                if (0 == e.length) {
                    var s = new createjs.Event("error");
                    return s.text = "PRELOAD_MANIFEST_EMPTY", void this._sendError(s)
                }
                n = e
            } else {
                if (null == e) {
                    var s = new createjs.Event("error");
                    return s.text = "PRELOAD_MANIFEST_NULL", void this._sendError(s)
                }
                n = [e]
            }
            for (var a = 0, r = n.length; r > a; a++) this._addItem(n[a], i);
            this.setPaused(t !== !1 ? !1 : !0)
        }, t.load = function() {
            this.setPaused(!1)
        }, t.getItem = function(e) {
            return this._loadItemsById[e] || this._loadItemsBySrc[e]
        }, t.getResult = function(e, t) {
            var i = this._loadItemsById[e] || this._loadItemsBySrc[e];
            if (null == i) return null;
            var n = i.id;
            return t && this._loadedRawResults[n] ? this._loadedRawResults[n] : this._loadedResults[n]
        }, t.setPaused = function(e) {
            this._paused = e, this._paused || this._loadNext()
        }, t.close = function() {
            for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
            this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1
        }, t._addItem = function(e, t) {
            var i = this._createLoadItem(e);
            if (null != i) {
                var n = this._createLoader(i, t);
                null != n && (this._loadQueue.push(n), this._loadQueueBackup.push(n), this._numItems++, this._updateProgress(), this.maintainScriptOrder && i.type == createjs.LoadQueue.JAVASCRIPT && n instanceof createjs.XHRLoader && (this._scriptOrder.push(i), this._loadedScripts.push(null)))
            }
        }, t._createLoadItem = function(e) {
            var t = null;
            switch (typeof e) {
                case "string":
                    t = {
                        src: e
                    };
                    break;
                case "object":
                    t = window.HTMLAudioElement && e instanceof HTMLAudioElement ? {
                        tag: e,
                        src: t.tag.src,
                        type: createjs.LoadQueue.SOUND
                    } : e;
                    break;
                default:
                    return null
            }
            var i = this._parseURI(t.src);
            if (null != i && (t.ext = i[5]), null == t.type && (t.type = this._getTypeByExtension(t.ext)), t.type == createjs.LoadQueue.JSON && null != t.callback && (t.type = createjs.LoadQueue.JSONP), t.type == createjs.LoadQueue.JSONP && null == t.callback) throw new Error("callback is required for loading JSONP requests.");
            null == t.tag && (t.tag = this._createTag(t.type)), (null == t.id || "" == t.id) && (t.id = t.src);
            var n = this._typeCallbacks[t.type] || this._extensionCallbacks[t.ext];
            if (n) {
                var s = n(t.src, t.type, t.id, t.data);
                if (s === !1) return null;
                s === !0 || (null != s.src && (t.src = s.src), null != s.id && (t.id = s.id), null != s.tag && s.tag.load instanceof Function && (t.tag = s.tag), null != s.completeHandler && (t.completeHandler = s.completeHandler)), s.type && (t.type = s.type), i = this._parseURI(t.src), null != i && null != i[5] && (t.ext = i[5].toLowerCase())
            }
            return this._loadItemsById[t.id] = t, this._loadItemsBySrc[t.src] = t, t
        }, t._createLoader = function(e, t) {
            var i = this.useXHR;
            switch (e.type) {
                case createjs.LoadQueue.JSON:
                case createjs.LoadQueue.XML:
                case createjs.LoadQueue.TEXT:
                    i = !0;
                    break;
                case createjs.LoadQueue.SOUND:
                case createjs.LoadQueue.JSONP:
                    i = !1;
                    break;
                case null:
                    return null
            }
            return null == t && (t = this._basePath), i ? new createjs.XHRLoader(e, t) : new createjs.TagLoader(e, t)
        }, t._loadNext = function() {
            if (!this._paused) {
                this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
                for (var e = 0; e < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); e++) {
                    var t = this._loadQueue[e];
                    if (this.maintainScriptOrder && t instanceof createjs.TagLoader && t.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
                        if (this._currentlyLoadingScript) continue;
                        this._currentlyLoadingScript = !0
                    }
                    this._loadQueue.splice(e, 1), e--, this._loadItem(t)
                }
            }
        }, t._loadItem = function(e) {
            e.addEventListener("progress", createjs.proxy(this._handleProgress, this)), e.addEventListener("complete", createjs.proxy(this._handleFileComplete, this)), e.addEventListener("error", createjs.proxy(this._handleFileError, this)), this._currentLoads.push(e), this._sendFileStart(e.getItem()), e.load()
        }, t._handleFileError = function(e) {
            var t = e.target;
            this._numItemsLoaded++, this._updateProgress();
            var e = new createjs.Event("error");
            e.text = "FILE_LOAD_ERROR", e.item = t.getItem(), this._sendError(e), this.stopOnError || (this._removeLoadItem(t), this._loadNext())
        }, t._handleFileComplete = function(e) {
            var t = e.target,
                i = t.getItem();
            if (this._loadedResults[i.id] = t.getResult(), t instanceof createjs.XHRLoader && (this._loadedRawResults[i.id] = t.getResult(!0)), this._removeLoadItem(t), this.maintainScriptOrder && i.type == createjs.LoadQueue.JAVASCRIPT) {
                if (!(t instanceof createjs.TagLoader)) return this._loadedScripts[createjs.indexOf(this._scriptOrder, i)] = i, void this._checkScriptLoadOrder(t);
                this._currentlyLoadingScript = !1
            }
            this._processFinishedLoad(i, t)
        }, t._processFinishedLoad = function(e, t) {
            this._numItemsLoaded++, this._updateProgress(), this._sendFileComplete(e, t), this._loadNext()
        }, t._checkScriptLoadOrder = function() {
            for (var e = this._loadedScripts.length, t = 0; e > t; t++) {
                var i = this._loadedScripts[t];
                if (null === i) break;
                i !== !0 && (this._processFinishedLoad(i), this._loadedScripts[t] = !0, t--, e--)
            }
        }, t._removeLoadItem = function(e) {
            for (var t = this._currentLoads.length, i = 0; t > i; i++)
                if (this._currentLoads[i] == e) {
                    this._currentLoads.splice(i, 1);
                    break
                }
        }, t._handleProgress = function(e) {
            var t = e.target;
            this._sendFileProgress(t.getItem(), t.progress), this._updateProgress()
        }, t._updateProgress = function() {
            var e = this._numItemsLoaded / this._numItems,
                t = this._numItems - this._numItemsLoaded;
            if (t > 0) {
                for (var i = 0, n = 0, s = this._currentLoads.length; s > n; n++) i += this._currentLoads[n].progress;
                e += i / t * (t / this._numItems)
            }
            this._sendProgress(e)
        }, t._disposeItem = function(e) {
            delete this._loadedResults[e.id], delete this._loadedRawResults[e.id], delete this._loadItemsById[e.id], delete this._loadItemsBySrc[e.src]
        }, t._createTag = function(e) {
            var t = null;
            switch (e) {
                case createjs.LoadQueue.IMAGE:
                    return document.createElement("img");
                case createjs.LoadQueue.SOUND:
                    return t = document.createElement("audio"), t.autoplay = !1, t;
                case createjs.LoadQueue.JSONP:
                case createjs.LoadQueue.JAVASCRIPT:
                    return t = document.createElement("script"), t.type = "text/javascript", t;
                case createjs.LoadQueue.CSS:
                    return t = document.createElement(this.useXHR ? "style" : "link"), t.rel = "stylesheet", t.type = "text/css", t;
                case createjs.LoadQueue.SVG:
                    return this.useXHR ? t = document.createElement("svg") : (t = document.createElement("object"), t.type = "image/svg+xml"), t
            }
            return null
        }, t._getTypeByExtension = function(e) {
            if (null == e) return createjs.LoadQueue.TEXT;
            switch (e.toLowerCase()) {
                case "jpeg":
                case "jpg":
                case "gif":
                case "png":
                case "webp":
                case "bmp":
                    return createjs.LoadQueue.IMAGE;
                case "ogg":
                case "mp3":
                case "wav":
                    return createjs.LoadQueue.SOUND;
                case "json":
                    return createjs.LoadQueue.JSON;
                case "xml":
                    return createjs.LoadQueue.XML;
                case "css":
                    return createjs.LoadQueue.CSS;
                case "js":
                    return createjs.LoadQueue.JAVASCRIPT;
                case "svg":
                    return createjs.LoadQueue.SVG;
                default:
                    return createjs.LoadQueue.TEXT
            }
        }, t._sendFileProgress = function(e, t) {
            if (this._isCanceled()) return void this._cleanUp();
            if (this.hasEventListener("fileprogress")) {
                var i = new createjs.Event("fileprogress");
                i.progress = t, i.loaded = t, i.total = 1, i.item = e, this.dispatchEvent(i)
            }
        }, t._sendFileComplete = function(e, t) {
            if (!this._isCanceled()) {
                var i = new createjs.Event("fileload");
                i.loader = t, i.item = e, i.result = this._loadedResults[e.id], i.rawResult = this._loadedRawResults[e.id], e.completeHandler && e.completeHandler(i), this.hasEventListener("fileload") && this.dispatchEvent(i)
            }
        }, t._sendFileStart = function(e) {
            var t = new createjs.Event("filestart");
            t.item = e, this.hasEventListener("filestart") && this.dispatchEvent(t)
        }, t.toString = function() {
            return "[PreloadJS LoadQueue]"
        }, createjs.LoadQueue = e;
        var s = function() {};
        s.init = function() {
            var e = navigator.userAgent;
            s.isFirefox = e.indexOf("Firefox") > -1, s.isOpera = null != window.opera, s.isChrome = e.indexOf("Chrome") > -1, s.isIOS = e.indexOf("iPod") > -1 || e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1
        }, s.init(), createjs.LoadQueue.BrowserDetect = s
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t) {
                this.init(e, t)
            },
            t = e.prototype = new createjs.AbstractLoader;
        t._loadTimeout = null, t._tagCompleteProxy = null, t._isAudio = !1, t._tag = null, t._jsonResult = null, t.init = function(e, t) {
            this._item = e, this._basePath = t, this._tag = e.tag, this._isAudio = window.HTMLAudioElement && e.tag instanceof HTMLAudioElement, this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
        }, t.getResult = function() {
            return this._item.type == createjs.LoadQueue.JSONP ? this._jsonResult : this._tag
        }, t.cancel = function() {
            this.canceled = !0, this._clean(), this.getItem()
        }, t.load = function() {
            var e = this._item,
                t = this._tag;
            clearTimeout(this._loadTimeout), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT), this._isAudio && (t.src = null, t.preload = "auto"), t.onerror = createjs.proxy(this._handleError, this), this._isAudio ? (t.onstalled = createjs.proxy(this._handleStalled, this), t.addEventListener("canplaythrough", this._tagCompleteProxy, !1)) : (t.onload = createjs.proxy(this._handleLoad, this), t.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this));
            var i = this.buildPath(e.src, this._basePath, e.values);
            switch (e.type) {
                case createjs.LoadQueue.CSS:
                    t.href = i;
                    break;
                case createjs.LoadQueue.SVG:
                    t.data = i;
                    break;
                default:
                    t.src = i
            }
            if (e.type == createjs.LoadQueue.JSONP) {
                if (null == e.callback) throw new Error("callback is required for loading JSONP requests.");
                if (null != window[e.callback]) throw new Error('JSONP callback "' + e.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
                window[e.callback] = createjs.proxy(this._handleJSONPLoad, this)
            }(e.type == createjs.LoadQueue.SVG || e.type == createjs.LoadQueue.JSONP || e.type == createjs.LoadQueue.JSON || e.type == createjs.LoadQueue.JAVASCRIPT || e.type == createjs.LoadQueue.CSS) && (this._startTagVisibility = t.style.visibility, t.style.visibility = "hidden", (document.body || document.getElementsByTagName("body")[0]).appendChild(t)), null != t.load && t.load()
        }, t._handleJSONPLoad = function(e) {
            this._jsonResult = e
        }, t._handleTimeout = function() {
            this._clean();
            var e = new createjs.Event("error");
            e.text = "PRELOAD_TIMEOUT", this._sendError(e)
        }, t._handleStalled = function() {}, t._handleError = function() {
            this._clean();
            var e = new createjs.Event("error");
            this._sendError(e)
        }, t._handleReadyStateChange = function() {
            clearTimeout(this._loadTimeout);
            var e = this.getItem().tag;
            ("loaded" == e.readyState || "complete" == e.readyState) && this._handleLoad()
        }, t._handleLoad = function() {
            if (!this._isCanceled()) {
                var e = this.getItem(),
                    t = e.tag;
                if (!(this.loaded || this.isAudio && 4 !== t.readyState)) {
                    switch (this.loaded = !0, e.type) {
                        case createjs.LoadQueue.SVG:
                        case createjs.LoadQueue.JSONP:
                            t.style.visibility = this._startTagVisibility, (document.body || document.getElementsByTagName("body")[0]).removeChild(t)
                    }
                    this._clean(), this._sendComplete()
                }
            }
        }, t._clean = function() {
            clearTimeout(this._loadTimeout);
            var e = this.getItem().tag;
            e.onload = null, e.removeEventListener && e.removeEventListener("canplaythrough", this._tagCompleteProxy, !1), e.onstalled = null, e.onprogress = null, e.onerror = null, e.parentNode && e.parentNode.removeChild(e);
            var t = this.getItem();
            t.type == createjs.LoadQueue.JSONP && (window[t.callback] = null)
        }, t.toString = function() {
            return "[PreloadJS TagLoader]"
        }, createjs.TagLoader = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t) {
                this.init(e, t)
            },
            t = e.prototype = new createjs.AbstractLoader;
        t._request = null, t._loadTimeout = null, t._xhrLevel = 1, t._response = null, t._rawResponse = null, t.init = function(e, t) {
            this._item = e, this._basePath = t, !this._createXHR(e)
        }, t.getResult = function(e) {
            return e && this._rawResponse ? this._rawResponse : this._response
        }, t.cancel = function() {
            this.canceled = !0, this._clean(), this._request.abort()
        }, t.load = function() {
            if (null == this._request) return void this._handleError();
            this._request.onloadstart = createjs.proxy(this._handleLoadStart, this), this._request.onprogress = createjs.proxy(this._handleProgress, this), this._request.onabort = createjs.proxy(this._handleAbort, this), this._request.onerror = createjs.proxy(this._handleError, this), this._request.ontimeout = createjs.proxy(this._handleTimeout, this), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT)), this._request.onload = createjs.proxy(this._handleLoad, this), this._request.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
            try {
                this._item.values && this._item.method != createjs.LoadQueue.GET ? this._item.method == createjs.LoadQueue.POST && this._request.send(this._formatQueryString(this._item.values)) : this._request.send()
            } catch (e) {
                var t = new createjs.Event("error");
                t.error = e, this._sendError(t)
            }
        }, t.getAllResponseHeaders = function() {
            return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
        }, t.getResponseHeader = function(e) {
            return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(e) : null
        }, t._handleProgress = function(e) {
            if (e && !(e.loaded > 0 && 0 == e.total)) {
                var t = new createjs.Event("progress");
                t.loaded = e.loaded, t.total = e.total, this._sendProgress(t)
            }
        }, t._handleLoadStart = function() {
            clearTimeout(this._loadTimeout), this._sendLoadStart()
        }, t._handleAbort = function(e) {
            this._clean();
            var e = new createjs.Event("error");
            e.text = "XHR_ABORTED", this._sendError(e)
        }, t._handleError = function() {
            this._clean();
            var e = new createjs.Event("error");
            this._sendError(e)
        }, t._handleReadyStateChange = function() {
            4 == this._request.readyState && this._handleLoad()
        }, t._handleLoad = function() {
            if (!this.loaded) {
                if (this.loaded = !0, !this._checkError()) return void this._handleError();
                this._response = this._getResponse(), this._clean();
                var e = this._generateTag();
                e && this._sendComplete()
            }
        }, t._handleTimeout = function(e) {
            this._clean();
            var t = new createjs.Event("error");
            t.text = "PRELOAD_TIMEOUT", this._sendError(e)
        }, t._checkError = function() {
            var e = parseInt(this._request.status);
            switch (e) {
                case 404:
                case 0:
                    return !1
            }
            return !0
        }, t._getResponse = function() {
            if (null != this._response) return this._response;
            if (null != this._request.response) return this._request.response;
            try {
                if (null != this._request.responseText) return this._request.responseText
            } catch (e) {}
            try {
                if (null != this._request.responseXML) return this._request.responseXML
            } catch (e) {}
            return null
        }, t._createXHR = function(e) {
            var t = document.createElement("a");
            t.href = this.buildPath(e.src, this._basePath);
            var i = document.createElement("a");
            i.href = location.href;
            var n = "" != t.hostname && (t.port != i.port || t.protocol != i.protocol || t.hostname != i.hostname),
                s = null;
            if (n && window.XDomainRequest) s = new XDomainRequest;
            else if (window.XMLHttpRequest) s = new XMLHttpRequest;
            else try {
                s = new ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (a) {
                try {
                    s = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (a) {
                    try {
                        s = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (a) {
                        return !1
                    }
                }
            }
            e.type == createjs.LoadQueue.TEXT && s.overrideMimeType && s.overrideMimeType("text/plain; charset=x-user-defined"), this._xhrLevel = "string" == typeof s.responseType ? 2 : 1;
            var r = null;
            return r = e.method == createjs.LoadQueue.GET ? this.buildPath(e.src, this._basePath, e.values) : this.buildPath(e.src, this._basePath), s.open(e.method || createjs.LoadQueue.GET, r, !0), n && s instanceof XMLHttpRequest && 1 == this._xhrLevel && s.setRequestHeader("Origin", location.origin), e.values && e.method == createjs.LoadQueue.POST && s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), createjs.LoadQueue.isBinary(e.type) && (s.responseType = "arraybuffer"), this._request = s, !0
        }, t._clean = function() {
            clearTimeout(this._loadTimeout);
            var e = this._request;
            e.onloadstart = null, e.onprogress = null, e.onabort = null, e.onerror = null, e.onload = null, e.ontimeout = null, e.onloadend = null, e.onreadystatechange = null
        }, t._generateTag = function() {
            var e = this._item.type,
                t = this._item.tag;
            switch (e) {
                case createjs.LoadQueue.IMAGE:
                    return t.onload = createjs.proxy(this._handleTagReady, this), t.src = this.buildPath(this._item.src, this._basePath, this._item.values), this._rawResponse = this._response, this._response = t, !1;
                case createjs.LoadQueue.JAVASCRIPT:
                    return t = document.createElement("script"), t.text = this._response, this._rawResponse = this._response, this._response = t, !0;
                case createjs.LoadQueue.CSS:
                    var i = document.getElementsByTagName("head")[0];
                    if (i.appendChild(t), t.styleSheet) t.styleSheet.cssText = this._response;
                    else {
                        var n = document.createTextNode(this._response);
                        t.appendChild(n)
                    }
                    return this._rawResponse = this._response, this._response = t, !0;
                case createjs.LoadQueue.XML:
                    var s = this._parseXML(this._response, "text/xml");
                    return this._response = s, !0;
                case createjs.LoadQueue.SVG:
                    var s = this._parseXML(this._response, "image/svg+xml");
                    return this._rawResponse = this._response, null != s.documentElement ? (t.appendChild(s.documentElement), this._response = t) : this._response = s, !0;
                case createjs.LoadQueue.JSON:
                    var a = {};
                    try {
                        a = JSON.parse(this._response)
                    } catch (r) {
                        a = r
                    }
                    return this._rawResponse = this._response, this._response = a, !0
            }
            return !0
        }, t._parseXML = function(e, t) {
            var i = null;
            if (window.DOMParser) {
                var n = new DOMParser;
                i = n.parseFromString(e, t)
            } else i = new ActiveXObject("Microsoft.XMLDOM"), i.async = !1, i.loadXML(e);
            return i
        }, t._handleTagReady = function() {
            this._sendComplete()
        }, t.toString = function() {
            return "[PreloadJS XHRLoader]"
        }, createjs.XHRLoader = e
    }(), "object" != typeof JSON && (JSON = {}),
    function() {
        function f(e) {
            return 10 > e ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var i, n, s, a, r, o = gap,
                l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l) return "null";
                    if (gap += indent, r = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (a = l.length, i = 0; a > i; i += 1) r[i] = str(i, l) || "null";
                        return s = 0 === r.length ? "[]" : gap ? "[\n" + gap + r.join(",\n" + gap) + "\n" + o + "]" : "[" + r.join(",") + "]", gap = o, s
                    }
                    if (rep && "object" == typeof rep)
                        for (a = rep.length, i = 0; a > i; i += 1) "string" == typeof rep[i] && (n = rep[i], s = str(n, l), s && r.push(quote(n) + (gap ? ": " : ":") + s));
                    else
                        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (s = str(n, l), s && r.push(quote(n) + (gap ? ": " : ":") + s));
                    return s = 0 === r.length ? "{}" : gap ? "{\n" + gap + r.join(",\n" + gap) + "\n" + o + "}" : "{" + r.join(",") + "}", gap = o, s
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(e, t, i) {
            var n;
            if (gap = "", indent = "", "number" == typeof i)
                for (n = 0; i > n; n += 1) indent += " ";
            else "string" == typeof i && (indent = i);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var i, n, s = e[t];
                if (s && "object" == typeof s)
                    for (i in s) Object.prototype.hasOwnProperty.call(s, i) && (n = walk(s, i), void 0 !== n ? s[i] = n : delete s[i]);
                return reviver.call(e, t, s)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype;
        t.type = null, t.target = null, t.currentTarget = null, t.eventPhase = 0, t.bubbles = !1, t.cancelable = !1, t.timeStamp = 0, t.defaultPrevented = !1, t.propagationStopped = !1, t.immediatePropagationStopped = !1, t.removed = !1, t.initialize = function(e, t, i) {
            this.type = e, this.bubbles = t, this.cancelable = i, this.timeStamp = (new Date).getTime()
        }, t.preventDefault = function() {
            this.defaultPrevented = !0
        }, t.stopPropagation = function() {
            this.propagationStopped = !0
        }, t.stopImmediatePropagation = function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        }, t.remove = function() {
            this.removed = !0
        }, t.clone = function() {
            return new e(this.type, this.bubbles, this.cancelable)
        }, t.toString = function() {
            return "[Event (type=" + this.type + ")]"
        }, createjs.Event = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
                this.initialize()
            },
            t = e.prototype;
        e.initialize = function(e) {
            e.addEventListener = t.addEventListener, e.on = t.on, e.removeEventListener = e.off = t.removeEventListener, e.removeAllEventListeners = t.removeAllEventListeners, e.hasEventListener = t.hasEventListener, e.dispatchEvent = t.dispatchEvent, e._dispatchEvent = t._dispatchEvent
        }, t._listeners = null, t._captureListeners = null, t.initialize = function() {}, t.addEventListener = function(e, t, i) {
            var n;
            n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
            var s = n[e];
            return s && this.removeEventListener(e, t, i), s = n[e], s ? s.push(t) : n[e] = [t], t
        }, t.on = function(e, t, i, n, s, a) {
            return t.handleEvent && (i = i || t, t = t.handleEvent), i = i || this, this.addEventListener(e, function(e) {
                t.call(i, e, s), n && e.remove()
            }, a)
        }, t.removeEventListener = function(e, t, i) {
            var n = i ? this._captureListeners : this._listeners;
            if (n) {
                var s = n[e];
                if (s)
                    for (var a = 0, r = s.length; r > a; a++)
                        if (s[a] == t) {
                            1 == r ? delete n[e] : s.splice(a, 1);
                            break
                        }
            }
        }, t.off = t.removeEventListener, t.removeAllEventListeners = function(e) {
            e ? (this._listeners && delete this._listeners[e], this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
        }, t.dispatchEvent = function(e, t) {
            if ("string" == typeof e) {
                var i = this._listeners;
                if (!i || !i[e]) return !1;
                e = new createjs.Event(e)
            }
            if (e.target = t || this, e.bubbles && this.parent) {
                for (var n = this, s = [n]; n.parent;) s.push(n = n.parent);
                var a, r = s.length;
                for (a = r - 1; a >= 0 && !e.propagationStopped; a--) s[a]._dispatchEvent(e, 1 + (0 == a));
                for (a = 1; r > a && !e.propagationStopped; a++) s[a]._dispatchEvent(e, 3)
            } else this._dispatchEvent(e, 2);
            return e.defaultPrevented
        }, t.hasEventListener = function(e) {
            var t = this._listeners,
                i = this._captureListeners;
            return !!(t && t[e] || i && i[e])
        }, t.toString = function() {
            return "[EventDispatcher]"
        }, t._dispatchEvent = function(e, t) {
            var i, n = 1 == t ? this._captureListeners : this._listeners;
            if (e && n) {
                var s = n[e.type];
                if (!s || !(i = s.length)) return;
                e.currentTarget = this, e.eventPhase = t, e.removed = !1, s = s.slice();
                for (var a = 0; i > a && !e.immediatePropagationStopped; a++) {
                    var r = s[a];
                    r.handleEvent ? r.handleEvent(e) : r(e), e.removed && (this.off(e.type, r, 1 == t), e.removed = !1)
                }
            }
        }, createjs.EventDispatcher = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype = new createjs.EventDispatcher;
        e.NONE = 0, e.LOOP = 1, e.REVERSE = 2, e.IGNORE = {}, e._tweens = [], e._plugins = {}, e.get = function(t, i, n, s) {
            return s && e.removeTweens(t), new e(t, i, n)
        }, e.tick = function(t, i) {
            for (var n = e._tweens.slice(), s = n.length - 1; s >= 0; s--) {
                var a = n[s];
                i && !a.ignoreGlobalPause || a._paused || a.tick(a._useTicks ? 1 : t)
            }
        }, e.handleEvent = function(e) {
            "tick" == e.type && this.tick(e.delta, e.paused)
        }, e.removeTweens = function(t) {
            if (t.tweenjs_count) {
                for (var i = e._tweens, n = i.length - 1; n >= 0; n--) i[n]._target == t && (i[n]._paused = !0, i.splice(n, 1));
                t.tweenjs_count = 0
            }
        }, e.removeAllTweens = function() {
            for (var t = e._tweens, i = 0, n = t.length; n > i; i++) {
                var s = t[i];
                s._paused = !0, s.target.tweenjs_count = 0
            }
            t.length = 0
        }, e.hasActiveTweens = function(t) {
            return t ? t.tweenjs_count : e._tweens && !!e._tweens.length
        }, e.installPlugin = function(t, i) {
            var n = t.priority;
            null == n && (t.priority = n = 0);
            for (var s = 0, a = i.length, r = e._plugins; a > s; s++) {
                var o = i[s];
                if (r[o]) {
                    for (var l = r[o], h = 0, c = l.length; c > h && !(n < l[h].priority); h++);
                    r[o].splice(h, 0, t)
                } else r[o] = [t]
            }
        }, e._register = function(t, i) {
            var n = t._target,
                s = e._tweens;
            if (i) n && (n.tweenjs_count = n.tweenjs_count ? n.tweenjs_count + 1 : 1), s.push(t), !e._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", e), e._inited = !0);
            else {
                n && n.tweenjs_count--;
                for (var a = s.length; a--;)
                    if (s[a] == t) return void s.splice(a, 1)
            }
        }, t.ignoreGlobalPause = !1, t.loop = !1, t.duration = 0, t.pluginData = null, t.target = null, t.position = null, t.passive = !1, t._paused = !1, t._curQueueProps = null, t._initQueueProps = null, t._steps = null, t._actions = null, t._prevPosition = 0, t._stepPosition = 0, t._prevPos = -1, t._target = null, t._useTicks = !1, t._inited = !1, t.initialize = function(t, i, n) {
            this.target = this._target = t, i && (this._useTicks = i.useTicks, this.ignoreGlobalPause = i.ignoreGlobalPause, this.loop = i.loop, i.onChange && this.addEventListener("change", i.onChange), i.override && e.removeTweens(t)), this.pluginData = n || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], i && i.paused ? this._paused = !0 : e._register(this, !0), i && null != i.position && this.setPosition(i.position, e.NONE)
        }, t.wait = function(e, t) {
            if (null == e || 0 >= e) return this;
            var i = this._cloneProps(this._curQueueProps);
            return this._addStep({
                d: e,
                p0: i,
                e: this._linearEase,
                p1: i,
                v: t
            })
        }, t.to = function(e, t, i) {
            return (isNaN(t) || 0 > t) && (t = 0), this._addStep({
                d: t || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: i,
                p1: this._cloneProps(this._appendQueueProps(e))
            })
        }, t.call = function(e, t, i) {
            return this._addAction({
                f: e,
                p: t ? t : [this],
                o: i ? i : this._target
            })
        }, t.set = function(e, t) {
            return this._addAction({
                f: this._set,
                o: this,
                p: [e, t ? t : this._target]
            })
        }, t.play = function(e) {
            return e || (e = this), this.call(e.setPaused, [!1], e)
        }, t.pause = function(e) {
            return e || (e = this), this.call(e.setPaused, [!0], e)
        }, t.setPosition = function(e, t) {
            0 > e && (e = 0), null == t && (t = 1);
            var i = e,
                n = !1;
            if (i >= this.duration && (this.loop ? i %= this.duration : (i = this.duration, n = !0)), i == this._prevPos) return n;
            var s = this._prevPos;
            if (this.position = this._prevPos = i, this._prevPosition = e, this._target)
                if (n) this._updateTargetProps(null, 1);
                else if (this._steps.length > 0) {
                for (var a = 0, r = this._steps.length; r > a && !(this._steps[a].t > i); a++);
                var o = this._steps[a - 1];
                this._updateTargetProps(o, (this._stepPosition = i - o.t) / o.d)
            }
            return 0 != t && this._actions.length > 0 && (this._useTicks ? this._runActions(i, i) : 1 == t && s > i ? (s != this.duration && this._runActions(s, this.duration), this._runActions(0, i, !0)) : this._runActions(s, i)), n && this.setPaused(!0), this.dispatchEvent("change"), n
        }, t.tick = function(e) {
            this._paused || this.setPosition(this._prevPosition + e)
        }, t.setPaused = function(t) {
            return this._paused = !!t, e._register(this, !t), this
        }, t.w = t.wait, t.t = t.to, t.c = t.call, t.s = t.set, t.toString = function() {
            return "[Tween]"
        }, t.clone = function() {
            throw "Tween can not be cloned."
        }, t._updateTargetProps = function(t, i) {
            var n, s, a, r, o, l;
            if (t || 1 != i) {
                if (this.passive = !!t.v, this.passive) return;
                t.e && (i = t.e(i, 0, 1, 1)), n = t.p0, s = t.p1
            } else this.passive = !1, n = s = this._curQueueProps;
            for (var h in this._initQueueProps) {
                null == (r = n[h]) && (n[h] = r = this._initQueueProps[h]), null == (o = s[h]) && (s[h] = o = r), a = r == o || 0 == i || 1 == i || "number" != typeof r ? 1 == i ? o : r : r + (o - r) * i;
                var c = !1;
                if (l = e._plugins[h])
                    for (var u = 0, d = l.length; d > u; u++) {
                        var p = l[u].tween(this, h, a, n, s, i, !!t && n == s, !t);
                        p == e.IGNORE ? c = !0 : a = p
                    }
                c || (this._target[h] = a)
            }
        }, t._runActions = function(e, t, i) {
            var n = e,
                s = t,
                a = -1,
                r = this._actions.length,
                o = 1;
            for (e > t && (n = t, s = e, a = r, r = o = -1);
                (a += o) != r;) {
                var l = this._actions[a],
                    h = l.t;
                (h == s || h > n && s > h || i && h == e) && l.f.apply(l.o, l.p)
            }
        }, t._appendQueueProps = function(t) {
            var i, n, s, a, r;
            for (var o in t)
                if (void 0 === this._initQueueProps[o]) {
                    if (n = this._target[o], i = e._plugins[o])
                        for (s = 0, a = i.length; a > s; s++) n = i[s].init(this, o, n);
                    this._initQueueProps[o] = this._curQueueProps[o] = void 0 === n ? null : n
                } else n = this._curQueueProps[o];
            for (var o in t) {
                if (n = this._curQueueProps[o], i = e._plugins[o])
                    for (r = r || {}, s = 0, a = i.length; a > s; s++) i[s].step && i[s].step(this, o, n, t[o], r);
                this._curQueueProps[o] = t[o]
            }
            return r && this._appendQueueProps(r), this._curQueueProps
        }, t._cloneProps = function(e) {
            var t = {};
            for (var i in e) t[i] = e[i];
            return t
        }, t._addStep = function(e) {
            return e.d > 0 && (this._steps.push(e), e.t = this.duration, this.duration += e.d), this
        }, t._addAction = function(e) {
            return e.t = this.duration, this._actions.push(e), this
        }, t._set = function(e, t) {
            for (var i in e) t[i] = e[i]
        }, createjs.Tween = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype = new createjs.EventDispatcher;
        t.ignoreGlobalPause = !1, t.duration = 0, t.loop = !1, t.position = null, t._paused = !1, t._tweens = null, t._labels = null, t._labelList = null, t._prevPosition = 0, t._prevPos = -1, t._useTicks = !1, t.initialize = function(e, t, i) {
            this._tweens = [], i && (this._useTicks = i.useTicks, this.loop = i.loop, this.ignoreGlobalPause = i.ignoreGlobalPause, i.onChange && this.addEventListener("change", i.onChange)), e && this.addTween.apply(this, e), this.setLabels(t), i && i.paused ? this._paused = !0 : createjs.Tween._register(this, !0), i && null != i.position && this.setPosition(i.position, createjs.Tween.NONE)
        }, t.addTween = function(e) {
            var t = arguments.length;
            if (t > 1) {
                for (var i = 0; t > i; i++) this.addTween(arguments[i]);
                return arguments[0]
            }
            return 0 == t ? null : (this.removeTween(e), this._tweens.push(e), e.setPaused(!0), e._paused = !1, e._useTicks = this._useTicks, e.duration > this.duration && (this.duration = e.duration), this._prevPos >= 0 && e.setPosition(this._prevPos, createjs.Tween.NONE), e)
        }, t.removeTween = function(e) {
            var t = arguments.length;
            if (t > 1) {
                for (var i = !0, n = 0; t > n; n++) i = i && this.removeTween(arguments[n]);
                return i
            }
            if (0 == t) return !1;
            for (var s = this._tweens, n = s.length; n--;)
                if (s[n] == e) return s.splice(n, 1), e.duration >= this.duration && this.updateDuration(), !0;
            return !1
        }, t.addLabel = function(e, t) {
            this._labels[e] = t;
            var i = this._labelList;
            if (i) {
                for (var n = 0, s = i.length; s > n && !(t < i[n].position); n++);
                i.splice(n, 0, {
                    label: e,
                    position: t
                })
            }
        }, t.setLabels = function(e) {
            this._labels = e ? e : {}
        }, t.getLabels = function() {
            var e = this._labelList;
            if (!e) {
                e = this._labelList = [];
                var t = this._labels;
                for (var i in t) e.push({
                    label: i,
                    position: t[i]
                });
                e.sort(function(e, t) {
                    return e.position - t.position
                })
            }
            return e
        }, t.getCurrentLabel = function() {
            var e = this.getLabels(),
                t = this.position,
                i = e.length;
            if (i) {
                for (var n = 0; i > n && !(t < e[n].position); n++);
                return 0 == n ? null : e[n - 1].label
            }
            return null
        }, t.gotoAndPlay = function(e) {
            this.setPaused(!1), this._goto(e)
        }, t.gotoAndStop = function(e) {
            this.setPaused(!0), this._goto(e)
        }, t.setPosition = function(e, t) {
            0 > e && (e = 0);
            var i = this.loop ? e % this.duration : e,
                n = !this.loop && e >= this.duration;
            if (i == this._prevPos) return n;
            this._prevPosition = e, this.position = this._prevPos = i;
            for (var s = 0, a = this._tweens.length; a > s; s++)
                if (this._tweens[s].setPosition(i, t), i != this._prevPos) return !1;
            return n && this.setPaused(!0), this.dispatchEvent("change"), n
        }, t.setPaused = function(e) {
            this._paused = !!e, createjs.Tween._register(this, !e)
        }, t.updateDuration = function() {
            this.duration = 0;
            for (var e = 0, t = this._tweens.length; t > e; e++) {
                var i = this._tweens[e];
                i.duration > this.duration && (this.duration = i.duration)
            }
        }, t.tick = function(e) {
            this.setPosition(this._prevPosition + e)
        }, t.resolve = function(e) {
            var t = parseFloat(e);
            return isNaN(t) && (t = this._labels[e]), t
        }, t.toString = function() {
            return "[Timeline]"
        }, t.clone = function() {
            throw "Timeline can not be cloned."
        }, t._goto = function(e) {
            var t = this.resolve(e);
            null != t && this.setPosition(t)
        }, createjs.Timeline = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
            throw "Ease cannot be instantiated."
        };
        e.linear = function(e) {
            return e
        }, e.none = e.linear, e.get = function(e) {
            return -1 > e && (e = -1), e > 1 && (e = 1),
                function(t) {
                    return 0 == e ? t : 0 > e ? t * (t * -e + 1 + e) : t * ((2 - t) * e + (1 - e))
                }
        }, e.getPowIn = function(e) {
            return function(t) {
                return Math.pow(t, e)
            }
        }, e.getPowOut = function(e) {
            return function(t) {
                return 1 - Math.pow(1 - t, e)
            }
        }, e.getPowInOut = function(e) {
            return function(t) {
                return (t *= 2) < 1 ? .5 * Math.pow(t, e) : 1 - .5 * Math.abs(Math.pow(2 - t, e))
            }
        }, e.quadIn = e.getPowIn(2), e.quadOut = e.getPowOut(2), e.quadInOut = e.getPowInOut(2), e.cubicIn = e.getPowIn(3), e.cubicOut = e.getPowOut(3), e.cubicInOut = e.getPowInOut(3), e.quartIn = e.getPowIn(4), e.quartOut = e.getPowOut(4), e.quartInOut = e.getPowInOut(4), e.quintIn = e.getPowIn(5), e.quintOut = e.getPowOut(5), e.quintInOut = e.getPowInOut(5), e.sineIn = function(e) {
            return 1 - Math.cos(e * Math.PI / 2)
        }, e.sineOut = function(e) {
            return Math.sin(e * Math.PI / 2)
        }, e.sineInOut = function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }, e.getBackIn = function(e) {
            return function(t) {
                return t * t * ((e + 1) * t - e)
            }
        }, e.backIn = e.getBackIn(1.7), e.getBackOut = function(e) {
            return function(t) {
                return --t * t * ((e + 1) * t + e) + 1
            }
        }, e.backOut = e.getBackOut(1.7), e.getBackInOut = function(e) {
            return e *= 1.525,
                function(t) {
                    return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
                }
        }, e.backInOut = e.getBackInOut(1.7), e.circIn = function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }, e.circOut = function(e) {
            return Math.sqrt(1 - --e * e)
        }, e.circInOut = function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }, e.bounceIn = function(t) {
            return 1 - e.bounceOut(1 - t)
        }, e.bounceOut = function(e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }, e.bounceInOut = function(t) {
            return .5 > t ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
        }, e.getElasticIn = function(e, t) {
            var i = 2 * Math.PI;
            return function(n) {
                if (0 == n || 1 == n) return n;
                var s = t / i * Math.asin(1 / e);
                return -(e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * i / t))
            }
        }, e.elasticIn = e.getElasticIn(1, .3), e.getElasticOut = function(e, t) {
            var i = 2 * Math.PI;
            return function(n) {
                if (0 == n || 1 == n) return n;
                var s = t / i * Math.asin(1 / e);
                return e * Math.pow(2, -10 * n) * Math.sin((n - s) * i / t) + 1
            }
        }, e.elasticOut = e.getElasticOut(1, .3), e.getElasticInOut = function(e, t) {
            var i = 2 * Math.PI;
            return function(n) {
                var s = t / i * Math.asin(1 / e);
                return (n *= 2) < 1 ? -.5 * e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * i / t) : .5 * e * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * i / t) + 1
            }
        }, e.elasticInOut = e.getElasticInOut(1, .3 * 1.5), createjs.Ease = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {
            throw "MotionGuidePlugin cannot be instantiated."
        };
        e.priority = 0, e._rotOffS, e._rotOffE, e._rotNormS, e._rotNormE, e.install = function() {
            return createjs.Tween.installPlugin(e, ["guide", "x", "y", "rotation"]), createjs.Tween.IGNORE
        }, e.init = function(e, t, i) {
            var n = e.target;
            return n.hasOwnProperty("x") || (n.x = 0), n.hasOwnProperty("y") || (n.y = 0), n.hasOwnProperty("rotation") || (n.rotation = 0), "rotation" == t && (e.__needsRot = !0), "guide" == t ? null : i
        }, e.step = function(t, i, n, s, a) {
            if ("rotation" == i && (t.__rotGlobalS = n, t.__rotGlobalE = s, e.testRotData(t, a)), "guide" != i) return s;
            var r, o = s;
            o.hasOwnProperty("path") || (o.path = []);
            var l = o.path;
            if (o.hasOwnProperty("end") || (o.end = 1), o.hasOwnProperty("start") || (o.start = n && n.hasOwnProperty("end") && n.path === l ? n.end : 0), o.hasOwnProperty("_segments") && o._length) return s;
            var h = l.length,
                c = 10;
            if (!(h >= 6 && 0 == (h - 2) % 4)) throw "invalid 'path' data, please see documentation for valid paths";
            o._segments = [], o._length = 0;
            for (var u = 2; h > u; u += 4) {
                for (var d, p, _ = l[u - 2], v = l[u - 1], f = l[u + 0], m = l[u + 1], T = l[u + 2], g = l[u + 3], S = _, E = v, y = 0, P = [], A = 1; c >= A; A++) {
                    var b = A / c,
                        C = 1 - b;
                    d = C * C * _ + 2 * C * b * f + b * b * T, p = C * C * v + 2 * C * b * m + b * b * g, y += P[P.push(Math.sqrt((r = d - S) * r + (r = p - E) * r)) - 1], S = d, E = p
                }
                o._segments.push(y), o._segments.push(P), o._length += y
            }
            r = o.orient, o.orient = !0;
            var B = {};
            return e.calc(o, o.start, B), t.__rotPathS = Number(B.rotation.toFixed(5)), e.calc(o, o.end, B), t.__rotPathE = Number(B.rotation.toFixed(5)), o.orient = !1, e.calc(o, o.end, a), o.orient = r, o.orient ? (t.__guideData = o, e.testRotData(t, a), s) : s
        }, e.testRotData = function(e, t) {
            if (void 0 === e.__rotGlobalS || void 0 === e.__rotGlobalE) {
                if (e.__needsRot) return;
                e.__rotGlobalS = e.__rotGlobalE = void 0 !== e._curQueueProps.rotation ? e._curQueueProps.rotation : t.rotation = e.target.rotation || 0
            }
            if (void 0 !== e.__guideData) {
                var i = e.__guideData,
                    n = e.__rotGlobalE - e.__rotGlobalS,
                    s = e.__rotPathE - e.__rotPathS,
                    a = n - s;
                if ("auto" == i.orient) a > 180 ? a -= 360 : -180 > a && (a += 360);
                else if ("cw" == i.orient) {
                    for (; 0 > a;) a += 360;
                    0 == a && n > 0 && 180 != n && (a += 360)
                } else if ("ccw" == i.orient) {
                    for (a = n - (s > 180 ? 360 - s : s); a > 0;) a -= 360;
                    0 == a && 0 > n && -180 != n && (a -= 360)
                }
                i.rotDelta = a, i.rotOffS = e.__rotGlobalS - e.__rotPathS, e.__rotGlobalS = e.__rotGlobalE = e.__guideData = e.__needsRot = void 0
            }
        }, e.tween = function(t, i, n, s, a, r, o) {
            var l = a.guide;
            if (void 0 == l || l === s.guide) return n;
            if (l.lastRatio != r) {
                var h = (l.end - l.start) * (o ? l.end : r) + l.start;
                switch (e.calc(l, h, t.target), l.orient) {
                    case "cw":
                    case "ccw":
                    case "auto":
                        t.target.rotation += l.rotOffS + l.rotDelta * r;
                        break;
                    case "fixed":
                    default:
                        t.target.rotation += l.rotOffS
                }
                l.lastRatio = r
            }
            return "rotation" != i || l.orient && "false" != l.orient ? t.target[i] : n
        }, e.calc = function(t, i, n) {
            void 0 == t._segments && e.validate(t), void 0 == n && (n = {
                x: 0,
                y: 0,
                rotation: 0
            });
            for (var s = t._segments, a = t.path, r = t._length * i, o = s.length - 2, l = 0; r > s[l] && o > l;) r -= s[l], l += 2;
            var h = s[l + 1],
                c = 0;
            for (o = h.length - 1; r > h[c] && o > c;) r -= h[c], c++;
            var u = c / ++o + r / (o * h[c]);
            l = 2 * l + 2;
            var d = 1 - u;
            return n.x = d * d * a[l - 2] + 2 * d * u * a[l + 0] + u * u * a[l + 2], n.y = d * d * a[l - 1] + 2 * d * u * a[l + 1] + u * u * a[l + 3], t.orient && (n.rotation = 57.2957795 * Math.atan2((a[l + 1] - a[l - 1]) * d + (a[l + 3] - a[l + 1]) * u, (a[l + 0] - a[l - 2]) * d + (a[l + 2] - a[l + 0]) * u)), n
        }, createjs.MotionGuidePlugin = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = createjs.TweenJS = createjs.TweenJS || {};
        e.version = "0.5.0", e.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
    }(), this.createjs = this.createjs || {},
    function() {
        var e = createjs.SoundJS = createjs.SoundJS || {};
        e.version = "0.5.0", e.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function() {},
            t = e.prototype;
        e.initialize = function(e) {
            e.addEventListener = t.addEventListener, e.on = t.on, e.removeEventListener = e.off = t.removeEventListener, e.removeAllEventListeners = t.removeAllEventListeners, e.hasEventListener = t.hasEventListener, e.dispatchEvent = t.dispatchEvent, e._dispatchEvent = t._dispatchEvent
        }, t._listeners = null, t._captureListeners = null, t.initialize = function() {}, t.addEventListener = function(e, t, i) {
            var n;
            n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
            var s = n[e];
            return s && this.removeEventListener(e, t, i), s = n[e], s ? s.push(t) : n[e] = [t], t
        }, t.on = function(e, t, i, n, s, a) {
            return t.handleEvent && (i = i || t, t = t.handleEvent), i = i || this, this.addEventListener(e, function(e) {
                t.call(i, e, s), n && e.remove()
            }, a)
        }, t.removeEventListener = function(e, t, i) {
            var n = i ? this._captureListeners : this._listeners;
            if (n) {
                var s = n[e];
                if (s)
                    for (var a = 0, r = s.length; r > a; a++)
                        if (s[a] == t) {
                            1 == r ? delete n[e] : s.splice(a, 1);
                            break
                        }
            }
        }, t.off = t.removeEventListener, t.removeAllEventListeners = function(e) {
            e ? (this._listeners && delete this._listeners[e], this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
        }, t.dispatchEvent = function(e, t) {
            if ("string" == typeof e) {
                var i = this._listeners;
                if (!i || !i[e]) return !1;
                e = new createjs.Event(e)
            }
            if (e.target = t || this, e.bubbles && this.parent) {
                for (var n = this, s = [n]; n.parent;) s.push(n = n.parent);
                var a, r = s.length;
                for (a = r - 1; a >= 0 && !e.propagationStopped; a--) s[a]._dispatchEvent(e, 1 + (0 == a));
                for (a = 1; r > a && !e.propagationStopped; a++) s[a]._dispatchEvent(e, 3)
            } else this._dispatchEvent(e, 2);
            return e.defaultPrevented
        }, t.hasEventListener = function(e) {
            var t = this._listeners,
                i = this._captureListeners;
            return !!(t && t[e] || i && i[e])
        }, t.toString = function() {
            return "[EventDispatcher]"
        }, t._dispatchEvent = function(e, t) {
            var i, n = 1 == t ? this._captureListeners : this._listeners;
            if (e && n) {
                var s = n[e.type];
                if (!s || !(i = s.length)) return;
                e.currentTarget = this, e.eventPhase = t, e.removed = !1, s = s.slice();
                for (var a = 0; i > a && !e.immediatePropagationStopped; a++) {
                    var r = s[a];
                    r.handleEvent ? r.handleEvent(e) : r(e), e.removed && (this.off(e.type, r, 1 == t), e.removed = !1)
                }
            }
        }, createjs.EventDispatcher = e
    }(), this.createjs = this.createjs || {},
    function() {
        var e = function(e, t, i) {
                this.initialize(e, t, i)
            },
            t = e.prototype;
        t.type = null, t.target = null, t.currentTarget = null, t.eventPhase = 0, t.bubbles = !1, t.cancelable = !1, t.timeStamp = 0, t.defaultPrevented = !1, t.propagationStopped = !1, t.immediatePropagationStopped = !1, t.removed = !1, t.initialize = function(e, t, i) {
            this.type = e, this.bubbles = t, this.cancelable = i, this.timeStamp = (new Date).getTime()
        }, t.preventDefault = function() {
            this.defaultPrevented = !0
        }, t.stopPropagation = function() {
            this.propagationStopped = !0
        }, t.stopImmediatePropagation = function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        }, t.remove = function() {
            this.removed = !0
        }, t.clone = function() {
            return new e(this.type, this.bubbles, this.cancelable)
        }, t.toString = function() {
            return "[Event (type=" + this.type + ")]"
        }, createjs.Event = e
    }(), this.createjs = this.createjs || {},
    function() {
        createjs.indexOf = function(e, t) {
            for (var i = 0, n = e.length; n > i; i++)
                if (t === e[i]) return i;
            return -1
        }
    }(), this.createjs = this.createjs || {},
    function() {
        createjs.proxy = function(e, t) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function() {
                return e.apply(t, Array.prototype.slice.call(arguments, 0).concat(i))
            }
        }
    }(), this.createjs = this.createjs || {},
    function() {
        function e() {
            throw "Sound cannot be instantiated"
        }

        function t(e, t) {
            this.init(e, t)
        }

        function i() {
            this.isDefault = !0, this.addEventListener = this.removeEventListener = this.removeAllEventListener = this.dispatchEvent = this.hasEventListener = this._listeners = this.interrupt = this.playFailed = this.pause = this.resume = this.play = this.beginPlaying = this.cleanUp = this.stop = this.setMasterVolume = this.setVolume = this.mute = this.setMute = this.getMute = this.setPan = this.getPosition = this.setPosition = function() {
                return !1
            }, this.getVolume = this.getPan = this.getDuration = function() {
                return 0
            }, this.playState = e.PLAY_FAILED, this.toString = function() {
                return "[Sound Default Sound Instance]"
            }
        }

        function n() {}
        var s = e;
        s.DELIMITER = "|", s.AUDIO_TIMEOUT = 8e3, s.INTERRUPT_ANY = "any", s.INTERRUPT_EARLY = "early", s.INTERRUPT_LATE = "late", s.INTERRUPT_NONE = "none", s.PLAY_INITED = "playInited", s.PLAY_SUCCEEDED = "playSucceeded", s.PLAY_INTERRUPTED = "playInterrupted", s.PLAY_FINISHED = "playFinished", s.PLAY_FAILED = "playFailed", s.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"], s.EXTENSION_MAP = {
            m4a: "mp4"
        }, s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/, s.defaultInterruptBehavior = s.INTERRUPT_NONE, s.lastId = 0, s.activePlugin = null, s.pluginsRegistered = !1, s.masterVolume = 1, s.masterMute = !1, s.instances = [], s.idHash = {}, s.preloadHash = {}, s.defaultSoundInstance = null, s.addEventListener = null, s.removeEventListener = null, s.removeAllEventListeners = null, s.dispatchEvent = null, s.hasEventListener = null, s._listeners = null, createjs.EventDispatcher.initialize(s), s.sendFileLoadEvent = function(e) {
            if (s.preloadHash[e])
                for (var t = 0, i = s.preloadHash[e].length; i > t; t++) {
                    var n = s.preloadHash[e][t];
                    if (s.preloadHash[e][t] = !0, s.hasEventListener("fileload")) {
                        var a = new createjs.Event("fileload");
                        a.src = n.src, a.id = n.id, a.data = n.data, s.dispatchEvent(a)
                    }
                }
        }, s.getPreloadHandlers = function() {
            return {
                callback: createjs.proxy(s.initLoad, s),
                types: ["sound"],
                extensions: s.SUPPORTED_EXTENSIONS
            }
        }, s.registerPlugin = function(e) {
            return s.pluginsRegistered = !0, null == e ? !1 : e.isSupported() ? (s.activePlugin = new e, !0) : !1
        }, s.registerPlugins = function(e) {
            for (var t = 0, i = e.length; i > t; t++) {
                var n = e[t];
                if (s.registerPlugin(n)) return !0
            }
            return !1
        }, s.initializeDefaultPlugins = function() {
            return null != s.activePlugin ? !0 : s.pluginsRegistered ? !1 : s.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
        }, s.isReady = function() {
            return null != s.activePlugin
        }, s.getCapabilities = function() {
            return null == s.activePlugin ? null : s.activePlugin.capabilities
        }, s.getCapability = function(e) {
            return null == s.activePlugin ? null : s.activePlugin.capabilities[e]
        }, s.initLoad = function(e, t, i, n, a) {
            var r = s.registerSound(e, i, n, !1, a);
            return null == r ? !1 : r
        }, s.registerSound = function(e, i, n, a, r) {
            if (!s.initializeDefaultPlugins()) return !1;
            e instanceof Object && (r = i, i = e.id, n = e.data, e = e.src);
            var o = s.parsePath(e, "sound", i, n);
            if (null == o) return !1;
            null != i && (s.idHash[i] = o.src);
            var l = null;
            null != n && (isNaN(n.channels) ? isNaN(n) || (l = parseInt(n)) : l = parseInt(n.channels));
            var h = s.activePlugin.register(o.src, l);
            if (null != h && (null != h.numChannels && (l = h.numChannels), t.create(o.src, l), null != n && isNaN(n) ? n.channels = o.data.channels = l || t.maxPerChannel() : n = o.data = l || t.maxPerChannel(), null != h.tag ? o.tag = h.tag : h.src && (o.src = h.src), null != h.completeHandler && (o.completeHandler = h.completeHandler), h.type && (o.type = h.type)), 0 != a)
                if (s.preloadHash[o.src] || (s.preloadHash[o.src] = []), s.preloadHash[o.src].push({
                        src: e,
                        id: i,
                        data: n
                    }), 1 == s.preloadHash[o.src].length) null == r && (r = ""), s.activePlugin.preload(o.src, h, r);
                else if (1 == s.preloadHash[o.src][0]) return !0;
            return o
        }, s.registerManifest = function(e, t) {
            for (var i = [], n = 0, s = e.length; s > n; n++) i[n] = createjs.Sound.registerSound(e[n].src, e[n].id, e[n].data, e[n].preload, t);
            return i
        }, s.removeSound = function(e) {
            if (null == s.activePlugin) return !1;
            e instanceof Object && (e = e.src), e = s.getSrcById(e);
            var i = s.parsePath(e);
            if (null == i) return !1;
            e = i.src;
            for (var n in s.idHash) s.idHash[n] == e && delete s.idHash[n];
            return t.removeSrc(e), delete s.preloadHash[e], s.activePlugin.removeSound(e), !0
        }, s.removeManifest = function(e) {
            for (var t = [], i = 0, n = e.length; n > i; i++) t[i] = createjs.Sound.removeSound(e[i].src);
            return t
        }, s.removeAllSounds = function() {
            s.idHash = {}, s.preloadHash = {}, t.removeAll(), s.activePlugin.removeAllSounds()
        }, s.loadComplete = function(e) {
            var t = s.parsePath(e, "sound");
            return e = s.getSrcById(t ? t.src : e), 1 == s.preloadHash[e][0]
        }, s.parsePath = function(e, t, i, n) {
            "string" != typeof e && (e = e.toString());
            for (var a = e.split(s.DELIMITER), r = {
                    type: t || "sound",
                    id: i,
                    data: n
                }, o = s.getCapabilities(), l = 0, h = a.length; h > l; l++) {
                var c = a[l],
                    u = c.match(s.FILE_PATTERN);
                if (null == u) return !1;
                var d = u[4],
                    p = u[5];
                if (o[p] && createjs.indexOf(s.SUPPORTED_EXTENSIONS, p) > -1) return r.name = d, r.src = c, r.extension = p, r
            }
            return null
        }, s.play = function(e, t, i, n, a, r, o) {
            var l = s.createInstance(e),
                h = s.playInstance(l, t, i, n, a, r, o);
            return h || l.playFailed(), l
        }, s.createInstance = function(i) {
            if (!s.initializeDefaultPlugins()) return s.defaultSoundInstance;
            i = s.getSrcById(i);
            var n = s.parsePath(i, "sound"),
                a = null;
            return null != n && null != n.src ? (t.create(n.src), a = s.activePlugin.create(n.src)) : a = e.defaultSoundInstance, a.uniqueId = s.lastId++, a
        }, s.setVolume = function(e) {
            if (null == Number(e)) return !1;
            if (e = Math.max(0, Math.min(1, e)), s.masterVolume = e, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(e))
                for (var t = this.instances, i = 0, n = t.length; n > i; i++) t[i].setMasterVolume(e)
        }, s.getVolume = function() {
            return s.masterVolume
        }, s.setMute = function(e) {
            if (null == e || void 0 == e) return !1;
            if (this.masterMute = e, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(e))
                for (var t = this.instances, i = 0, n = t.length; n > i; i++) t[i].setMasterMute(e);
            return !0
        }, s.getMute = function() {
            return this.masterMute
        }, s.stop = function() {
            for (var e = this.instances, t = e.length; t--;) e[t].stop()
        }, s.playInstance = function(e, t, i, n, a, r, o) {
            if (t instanceof Object && (i = t.delay, n = t.offset, a = t.loop, r = t.volume, o = t.pan), t = t || s.defaultInterruptBehavior, null == i && (i = 0), null == n && (n = e.getPosition()), null == a && (a = 0), null == r && (r = e.volume), null == o && (o = e.pan), 0 == i) {
                var l = s.beginPlaying(e, t, n, a, r, o);
                if (!l) return !1
            } else {
                var h = setTimeout(function() {
                    s.beginPlaying(e, t, n, a, r, o)
                }, i);
                e.delayTimeoutId = h
            }
            return this.instances.push(e), !0
        }, s.beginPlaying = function(e, i, n, s, a, r) {
            if (!t.add(e, i)) return !1;
            var o = e.beginPlaying(n, s, a, r);
            if (!o) {
                var l = createjs.indexOf(this.instances, e);
                return l > -1 && this.instances.splice(l, 1), !1
            }
            return !0
        }, s.getSrcById = function(e) {
            return null == s.idHash || null == s.idHash[e] ? e : s.idHash[e]
        }, s.playFinished = function(e) {
            t.remove(e);
            var i = createjs.indexOf(this.instances, e);
            i > -1 && this.instances.splice(i, 1)
        }, createjs.Sound = e, t.channels = {}, t.create = function(e, i) {
            var n = t.get(e);
            return null == n ? (t.channels[e] = new t(e, i), !0) : !1
        }, t.removeSrc = function(e) {
            var i = t.get(e);
            return null == i ? !1 : (i.removeAll(), delete t.channels[e], !0)
        }, t.removeAll = function() {
            for (var e in t.channels) t.channels[e].removeAll();
            t.channels = {}
        }, t.add = function(e, i) {
            var n = t.get(e.src);
            return null == n ? !1 : n.add(e, i)
        }, t.remove = function(e) {
            var i = t.get(e.src);
            return null == i ? !1 : (i.remove(e), !0)
        }, t.maxPerChannel = function() {
            return a.maxDefault
        }, t.get = function(e) {
            return t.channels[e]
        };
        var a = t.prototype;
        a.src = null, a.max = null, a.maxDefault = 100, a.length = 0, a.init = function(e, t) {
            this.src = e, this.max = t || this.maxDefault, -1 == this.max && this.max == this.maxDefault, this.instances = []
        }, a.get = function(e) {
            return this.instances[e]
        }, a.add = function(e, t) {
            return this.getSlot(t, e) ? (this.instances.push(e), this.length++, !0) : !1
        }, a.remove = function(e) {
            var t = createjs.indexOf(this.instances, e);
            return -1 == t ? !1 : (this.instances.splice(t, 1), this.length--, !0)
        }, a.removeAll = function() {
            for (var e = this.length - 1; e >= 0; e--) this.instances[e].stop()
        }, a.getSlot = function(t) {
            for (var i, n, s = 0, a = this.max; a > s; s++) {
                if (i = this.get(s), null == i) return !0;
                (t != e.INTERRUPT_NONE || i.playState == e.PLAY_FINISHED) && (0 != s ? i.playState == e.PLAY_FINISHED || i.playState == e.PLAY_INTERRUPTED || i.playState == e.PLAY_FAILED ? n = i : (t == e.INTERRUPT_EARLY && i.getPosition() < n.getPosition() || t == e.INTERRUPT_LATE && i.getPosition() > n.getPosition()) && (n = i) : n = i)
            }
            return null != n ? (n.interrupt(), this.remove(n), !0) : !1
        }, a.toString = function() {
            return "[Sound SoundChannel]"
        }, e.defaultSoundInstance = new i, null == createjs.proxy && (createjs.proxy = function() {
            throw "Proxy has been moved to an external file, and must be included separately."
        }), n.init = function() {
            var e = window.navigator.userAgent;
            n.isFirefox = e.indexOf("Firefox") > -1, n.isOpera = null != window.opera, n.isChrome = e.indexOf("Chrome") > -1, n.isIOS = e.indexOf("iPod") > -1 || e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1, n.isAndroid = e.indexOf("Android") > -1, n.isBlackberry = e.indexOf("Blackberry") > -1
        }, n.init(), createjs.Sound.BrowserDetect = n
    }(), this.createjs = this.createjs || {},
    function() {
        function e() {
            this.init()
        }
        var t = e;
        t.capabilities = null, t.isSupported = function() {
            var e = createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid || createjs.Sound.BrowserDetect.isBlackberry;
            return "file:" != location.protocol || e || this.isFileXHRSupported() ? (t.generateCapabilities(), null == t.context ? !1 : !0) : !1
        }, t.isFileXHRSupported = function() {
            var e = !0,
                t = new XMLHttpRequest;
            try {
                t.open("GET", "fail.fail", !1)
            } catch (i) {
                return e = !1
            }
            t.onerror = function() {
                e = !1
            }, t.onload = function() {
                e = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
            };
            try {
                t.send()
            } catch (i) {
                e = !1
            }
            return e
        }, t.generateCapabilities = function() {
            if (null == t.capabilities) {
                var e = document.createElement("audio");
                if (null == e.canPlayType) return null;
                if (window.webkitAudioContext) t.context = new webkitAudioContext;
                else {
                    if (!window.AudioContext) return null;
                    t.context = new AudioContext
                }
                t.compatibilitySetUp(), t.playEmptySound(), t.capabilities = {
                    panning: !0,
                    volume: !0,
                    tracks: -1
                };
                for (var i = createjs.Sound.SUPPORTED_EXTENSIONS, n = createjs.Sound.EXTENSION_MAP, s = 0, a = i.length; a > s; s++) {
                    var r = i[s],
                        o = n[r] || r;
                    t.capabilities[r] = "no" != e.canPlayType("audio/" + r) && "" != e.canPlayType("audio/" + r) || "no" != e.canPlayType("audio/" + o) && "" != e.canPlayType("audio/" + o)
                }
                t.context.destination.numberOfChannels < 2 && (t.capabilities.panning = !1), t.dynamicsCompressorNode = t.context.createDynamicsCompressor(), t.dynamicsCompressorNode.connect(t.context.destination), t.gainNode = t.context.createGain(), t.gainNode.connect(t.dynamicsCompressorNode)
            }
        }, t.compatibilitySetUp = function() {
            if (!t.context.createGain) {
                t.context.createGain = t.context.createGainNode;
                var e = t.context.createBufferSource();
                e.__proto__.start = e.__proto__.noteGrainOn, e.__proto__.stop = e.__proto__.noteOff, this.panningModel = 0
            }
        }, t.playEmptySound = function() {
            var e = this.context.createBuffer(1, 1, 22050),
                t = this.context.createBufferSource();
            t.buffer = e, t.connect(this.context.destination), t.start(0, 0, 0)
        };
        var i = e.prototype;
        i.capabilities = null, i.volume = 1, i.context = null, i.panningModel = "equalpower", i.dynamicsCompressorNode = null, i.gainNode = null, i.arrayBuffers = null, i.init = function() {
            this.capabilities = t.capabilities, this.arrayBuffers = {}, this.context = t.context, this.gainNode = t.gainNode, this.dynamicsCompressorNode = t.dynamicsCompressorNode
        }, i.register = function(e) {
            this.arrayBuffers[e] = !0;
            var t = new createjs.WebAudioPlugin.Loader(e, this);
            return {
                tag: t
            }
        }, i.isPreloadStarted = function(e) {
            return null != this.arrayBuffers[e]
        }, i.isPreloadComplete = function(e) {
            return !(null == this.arrayBuffers[e] || 1 == this.arrayBuffers[e])
        }, i.removeFromPreload = function(e) {
            delete this.arrayBuffers[e]
        }, i.removeSound = function(e) {
            delete this.arrayBuffers[e]
        }, i.removeAllSounds = function() {
            this.arrayBuffers = {}
        }, i.addPreloadResults = function(e, t) {
            this.arrayBuffers[e] = t
        }, i.handlePreloadComplete = function() {
            createjs.Sound.sendFileLoadEvent(this.src)
        }, i.preload = function(e, t, i) {
            this.arrayBuffers[e] = !0;
            var n = new createjs.WebAudioPlugin.Loader(e, this);
            n.onload = this.handlePreloadComplete, null != i && (n.src = i + n.src), n.load()
        }, i.create = function(e) {
            return this.isPreloadStarted(e) || this.preload(e), new createjs.WebAudioPlugin.SoundInstance(e, this)
        }, i.setVolume = function(e) {
            return this.volume = e, this.updateVolume(), !0
        }, i.updateVolume = function() {
            var e = createjs.Sound.masterMute ? 0 : this.volume;
            e != this.gainNode.gain.value && (this.gainNode.gain.value = e)
        }, i.getVolume = function() {
            return this.volume
        }, i.setMute = function() {
            return this.updateVolume(), !0
        }, i.toString = function() {
            return "[WebAudioPlugin]"
        }, createjs.WebAudioPlugin = e
    }(),
    function() {
        function e(e, t) {
            this.init(e, t)
        }
        var t = e.prototype;
        t.src = null, t.uniqueId = -1, t.playState = null, t.owner = null, t.offset = 0, t.delay = 0, t._volume = 1, Object.defineProperty(t, "volume", {
            get: function() {
                return this._volume
            },
            set: function(e) {
                return null == Number(e) ? !1 : (e = Math.max(0, Math.min(1, e)), this._volume = e, void this.updateVolume())
            }
        }), t._pan = 0, Object.defineProperty(t, "pan", {
            get: function() {
                return this._pan
            },
            set: function(e) {
                return this.owner.capabilities.panning && null != Number(e) ? (e = Math.max(-1, Math.min(1, e)), this._pan = e, void this.panNode.setPosition(e, 0, -.5)) : !1
            }
        }), t.duration = 0, t.remainingLoops = 0, t.delayTimeoutId = null, t.soundCompleteTimeout = null, t.panNode = null, t.gainNode = null, t.sourceNode = null, t.sourceNodeNext = null, t.muted = !1, t.paused = !1, t.startTime = 0, t.addEventListener = null, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, t.endedHandler = null, t.readyHandler = null, t.stalledHandler = null, t.sendEvent = function(e) {
            var t = new createjs.Event(e);
            this.dispatchEvent(t)
        }, t.init = function(e, t) {
            this.owner = t, this.src = e, this.panNode = this.owner.context.createPanner(), this.panNode.panningModel = this.owner.panningModel, this.gainNode = this.owner.context.createGain(), this.gainNode.connect(this.panNode), this.owner.isPreloadComplete(this.src) && (this.duration = 1e3 * this.owner.arrayBuffers[this.src].duration), this.endedHandler = createjs.proxy(this.handleSoundComplete, this), this.readyHandler = createjs.proxy(this.handleSoundReady, this), this.stalledHandler = createjs.proxy(this.handleSoundStalled, this)
        }, t.cleanUp = function() {
            this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.sourceNode = this.cleanUpAudioNode(this.sourceNode), this.sourceNodeNext = this.cleanUpAudioNode(this.sourceNodeNext)), 0 != this.panNode.numberOfOutputs && this.panNode.disconnect(0), clearTimeout(this.delayTimeoutId), clearTimeout(this.soundCompleteTimeout), this.startTime = 0, null != window.createjs && createjs.Sound.playFinished(this)
        }, t.cleanUpAudioNode = function(e) {
            return e && (e.stop(0), e.disconnect(this.gainNode), e = null), e
        }, t.interrupt = function() {
            this.playState = createjs.Sound.PLAY_INTERRUPTED, this.cleanUp(), this.paused = !1, this.sendEvent("interrupted")
        }, t.handleSoundStalled = function() {
            this.sendEvent("failed")
        }, t.handleSoundReady = function() {
            if (null != window.createjs) {
                if (1e3 * this.offset > this.getDuration()) return void this.playFailed();
                this.offset < 0 && (this.offset = 0), this.playState = createjs.Sound.PLAY_SUCCEEDED, this.paused = !1, this.panNode.connect(this.owner.gainNode);
                var e = this.owner.arrayBuffers[this.src].duration;
                this.sourceNode = this.createAndPlayAudioNode(this.owner.context.currentTime - e, this.offset), this.duration = 1e3 * e, this.startTime = this.sourceNode.startTime - this.offset, this.soundCompleteTimeout = setTimeout(this.endedHandler, 1e3 * (e - this.offset)), 0 != this.remainingLoops && (this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0))
            }
        }, t.createAndPlayAudioNode = function(e, t) {
            var i = this.owner.context.createBufferSource();
            return i.buffer = this.owner.arrayBuffers[this.src], i.connect(this.gainNode), this.owner.context.currentTime, i.startTime = e + i.buffer.duration, i.start(i.startTime, t, i.buffer.duration - t), i
        }, t.play = function(e, t, i, n, s, a) {
            this.cleanUp(), createjs.Sound.playInstance(this, e, t, i, n, s, a)
        }, t.beginPlaying = function(e, t, i, n) {
            return null != window.createjs && this.src ? (this.offset = e / 1e3, this.remainingLoops = t, this.volume = i, this.pan = n, this.owner.isPreloadComplete(this.src) ? (this.handleSoundReady(null), this.sendEvent("succeeded"), 1) : void this.playFailed()) : void 0
        }, t.pause = function() {
            return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ? !1 : (this.paused = !0, this.offset = this.owner.context.currentTime - this.startTime, this.cleanUpAudioNode(this.sourceNode), this.cleanUpAudioNode(this.sourceNodeNext), 0 != this.panNode.numberOfOutputs && this.panNode.disconnect(0), clearTimeout(this.delayTimeoutId), clearTimeout(this.soundCompleteTimeout), !0)
        }, t.resume = function() {
            return this.paused ? (this.handleSoundReady(null), !0) : !1
        }, t.stop = function() {
            return this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.offset = 0, !0
        }, t.setVolume = function(e) {
            return this.volume = e, !0
        }, t.updateVolume = function() {
            var e = this.muted ? 0 : this._volume;
            return e != this.gainNode.gain.value ? (this.gainNode.gain.value = e, !0) : !1
        }, t.getVolume = function() {
            return this.volume
        }, t.setMute = function(e) {
            return null == e || void 0 == e ? !1 : (this.muted = e, this.updateVolume(), !0)
        }, t.getMute = function() {
            return this.muted
        }, t.setPan = function(e) {
            return this.pan = e, this.pan != e ? !1 : void 0
        }, t.getPan = function() {
            return this.pan
        }, t.getPosition = function() {
            if (this.paused || null == this.sourceNode) var e = this.offset;
            else var e = this.owner.context.currentTime - this.startTime;
            return 1e3 * e
        }, t.setPosition = function(e) {
            return this.offset = e / 1e3, this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.cleanUpAudioNode(this.sourceNode), this.cleanUpAudioNode(this.sourceNodeNext), clearTimeout(this.soundCompleteTimeout)), this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || this.handleSoundReady(null), !0
        }, t.getDuration = function() {
            return this.duration
        }, t.handleSoundComplete = function() {
            return this.offset = 0, 0 != this.remainingLoops ? (this.remainingLoops--, this.sourceNodeNext ? (this.cleanUpAudioNode(this.sourceNode), this.sourceNode = this.sourceNodeNext, this.startTime = this.sourceNode.startTime, this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0), this.soundCompleteTimeout = setTimeout(this.endedHandler, this.duration)) : this.handleSoundReady(null), void this.sendEvent("loop")) : void(null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.sendEvent("complete")))
        }, t.playFailed = function() {
            null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED, this.cleanUp(), this.sendEvent("failed"))
        }, t.toString = function() {
            return "[WebAudioPlugin SoundInstance]"
        }, createjs.EventDispatcher.initialize(e.prototype), createjs.WebAudioPlugin.SoundInstance = e
    }(),
    function() {
        function e(e, t) {
            this.init(e, t)
        }
        var t = e.prototype;
        t.request = null, t.owner = null, t.progress = -1, t.src = null, t.originalSrc = null, t.result = null, t.onload = null, t.onprogress = null, t.onError = null, t.init = function(e, t) {
            this.src = e, this.originalSrc = e, this.owner = t
        }, t.load = function(e) {
            null != e && (this.src = e), this.request = new XMLHttpRequest, this.request.open("GET", this.src, !0), this.request.responseType = "arraybuffer", this.request.onload = createjs.proxy(this.handleLoad, this), this.request.onError = createjs.proxy(this.handleError, this), this.request.onprogress = createjs.proxy(this.handleProgress, this), this.request.send()
        }, t.handleProgress = function(e, t) {
            this.progress = e / t, null != this.onprogress && this.onprogress({
                loaded: e,
                total: t,
                progress: this.progress
            })
        }, t.handleLoad = function() {
            this.owner.context.decodeAudioData(this.request.response, createjs.proxy(this.handleAudioDecoded, this), createjs.proxy(this.handleError, this))
        }, t.handleAudioDecoded = function(e) {
            this.progress = 1, this.result = e, this.src = this.originalSrc, this.owner.addPreloadResults(this.src, this.result), this.onload && this.onload()
        }, t.handleError = function(e) {
            this.owner.removeSound(this.src), this.onerror && this.onerror(e)
        }, t.toString = function() {
            return "[WebAudioPlugin Loader]"
        }, createjs.WebAudioPlugin.Loader = e
    }(), this.createjs = this.createjs || {},
    function() {
        function e() {
            this.init()
        }
        var t = e;
        t.MAX_INSTANCES = 30, t.capabilities = null, t.AUDIO_READY = "canplaythrough", t.AUDIO_ENDED = "ended", t.AUDIO_SEEKED = "seeked", t.AUDIO_ERROR = "error", t.AUDIO_STALLED = "stalled", t.enableIOS = !1, t.isSupported = function() {
            if (createjs.Sound.BrowserDetect.isIOS && !t.enableIOS) return !1;
            t.generateCapabilities();
            var e = t.tag;
            return null == e || null == t.capabilities ? !1 : !0
        }, t.generateCapabilities = function() {
            if (null == t.capabilities) {
                var e = t.tag = document.createElement("audio");
                if (null == e.canPlayType) return null;
                t.capabilities = {
                    panning: !0,
                    volume: !0,
                    tracks: -1
                };
                for (var i = createjs.Sound.SUPPORTED_EXTENSIONS, n = createjs.Sound.EXTENSION_MAP, s = 0, a = i.length; a > s; s++) {
                    var r = i[s],
                        o = n[r] || r;
                    t.capabilities[r] = "no" != e.canPlayType("audio/" + r) && "" != e.canPlayType("audio/" + r) || "no" != e.canPlayType("audio/" + o) && "" != e.canPlayType("audio/" + o)
                }
            }
        };
        var i = e.prototype;
        i.capabilities = null, i.audioSources = null, i.defaultNumChannels = 2, i.loadedHandler = null, i.init = function() {
            this.capabilities = t.capabilities, this.audioSources = {}
        }, i.register = function(e, t) {
            this.audioSources[e] = !0;
            for (var i = createjs.HTMLAudioPlugin.TagPool.get(e), n = null, s = t || this.defaultNumChannels, a = 0; s > a; a++) n = this.createTag(e), i.add(n);
            if (n.id = e, this.loadedHandler = createjs.proxy(this.handleTagLoad, this), n.addEventListener && n.addEventListener("canplaythrough", this.loadedHandler), null == n.onreadystatechange) n.onreadystatechange = this.loadedHandler;
            else {
                var r = n.onreadystatechange;
                n.onreadystatechange = function() {
                    r(), this.loadedHandler()
                }
            }
            return {
                tag: n,
                numChannels: s
            }
        }, i.handleTagLoad = function(e) {
            e.target.removeEventListener && e.target.removeEventListener("canplaythrough", this.loadedHandler), e.target.onreadystatechange = null, e.target.src != e.target.id && createjs.HTMLAudioPlugin.TagPool.checkSrc(e.target.id)
        }, i.createTag = function(e) {
            var t = document.createElement("audio");
            return t.autoplay = !1, t.preload = "none", t.src = e, t
        }, i.removeSound = function(e) {
            delete this.audioSources[e], createjs.HTMLAudioPlugin.TagPool.remove(e)
        }, i.removeAllSounds = function() {
            this.audioSources = {}, createjs.HTMLAudioPlugin.TagPool.removeAll()
        }, i.create = function(e) {
            if (!this.isPreloadStarted(e)) {
                var t = createjs.HTMLAudioPlugin.TagPool.get(e),
                    i = this.createTag(e);
                i.id = e, t.add(i), this.preload(e, {
                    tag: i
                })
            }
            return new createjs.HTMLAudioPlugin.SoundInstance(e, this)
        }, i.isPreloadStarted = function(e) {
            return null != this.audioSources[e]
        }, i.preload = function(e, t, i) {
            this.audioSources[e] = !0, null != i && (t.tag.src = i + e), new createjs.HTMLAudioPlugin.Loader(e, t.tag)
        }, i.toString = function() {
            return "[HTMLAudioPlugin]"
        }, createjs.HTMLAudioPlugin = e
    }(),
    function() {
        function e(e, t) {
            this.init(e, t)
        }
        var t = e.prototype;
        t.src = null, t.uniqueId = -1, t.playState = null, t.owner = null, t.loaded = !1, t.offset = 0, t.delay = 0, t._volume = 1, Object.defineProperty(t, "volume", {
            get: function() {
                return this._volume
            },
            set: function(e) {
                null != Number(e) && (e = Math.max(0, Math.min(1, e)), this._volume = e, this.updateVolume())
            }
        }), t.pan = 0, t.duration = 0, t.remainingLoops = 0, t.delayTimeoutId = null, t.tag = null, t.muted = !1, t.paused = !1, t.addEventListener = null, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, t.endedHandler = null, t.readyHandler = null, t.stalledHandler = null, t.loopHandler = null, t.init = function(e, t) {
            this.src = e, this.owner = t, this.endedHandler = createjs.proxy(this.handleSoundComplete, this), this.readyHandler = createjs.proxy(this.handleSoundReady, this), this.stalledHandler = createjs.proxy(this.handleSoundStalled, this), this.loopHandler = createjs.proxy(this.handleSoundLoop, this)
        }, t.sendEvent = function(e) {
            var t = new createjs.Event(e);
            this.dispatchEvent(t)
        }, t.cleanUp = function() {
            var e = this.tag;
            if (null != e) {
                e.pause(), e.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1), e.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), e.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
                try {
                    e.currentTime = 0
                } catch (t) {}
                createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, e), this.tag = null
            }
            clearTimeout(this.delayTimeoutId), null != window.createjs && createjs.Sound.playFinished(this)
        }, t.interrupt = function() {
            null != this.tag && (this.playState = createjs.Sound.PLAY_INTERRUPTED, this.cleanUp(), this.paused = !1, this.sendEvent("interrupted"))
        }, t.play = function(e, t, i, n, s, a) {
            this.cleanUp(), createjs.Sound.playInstance(this, e, t, i, n, s, a)
        }, t.beginPlaying = function(e, t, i, n) {
            if (null == window.createjs) return -1;
            var s = this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);
            return null == s ? (this.playFailed(), -1) : (s.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1), this.offset = e, this.volume = i, this.pan = n, this.updateVolume(), this.remainingLoops = t, 4 !== s.readyState ? (s.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), s.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED, this.stalledHandler, !1), s.preload = "auto", s.load()) : this.handleSoundReady(null), this.sendEvent("succeeded"), 1)
        }, t.handleSoundStalled = function() {
            this.cleanUp(), this.sendEvent("failed")
        }, t.handleSoundReady = function() {
            if (null != window.createjs) {
                if (this.duration = 1e3 * this.tag.duration, this.playState = createjs.Sound.PLAY_SUCCEEDED, this.paused = !1, this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), this.offset >= this.getDuration()) return void this.playFailed();
                this.offset > 0 && (this.tag.currentTime = .001 * this.offset), -1 == this.remainingLoops && (this.tag.loop = !0), 0 != this.remainingLoops && (this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1), this.tag.loop = !0), this.tag.play()
            }
        }, t.pause = function() {
            return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || null == this.tag ? !1 : (this.paused = !0, this.tag.pause(), clearTimeout(this.delayTimeoutId), !0)
        }, t.resume = function() {
            return this.paused && null != this.tag ? (this.paused = !1, this.tag.play(), !0) : !1
        }, t.stop = function() {
            return this.offset = 0, this.pause(), this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), !0
        }, t.setMasterVolume = function() {
            return this.updateVolume(), !0
        }, t.setVolume = function(e) {
            return this.volume = e, !0
        }, t.updateVolume = function() {
            if (null != this.tag) {
                var e = this.muted || createjs.Sound.masterMute ? 0 : this._volume * createjs.Sound.masterVolume;
                return e != this.tag.volume && (this.tag.volume = e), !0
            }
            return !1
        }, t.getVolume = function() {
            return this.volume
        }, t.setMasterMute = function() {
            return this.updateVolume(), !0
        }, t.setMute = function(e) {
            return null == e || void 0 == e ? !1 : (this.muted = e, this.updateVolume(), !0)
        }, t.getMute = function() {
            return this.muted
        }, t.setPan = function() {
            return !1
        }, t.getPan = function() {
            return 0
        }, t.getPosition = function() {
            return null == this.tag ? this.offset : 1e3 * this.tag.currentTime
        }, t.setPosition = function(e) {
            if (null == this.tag) this.offset = e;
            else {
                this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
                try {
                    this.tag.currentTime = .001 * e
                } catch (t) {
                    return !1
                }
                this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1)
            }
            return !0
        }, t.getDuration = function() {
            return this.duration
        }, t.handleSoundComplete = function() {
            this.offset = 0, null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.sendEvent("complete"))
        }, t.handleSoundLoop = function() {
            this.offset = 0, this.remainingLoops--, 0 == this.remainingLoops && (this.tag.loop = !1, this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1)), this.sendEvent("loop")
        }, t.playFailed = function() {
            null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED, this.cleanUp(), this.sendEvent("failed"))
        }, t.toString = function() {
            return "[HTMLAudioPlugin SoundInstance]"
        }, createjs.EventDispatcher.initialize(e.prototype), createjs.HTMLAudioPlugin.SoundInstance = e
    }(),
    function() {
        function e(e, t) {
            this.init(e, t)
        }
        var t = e.prototype;
        t.src = null, t.tag = null, t.preloadTimer = null, t.loadedHandler = null, t.init = function(e, t) {
            if (this.src = e, this.tag = t, this.preloadTimer = setInterval(createjs.proxy(this.preloadTick, this), 200), this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this), this.tag.addEventListener && this.tag.addEventListener("canplaythrough", this.loadedHandler), null == this.tag.onreadystatechange) this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);
            else {
                var i = this.tag.onreadystatechange;
                this.tag.onreadystatechange = function() {
                    i(), this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this)
                }
            }
            this.tag.preload = "auto", this.tag.load()
        }, t.preloadTick = function() {
            var e = this.tag.buffered,
                t = this.tag.duration;
            e.length > 0 && e.end(0) >= t - 1 && this.handleTagLoaded()
        }, t.handleTagLoaded = function() {
            clearInterval(this.preloadTimer)
        }, t.sendLoadedEvent = function() {
            this.tag.removeEventListener && this.tag.removeEventListener("canplaythrough", this.loadedHandler), this.tag.onreadystatechange = null, createjs.Sound.sendFileLoadEvent(this.src)
        }, t.toString = function() {
            return "[HTMLAudioPlugin Loader]"
        }, createjs.HTMLAudioPlugin.Loader = e
    }(),
    function() {
        function e(e) {
            this.init(e)
        }
        var t = e;
        t.tags = {}, t.get = function(i) {
            var n = t.tags[i];
            return null == n && (n = t.tags[i] = new e(i)), n
        }, t.remove = function(e) {
            var i = t.tags[e];
            return null == i ? !1 : (i.removeAll(), delete t.tags[e], !0)
        }, t.removeAll = function() {
            for (var e in t.tags) t.tags[e].removeAll();
            t.tags = {}
        }, t.getInstance = function(e) {
            var i = t.tags[e];
            return null == i ? null : i.get()
        }, t.setInstance = function(e, i) {
            var n = t.tags[e];
            return null == n ? null : n.set(i)
        }, t.checkSrc = function(e) {
            var i = t.tags[e];
            return null == i ? null : void i.checkSrcChange()
        };
        var i = e.prototype;
        i.src = null, i.length = 0, i.available = 0, i.tags = null, i.init = function(e) {
            this.src = e, this.tags = []
        }, i.add = function(e) {
            this.tags.push(e), this.length++, this.available++
        }, i.removeAll = function() {
            for (; this.length--;) delete this.tags[this.length];
            this.src = null, this.tags.length = 0
        }, i.get = function() {
            if (0 == this.tags.length) return null;
            this.available = this.tags.length;
            var e = this.tags.pop();
            return null == e.parentNode && document.body.appendChild(e), e
        }, i.set = function(e) {
            var t = createjs.indexOf(this.tags, e); - 1 == t && this.tags.push(e), this.available = this.tags.length
        }, i.checkSrcChange = function() {
            for (var e = this.tags.length - 1, t = this.tags[e].src; e--;) this.tags[e].src = t
        }, i.toString = function() {
            return "[HTMLAudioPlugin TagPool]"
        }, createjs.HTMLAudioPlugin.TagPool = e
    }(), ! function() {
        function e(e, t) {
            if (e || (e = {}), !t) return e;
            for (var i in t) "undefined" == typeof e[i] && (e[i] = t[i]);
            return e
        }

        function t(e, t) {
            if (e) throw new RangeError(t)
        }
        var i = 9007199254740992,
            n = -i,
            s = "0123456789",
            a = "abcdefghijklmnopqrstuvwxyz",
            r = a.toUpperCase(),
            o = s + "abcdef",
            l = function(e) {
                void 0 !== e && ("function" == typeof e ? this.random = e : this.seed = e), "undefined" == typeof this.random && (this.mt = this.mersenne_twister(e), this.random = function() {
                    return this.mt.random(this.seed)
                })
            };
        l.prototype.bool = function(i) {
            return i = e(i, {
                likelihood: 50
            }), t(i.likelihood < 0 || i.likelihood > 100, "Chance: Likelihood accepts values from 0 to 100."), 100 * this.random() < i.likelihood
        }, l.prototype.character = function(i) {
            i = e(i);
            var n, o, l = "!@#$%^&*()[]";
            return t(i.alpha && i.symbols, "Chance: Cannot specify both alpha and symbols."), n = "lower" === i.casing ? a : "upper" === i.casing ? r : a + r, o = i.pool ? i.pool : i.alpha ? n : i.symbols ? l : n + s + l, o.charAt(this.natural({
                max: o.length - 1
            }))
        }, l.prototype.floating = function(n) {
            var s;
            n = e(n, {
                fixed: 4
            });
            var a = Math.pow(10, n.fixed);
            t(n.fixed && n.precision, "Chance: Cannot specify both fixed and precision.");
            var r = i / a,
                o = -r;
            t(n.min && n.fixed && n.min < o, "Chance: Min specified is out of range with fixed. Min should be, at least, " + o), t(n.max && n.fixed && n.max > r, "Chance: Max specified is out of range with fixed. Max should be, at most, " + r), n = e(n, {
                min: o,
                max: r
            }), s = this.integer({
                min: n.min * a,
                max: n.max * a
            });
            var l = (s / a).toFixed(n.fixed);
            return parseFloat(l)
        }, l.prototype.integer = function(t) {
            var s, a;
            t = e(t, {
                min: n,
                max: i
            }), a = Math.max(Math.abs(t.min), Math.abs(t.max));
            do s = this.natural({
                max: a
            }), s = this.bool() ? s : -1 * s; while (s < t.min || s > t.max);
            return s
        }, l.prototype.natural = function(n) {
            return n = e(n, {
                min: 0,
                max: i
            }), t(n.min > n.max, "Chance: Min cannot be greater than Max."), Math.floor(this.random() * (n.max - n.min + 1) + n.min)
        }, l.prototype.normal = function(t) {
            t = e(t, {
                mean: 0,
                dev: 1
            });
            var i, n, s, a, r = t.mean,
                o = t.dev;
            do n = 2 * this.random() - 1, s = 2 * this.random() - 1, i = n * n + s * s; while (i >= 1);
            return a = n * Math.sqrt(-2 * Math.log(i) / i), o * a + r
        }, l.prototype.string = function(t) {
            t = e(t);
            for (var i = t.length || this.natural({
                    min: 5,
                    max: 20
                }), n = "", s = t.pool, a = 0; i > a; a++) n += this.character({
                pool: s
            });
            return n
        }, l.prototype.capitalize = function(e) {
            return e.charAt(0).toUpperCase() + e.substr(1)
        }, l.prototype.mixin = function(e) {
            for (var t in e) l.prototype[t] = e[t];
            return this
        }, l.prototype.pick = function(e, t) {
            return t && 1 !== t ? this.shuffle(e).slice(0, t) : e[this.natural({
                max: e.length - 1
            })]
        }, l.prototype.shuffle = function(e) {
            for (var t = e.slice(0), i = [], n = 0, s = Number(t.length), a = 0; s > a; a++) n = this.natural({
                max: t.length - 1
            }), i[a] = t[n], t.splice(n, 1);
            return i
        }, l.prototype.paragraph = function(t) {
            t = e(t);
            for (var i = t.sentences || this.natural({
                    min: 3,
                    max: 7
                }), n = [], s = 0; i > s; s++) n.push(this.sentence());
            return n.join(" ")
        }, l.prototype.sentence = function(t) {
            t = e(t);
            for (var i, n = t.words || this.natural({
                    min: 12,
                    max: 18
                }), s = [], a = 0; n > a; a++) s.push(this.word());
            return i = s.join(" "), i = this.capitalize(i) + "."
        }, l.prototype.syllable = function(t) {
            t = e(t);
            for (var i, n = t.length || this.natural({
                    min: 2,
                    max: 3
                }), s = "bcdfghjklmnprstvwz", a = "aeiou", r = s + a, o = "", l = 0; n > l; l++) i = this.character(0 === l ? {
                pool: r
            } : -1 === s.indexOf(i) ? {
                pool: s
            } : {
                pool: a
            }), o += i;
            return o
        }, l.prototype.word = function(i) {
            i = e(i), t(i.syllables && i.length, "Chance: Cannot specify both syllables AND length.");
            var n = i.syllables || this.natural({
                    min: 1,
                    max: 3
                }),
                s = "";
            if (i.length) {
                do s += this.syllable(); while (s.length < i.length);
                s = s.substring(0, i.length)
            } else
                for (var a = 0; n > a; a++) s += this.syllable();
            return s
        }, l.prototype.age = function(t) {
            t = e(t);
            var i;
            switch (t.type) {
                case "child":
                    i = this.natural({
                        min: 1,
                        max: 12
                    });
                    break;
                case "teen":
                    i = this.natural({
                        min: 13,
                        max: 19
                    });
                    break;
                case "adult":
                    i = this.natural({
                        min: 18,
                        max: 120
                    });
                    break;
                case "senior":
                    i = this.natural({
                        min: 65,
                        max: 120
                    });
                    break;
                default:
                    i = this.natural({
                        min: 1,
                        max: 120
                    })
            }
            return i
        }, l.prototype.birthday = function(t) {
            return t = e(t, {
                year: (new Date).getFullYear() - this.age(t)
            }), this.date(t)
        };
        var h = ["Sophia", "Emma", "Isabella", "Jacob", "Mason", "Ethan", "Noah", "Olivia", "William", "Liam", "Jayden", "Michael", "Ava", "Alexander", "Aiden", "Daniel", "Matthew", "Elijah", "Emily", "James", "Anthony", "Benjamin", "Abigail", "Joshua", "Andrew", "David", "Joseph", "Logan", "Jackson", "Mia", "Christopher", "Gabriel", "Madison", "Samuel", "Ryan", "Lucas", "John", "Nathan", "Isaac", "Dylan", "Caleb", "Elizabeth", "Chloe", "Christian", "Landon", "Jonathan", "Carter", "Ella", "Luke", "Owen", "Brayden", "Avery", "Gavin", "Wyatt", "Addison", "Isaiah", "Aubrey", "Henry", "Eli", "Hunter", "Lily", "Jack", "Natalie", "Evan", "Sofia", "Jordan", "Nicholas", "Tyler", "Aaron", "Charlotte", "Zoey", "Jeremiah", "Julian", "Cameron", "Grace", "Hannah", "Amelia", "Harper", "Levi", "Lillian", "Brandon", "Angel", "Austin", "Connor", "Adrian", "Robert", "Samantha", "Charles", "Evelyn", "Victoria", "Thomas", "Brooklyn", "Sebastian", "Zoe", "Colton", "Jaxon", "Layla", "Kevin", "Zachary", "Ayden", "Dominic", "Blake", "Jose", "Hailey", "Oliver", "Justin", "Bentley", "Leah", "Jason", "Chase", "Ian", "Kaylee", "Anna", "Aaliyah", "Gabriella", "Josiah", "Allison", "Parker", "Xavier", "Nevaeh", "Alexis", "Adam", "Audrey", "Cooper", "Savannah", "Sarah", "Alyssa", "Claire", "Taylor", "Riley", "Camila", "Nathaniel", "Arianna", "Ashley", "Grayson", "Jace", "Brianna", "Carson", "Sophie", "Peyton", "Nolan", "Tristan", "Luis", "Brody", "Bella", "Khloe", "Genesis", "Alexa", "Juan", "Hudson", "Serenity", "Kylie", "Aubree", "Scarlett", "Bryson", "Carlos", "Stella", "Maya", "Easton", "Katherine", "Julia", "Damian", "Alex", "Kayden", "Ryder", "Lucy", "Madelyn", "Jesus", "Cole", "Autumn", "Makayla", "Kayla", "Mackenzie", "Micah", "Vincent", "Max", "Lauren", "Jaxson", "Gianna", "Eric", "Ariana", "Asher", "Hayden", "Faith", "Alexandra", "Melanie", "Sydney", "Bailey", "Caroline", "Naomi", "Morgan", "Kennedy", "Ellie", "Jasmine", "Eva", "Skylar", "Diego", "Kimberly", "Violet", "Molly", "Miles", "Steven", "Aria", "Ivan", "Jocelyn", "Trinity", "Elias", "Aidan", "Maxwell", "London", "Bryce", "Lydia", "Madeline", "Antonio", "Giovanni", "Reagan", "Timothy", "Bryan", "Piper", "Andrea", "Santiago", "Annabelle", "Maria", "Colin", "Richard", "Braxton", "Kaleb", "Brooke", "Kyle", "Kaden", "Preston", "Payton", "Miguel", "Jonah", "Paisley", "Paige", "Lincoln", "Ruby", "Nora", "Riley", "Mariah", "Leo", "Victor", "Brady", "Jeremy", "Mateo", "Brian", "Jaden", "Ashton", "Patrick", "Rylee", "Declan", "Lilly", "Brielle", "Sean", "Joel", "Gael", "Sawyer", "Alejandro", "Jade", "Marcus", "Destiny", "Leonardo", "Jesse", "Caden", "Jake", "Kaiden", "Nicole", "Mila", "Wesley", "Kendall", "Liliana", "Camden", "Kaitlyn", "Natalia", "Sadie", "Edward", "Brantley", "Jordyn", "Roman", "Vanessa", "Mary", "Mya", "Penelope", "Isabelle", "Alice", "Axel", "Silas", "Jude", "Grant", "Reese", "Gabrielle", "Hadley", "Katelyn", "Angelina", "Rachel", "Isabel", "Eleanor", "Cayden", "Emmanuel", "George", "Clara", "Brooklynn", "Jessica", "Maddox", "Malachi", "Bradley", "Alan", "Weston", "Elena", "Gage", "Aliyah", "Vivian", "Laila", "Sara", "Amy", "Devin", "Eliana", "Greyson", "Lyla", "Juliana", "Kenneth", "Mark", "Oscar", "Tanner", "Rylan", "Valeria", "Adriana", "Nicolas", "Makenzie", "Harrison", "Elise", "Mckenzie", "Derek", "Quinn", "Delilah", "Peyton", "Ezra", "Cora", "Kylee", "Tucker", "Emmett", "Avery", "Cody", "Rebecca", "Gracie", "Izabella", "Calvin", "Andres", "Jorge", "Abel", "Paul", "Abraham", "Kai", "Josephine", "Alaina", "Michelle", "Jennifer", "Collin", "Theodore", "Ezekiel", "Eden", "Omar", "Jayce", "Valentina", "Conner", "Bennett", "Aurora", "Catherine", "Stephanie", "Trevor", "Valerie", "Eduardo", "Peter", "Maximus", "Jayla", "Jaiden", "Willow", "Jameson", "Seth", "Daisy", "Alana", "Melody", "Hazel", "Kingston", "Summer", "Melissa", "Javier", "Margaret", "Travis", "Kinsley", "Kinley", "Garrett", "Everett", "Ariel", "Lila", "Graham", "Giselle", "Ryleigh", "Xander", "Haley", "Julianna", "Ivy", "Alivia", "Cristian", "Brynn", "Damien", "Ryker", "Griffin", "Keira", "Daniela", "Aniyah", "Angela", "Kate", "Londyn", "Corbin", "Myles", "Hayden", "Harmony", "Adalyn", "Luca", "Zane", "Francisco", "Ricardo", "Alexis", "Stephen", "Zayden", "Megan", "Allie", "Gabriela", "Iker", "Drake", "Alayna", "Lukas", "Presley", "Charlie", "Spencer", "Zion", "Erick", "Jenna", "Josue", "Alexandria", "Ashlyn", "Adrianna", "Jada", "Jeffrey", "Trenton", "Fiona", "Chance", "Norah", "Paxton", "Elliot", "Emery", "Fernando", "Maci", "Miranda", "Keegan", "Landen", "Ximena", "Amaya", "Manuel", "Amir", "Shane", "Cecilia", "Raymond", "Andre", "Ana", "Shelby", "Katie", "Hope", "Callie", "Jordan", "Luna", "Leilani", "Eliza", "Mckenna", "Angel", "Genevieve", "Makenna", "Isla", "Lola", "Danielle", "Chelsea", "Leila", "Tessa", "Adelyn", "Camille", "Mikayla", "Adeline", "Adalynn", "Sienna", "Esther", "Jacqueline", "Emerson", "Arabella", "Maggie", "Athena", "Lucia", "Lexi", "Ayla"];
        l.prototype.first = function() {
            return this.pick(h)
        }, l.prototype.gender = function() {
            return this.pick(["Male", "Female"])
        };
        var c = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes", "Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan", "Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "McDonald", "Cruz", "Marshall", "Ortiz", "Gomez", "Murray", "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter", "Hicks", "Crawford", "Henry", "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos", "Reyes", "Burns", "Gordon", "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels", "Palmer", "Mills", "Nichols", "Grant", "Knight", "Ferguson", "Rose", "Stone", "Hawkins", "Dunn", "Perkins", "Hudson", "Spencer", "Gardner", "Stephens", "Payne", "Pierce", "Berry", "Matthews", "Arnold", "Wagner", "Willis", "Ray", "Watkins", "Olson", "Carroll", "Duncan", "Snyder", "Hart", "Cunningham", "Bradley", "Lane", "Andrews", "Ruiz", "Harper", "Fox", "Riley", "Armstrong", "Carpenter", "Weaver", "Greene", "Lawrence", "Elliott", "Chavez", "Sims", "Austin", "Peters", "Kelley", "Franklin", "Lawson", "Fields", "Gutierrez", "Ryan", "Schmidt", "Carr", "Vasquez", "Castillo", "Wheeler", "Chapman", "Oliver", "Montgomery", "Richards", "Williamson", "Johnston", "Banks", "Meyer", "Bishop", "McCoy", "Howell", "Alvarez", "Morrison", "Hansen", "Fernandez", "Garza", "Harvey", "Little", "Burton", "Stanley", "Nguyen", "George", "Jacobs", "Reid", "Kim", "Fuller", "Lynch", "Dean", "Gilbert", "Garrett", "Romero", "Welch", "Larson", "Frazier", "Burke", "Hanson", "Day", "Mendoza", "Moreno", "Bowman", "Medina", "Fowler", "Brewer", "Hoffman", "Carlson", "Silva", "Pearson", "Holland", "Douglas", "Fleming", "Jensen", "Vargas", "Byrd", "Davidson", "Hopkins", "May", "Terry", "Herrera", "Wade", "Soto", "Walters", "Curtis", "Neal", "Caldwell", "Lowe", "Jennings", "Barnett", "Graves", "Jimenez", "Horton", "Shelton", "Barrett", "Obrien", "Castro", "Sutton", "Gregory", "McKinney", "Lucas", "Miles", "Craig", "Rodriquez", "Chambers", "Holt", "Lambert", "Fletcher", "Watts", "Bates", "Hale", "Rhodes", "Pena", "Beck", "Newman", "Haynes", "McDaniel", "Mendez", "Bush", "Vaughn", "Parks", "Dawson", "Santiago", "Norris", "Hardy", "Love", "Steele", "Curry", "Powers", "Schultz", "Barker", "Guzman", "Page", "Munoz", "Ball", "Keller", "Chandler", "Weber", "Leonard", "Walsh", "Lyons", "Ramsey", "Wolfe", "Schneider", "Mullins", "Benson", "Sharp", "Bowen", "Daniel", "Barber", "Cummings", "Hines", "Baldwin", "Griffith", "Valdez", "Hubbard", "Salazar", "Reeves", "Warner", "Stevenson", "Burgess", "Santos", "Tate", "Cross", "Garner", "Mann", "Mack", "Moss", "Thornton", "Dennis", "McGee", "Farmer", "Delgado", "Aguilar", "Vega", "Glover", "Manning", "Cohen", "Harmon", "Rodgers", "Robbins", "Newton", "Todd", "Blair", "Higgins", "Ingram", "Reese", "Cannon", "Strickland", "Townsend", "Potter", "Goodwin", "Walton", "Rowe", "Hampton", "Ortega", "Patton", "Swanson", "Joseph", "Francis", "Goodman", "Maldonado", "Yates", "Becker", "Erickson", "Hodges", "Rios", "Conner", "Adkins", "Webster", "Norman", "Malone", "Hammond", "Flowers", "Cobb", "Moody", "Quinn", "Blake", "Maxwell", "Pope", "Floyd", "Osborne", "Paul", "McCarthy", "Guerrero", "Lindsey", "Estrada", "Sandoval", "Gibbs", "Tyler", "Gross", "Fitzgerald", "Stokes", "Doyle", "Sherman", "Saunders", "Wise", "Colon", "Gill", "Alvarado", "Greer", "Padilla", "Simon", "Waters", "Nunez", "Ballard", "Schwartz", "McBride", "Houston", "Christensen", "Klein", "Pratt", "Briggs", "Parsons", "McLaughlin", "Zimmerman", "French", "Buchanan", "Moran", "Copeland", "Roy", "Pittman", "Brady", "McCormick", "Holloway", "Brock", "Poole", "Frank", "Logan", "Owen", "Bass", "Marsh", "Drake", "Wong", "Jefferson", "Park", "Morton", "Abbott", "Sparks", "Patrick", "Norton", "Huff", "Clayton", "Massey", "Lloyd", "Figueroa", "Carson", "Bowers", "Roberson", "Barton", "Tran", "Lamb", "Harrington", "Casey", "Boone", "Cortez", "Clarke", "Mathis", "Singleton", "Wilkins", "Cain", "Bryan", "Underwood", "Hogan", "McKenzie", "Collier", "Luna", "Phelps", "McGuire", "Allison", "Bridges", "Wilkerson", "Nash", "Summers", "Atkins"];
        l.prototype.last = function() {
            return this.pick(c)
        }, l.prototype.name = function(t) {
            t = e(t);
            var i, n = this.first(),
                s = this.last();
            return i = t.middle ? n + " " + this.first() + " " + s : t.middle_initial ? n + " " + this.character({
                alpha: !0,
                casing: "upper"
            }) + ". " + s : n + " " + s, t.prefix && (i = this.prefix() + " " + i), i
        }, l.prototype.name_prefixes = function() {
            return [{
                name: "Doctor",
                abbreviation: "Dr."
            }, {
                name: "Miss",
                abbreviation: "Miss"
            }, {
                name: "Misses",
                abbreviation: "Mrs."
            }, {
                name: "Mister",
                abbreviation: "Mr."
            }]
        }, l.prototype.prefix = function(e) {
            return this.name_prefix(e)
        }, l.prototype.name_prefix = function(t) {
            return t = e(t), t.full ? this.pick(this.name_prefixes()).name : this.pick(this.name_prefixes()).abbreviation
        }, l.prototype.color = function(t) {
            function i(e, t) {
                return [e, e, e].join(t || "")
            }
            t = e(t, {
                format: this.pick(["hex", "shorthex", "rgb"]),
                grayscale: !1
            });
            var n = t.grayscale;
            if ("hex" === t.format) return "#" + (n ? i(this.hash({
                length: 2
            })) : this.hash({
                length: 6
            }));
            if ("shorthex" === t.format) return "#" + (n ? i(this.hash({
                length: 1
            })) : this.hash({
                length: 3
            }));
            if ("rgb" === t.format) return n ? "rgb(" + i(this.natural({
                max: 255
            }), ",") + ")" : "rgb(" + this.natural({
                max: 255
            }) + "," + this.natural({
                max: 255
            }) + "," + this.natural({
                max: 255
            }) + ")";
            throw new Error('Invalid format provided. Please provide one of "hex", "shorthex", or "rgb"')
        }, l.prototype.domain = function(t) {
            return t = e(t), this.word() + "." + (t.tld || this.tld())
        }, l.prototype.email = function(t) {
            return t = e(t), this.word() + "@" + (t.domain || this.domain())
        }, l.prototype.fbid = function() {
            return parseInt("10000" + this.natural({
                max: 1e11
            }), 10)
        }, l.prototype.hashtag = function() {
            return "#" + this.word()
        }, l.prototype.ip = function() {
            return this.natural({
                max: 255
            }) + "." + this.natural({
                max: 255
            }) + "." + this.natural({
                max: 255
            }) + "." + this.natural({
                max: 255
            })
        }, l.prototype.ipv6 = function() {
            for (var e = "", t = 0; 8 > t; t++) e += this.hash({
                length: 4
            }) + ":";
            return e.substr(0, e.length - 1)
        }, l.prototype.klout = function() {
            return this.natural({
                min: 1,
                max: 99
            })
        }, l.prototype.tlds = function() {
            return ["com", "org", "edu", "gov", "co.uk", "net", "io"]
        }, l.prototype.tld = function() {
            return this.pick(this.tlds())
        }, l.prototype.twitter = function() {
            return "@" + this.word()
        }, l.prototype.address = function(t) {
            return t = e(t), this.natural({
                min: 5,
                max: 2e3
            }) + " " + this.street(t)
        }, l.prototype.areacode = function(t) {
            t = e(t, {
                parens: !0
            });
            var i = this.natural({
                min: 2,
                max: 9
            }).toString() + this.natural({
                min: 0,
                max: 8
            }).toString() + this.natural({
                min: 0,
                max: 9
            }).toString();
            return t.parens ? "(" + i + ")" : i
        }, l.prototype.city = function() {
            return this.capitalize(this.word({
                syllables: 3
            }))
        }, l.prototype.coordinates = function(t) {
            return t = e(t), this.latitude(t) + ", " + this.longitude(t)
        }, l.prototype.latitude = function(t) {
            return t = e(t, {
                fixed: 5
            }), this.floating({
                min: -90,
                max: 90,
                fixed: t.fixed
            })
        }, l.prototype.longitude = function(t) {
            return t = e(t, {
                fixed: 5
            }), this.floating({
                min: 0,
                max: 180,
                fixed: t.fixed
            })
        }, l.prototype.phone = function(t) {
            t = e(t, {
                formatted: !0
            }), t.formatted || (t.parens = !1);
            var i = this.areacode(t).toString(),
                n = this.natural({
                    min: 2,
                    max: 9
                }).toString() + this.natural({
                    min: 0,
                    max: 9
                }).toString() + this.natural({
                    min: 0,
                    max: 9
                }).toString(),
                s = this.natural({
                    min: 1e3,
                    max: 9999
                }).toString();
            return t.formatted ? i + " " + n + "-" + s : i + n + s
        }, l.prototype.postal = function() {
            var e = this.character({
                    pool: "XVTSRPNKLMHJGECBA"
                }),
                t = e + this.natural({
                    max: 9
                }) + this.character({
                    alpha: !0,
                    casing: "upper"
                }),
                i = this.natural({
                    max: 9
                }) + this.character({
                    alpha: !0,
                    casing: "upper"
                }) + this.natural({
                    max: 9
                });
            return t + " " + i
        }, l.prototype.provinces = function() {
            return [{
                name: "Alberta",
                abbreviation: "AB"
            }, {
                name: "British Columbia",
                abbreviation: "BC"
            }, {
                name: "Manitoba",
                abbreviation: "MB"
            }, {
                name: "New Brunswick",
                abbreviation: "NB"
            }, {
                name: "Newfoundland and Labrador",
                abbreviation: "NL"
            }, {
                name: "Nova Scotia",
                abbreviation: "NS"
            }, {
                name: "Ontario",
                abbreviation: "ON"
            }, {
                name: "Prince Edward Island",
                abbreviation: "PE"
            }, {
                name: "Quebec",
                abbreviation: "QC"
            }, {
                name: "Saskatchewan",
                abbreviation: "SK"
            }, {
                name: "Northwest Territories",
                abbreviation: "NT"
            }, {
                name: "Nunavut",
                abbreviation: "NU"
            }, {
                name: "Yukon",
                abbreviation: "YT"
            }]
        }, l.prototype.province = function(e) {
            return e && e.full ? this.pick(this.provinces()).name : this.pick(this.provinces()).abbreviation
        }, l.prototype.radio = function(t) {
            t = e(t, {
                side: "?"
            });
            var i = "";
            switch (t.side.toLowerCase()) {
                case "east":
                case "e":
                    i = "W";
                    break;
                case "west":
                case "w":
                    i = "K";
                    break;
                default:
                    i = this.character({
                        pool: "KW"
                    })
            }
            return i + this.character({
                alpha: !0,
                casing: "upper"
            }) + this.character({
                alpha: !0,
                casing: "upper"
            }) + this.character({
                alpha: !0,
                casing: "upper"
            })
        }, l.prototype.state = function(e) {
            return e && e.full ? this.pick(this.states()).name : this.pick(this.states()).abbreviation
        }, l.prototype.states = function() {
            return [{
                name: "Alabama",
                abbreviation: "AL"
            }, {
                name: "Alaska",
                abbreviation: "AK"
            }, {
                name: "American Samoa",
                abbreviation: "AS"
            }, {
                name: "Arizona",
                abbreviation: "AZ"
            }, {
                name: "Arkansas",
                abbreviation: "AR"
            }, {
                name: "Armed Forces Europe",
                abbreviation: "AE"
            }, {
                name: "Armed Forces Pacific",
                abbreviation: "AP"
            }, {
                name: "Armed Forces the Americas",
                abbreviation: "AA"
            }, {
                name: "California",
                abbreviation: "CA"
            }, {
                name: "Colorado",
                abbreviation: "CO"
            }, {
                name: "Connecticut",
                abbreviation: "CT"
            }, {
                name: "Delaware",
                abbreviation: "DE"
            }, {
                name: "District of Columbia",
                abbreviation: "DC"
            }, {
                name: "Federated States of Micronesia",
                abbreviation: "FM"
            }, {
                name: "Florida",
                abbreviation: "FL"
            }, {
                name: "Georgia",
                abbreviation: "GA"
            }, {
                name: "Guam",
                abbreviation: "GU"
            }, {
                name: "Hawaii",
                abbreviation: "HI"
            }, {
                name: "Idaho",
                abbreviation: "ID"
            }, {
                name: "Illinois",
                abbreviation: "IL"
            }, {
                name: "Indiana",
                abbreviation: "IN"
            }, {
                name: "Iowa",
                abbreviation: "IA"
            }, {
                name: "Kansas",
                abbreviation: "KS"
            }, {
                name: "Kentucky",
                abbreviation: "KY"
            }, {
                name: "Louisiana",
                abbreviation: "LA"
            }, {
                name: "Maine",
                abbreviation: "ME"
            }, {
                name: "Marshall Islands",
                abbreviation: "MH"
            }, {
                name: "Maryland",
                abbreviation: "MD"
            }, {
                name: "Massachusetts",
                abbreviation: "MA"
            }, {
                name: "Michigan",
                abbreviation: "MI"
            }, {
                name: "Minnesota",
                abbreviation: "MN"
            }, {
                name: "Mississippi",
                abbreviation: "MS"
            }, {
                name: "Missouri",
                abbreviation: "MO"
            }, {
                name: "Montana",
                abbreviation: "MT"
            }, {
                name: "Nebraska",
                abbreviation: "NE"
            }, {
                name: "Nevada",
                abbreviation: "NV"
            }, {
                name: "New Hampshire",
                abbreviation: "NH"
            }, {
                name: "New Jersey",
                abbreviation: "NJ"
            }, {
                name: "New Mexico",
                abbreviation: "NM"
            }, {
                name: "New York",
                abbreviation: "NY"
            }, {
                name: "North Carolina",
                abbreviation: "NC"
            }, {
                name: "North Dakota",
                abbreviation: "ND"
            }, {
                name: "Northern Mariana Islands",
                abbreviation: "MP"
            }, {
                name: "Ohio",
                abbreviation: "OH"
            }, {
                name: "Oklahoma",
                abbreviation: "OK"
            }, {
                name: "Oregon",
                abbreviation: "OR"
            }, {
                name: "Pennsylvania",
                abbreviation: "PA"
            }, {
                name: "Puerto Rico",
                abbreviation: "PR"
            }, {
                name: "Rhode Island",
                abbreviation: "RI"
            }, {
                name: "South Carolina",
                abbreviation: "SC"
            }, {
                name: "South Dakota",
                abbreviation: "SD"
            }, {
                name: "Tennessee",
                abbreviation: "TN"
            }, {
                name: "Texas",
                abbreviation: "TX"
            }, {
                name: "Utah",
                abbreviation: "UT"
            }, {
                name: "Vermont",
                abbreviation: "VT"
            }, {
                name: "Virgin Islands, U.S.",
                abbreviation: "VI"
            }, {
                name: "Virginia",
                abbreviation: "VA"
            }, {
                name: "Washington",
                abbreviation: "WA"
            }, {
                name: "West Virginia",
                abbreviation: "WV"
            }, {
                name: "Wisconsin",
                abbreviation: "WI"
            }, {
                name: "Wyoming",
                abbreviation: "WY"
            }]
        }, l.prototype.street = function(t) {
            t = e(t);
            var i = this.word({
                syllables: 2
            });
            return i = this.capitalize(i), i += " ", i += t.short_suffix ? this.street_suffix().abbreviation : this.street_suffix().name
        }, l.prototype.street_suffix = function() {
            return this.pick(this.street_suffixes())
        }, l.prototype.street_suffixes = function() {
            return [{
                name: "Avenue",
                abbreviation: "Ave"
            }, {
                name: "Boulevard",
                abbreviation: "Blvd"
            }, {
                name: "Center",
                abbreviation: "Ctr"
            }, {
                name: "Circle",
                abbreviation: "Cir"
            }, {
                name: "Court",
                abbreviation: "Ct"
            }, {
                name: "Drive",
                abbreviation: "Dr"
            }, {
                name: "Extension",
                abbreviation: "Ext"
            }, {
                name: "Glen",
                abbreviation: "Gln"
            }, {
                name: "Grove",
                abbreviation: "Grv"
            }, {
                name: "Heights",
                abbreviation: "Hts"
            }, {
                name: "Highway",
                abbreviation: "Hwy"
            }, {
                name: "Junction",
                abbreviation: "Jct"
            }, {
                name: "Key",
                abbreviation: "Key"
            }, {
                name: "Lane",
                abbreviation: "Ln"
            }, {
                name: "Loop",
                abbreviation: "Loop"
            }, {
                name: "Manor",
                abbreviation: "Mnr"
            }, {
                name: "Mill",
                abbreviation: "Mill"
            }, {
                name: "Park",
                abbreviation: "Park"
            }, {
                name: "Parkway",
                abbreviation: "Pkwy"
            }, {
                name: "Pass",
                abbreviation: "Pass"
            }, {
                name: "Path",
                abbreviation: "Path"
            }, {
                name: "Pike",
                abbreviation: "Pike"
            }, {
                name: "Place",
                abbreviation: "Pl"
            }, {
                name: "Plaza",
                abbreviation: "Plz"
            }, {
                name: "Point",
                abbreviation: "Pt"
            }, {
                name: "Ridge",
                abbreviation: "Rdg"
            }, {
                name: "River",
                abbreviation: "Riv"
            }, {
                name: "Road",
                abbreviation: "Rd"
            }, {
                name: "Square",
                abbreviation: "Sq"
            }, {
                name: "Street",
                abbreviation: "St"
            }, {
                name: "Terrace",
                abbreviation: "Ter"
            }, {
                name: "Trail",
                abbreviation: "Trl"
            }, {
                name: "Turnpike",
                abbreviation: "Tpke"
            }, {
                name: "View",
                abbreviation: "Vw"
            }, {
                name: "Way",
                abbreviation: "Way"
            }]
        }, l.prototype.zip = function(e) {
            for (var t = "", i = 0; 5 > i; i++) t += this.natural({
                max: 9
            }).toString();
            if (e && e.plusfour === !0)
                for (t += "-", i = 0; 4 > i; i++) t += this.natural({
                    max: 9
                }).toString();
            return t
        }, l.prototype.ampm = function() {
            return this.bool() ? "am" : "pm"
        }, l.prototype.date = function(t) {
            var i, n = this.month({
                raw: !0
            });
            t = e(t, {
                year: parseInt(this.year(), 10),
                month: n.numeric - 1,
                day: this.natural({
                    min: 1,
                    max: n.days
                }),
                hour: this.hour(),
                minute: this.minute(),
                second: this.second(),
                millisecond: this.millisecond(),
                american: !0,
                string: !1
            });
            var s = new Date(t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond);
            return i = t.american ? s.getMonth() + 1 + "/" + s.getDate() + "/" + s.getFullYear() : s.getDate() + "/" + (s.getMonth() + 1) + "/" + s.getFullYear(), t.string ? i : s
        }, l.prototype.hammertime = function(e) {
            return this.date(e).getTime()
        }, l.prototype.hour = function(t) {
            t = e(t);
            var i = t.twentyfour ? 24 : 12;
            return this.natural({
                min: 1,
                max: i
            })
        }, l.prototype.millisecond = function() {
            return this.natural({
                max: 999
            })
        }, l.prototype.minute = l.prototype.second = function() {
            return this.natural({
                max: 59
            })
        }, l.prototype.month = function(t) {
            t = e(t);
            var i = this.pick(this.months());
            return t.raw ? i : i.name
        }, l.prototype.months = function() {
            return [{
                name: "January",
                short_name: "Jan",
                numeric: "01",
                days: 31
            }, {
                name: "February",
                short_name: "Feb",
                numeric: "02",
                days: 28
            }, {
                name: "March",
                short_name: "Mar",
                numeric: "03",
                days: 31
            }, {
                name: "April",
                short_name: "Apr",
                numeric: "04",
                days: 30
            }, {
                name: "May",
                short_name: "May",
                numeric: "05",
                days: 31
            }, {
                name: "June",
                short_name: "Jun",
                numeric: "06",
                days: 30
            }, {
                name: "July",
                short_name: "Jul",
                numeric: "07",
                days: 31
            }, {
                name: "August",
                short_name: "Aug",
                numeric: "08",
                days: 31
            }, {
                name: "September",
                short_name: "Sep",
                numeric: "09",
                days: 30
            }, {
                name: "October",
                short_name: "Oct",
                numeric: "10",
                days: 31
            }, {
                name: "November",
                short_name: "Nov",
                numeric: "11",
                days: 30
            }, {
                name: "December",
                short_name: "Dec",
                numeric: "12",
                days: 31
            }]
        }, l.prototype.second = function() {
            return this.natural({
                max: 59
            })
        }, l.prototype.timestamp = function() {
            return this.natural({
                min: 1,
                max: parseInt((new Date).getTime() / 1e3, 10)
            })
        }, l.prototype.year = function(t) {
            return t = e(t, {
                min: (new Date).getFullYear()
            }), t.max = "undefined" != typeof t.max ? t.max : t.min + 100, this.natural(t).toString()
        }, l.prototype.cc = function(t) {
            t = e(t);
            var i, n, s;
            i = this.cc_type(t.type ? {
                name: t.type,
                raw: !0
            } : {
                raw: !0
            }), n = i.prefix.split(""), s = i.length - i.prefix.length - 1;
            for (var a = 0; s > a; a++) n.push(this.integer({
                min: 0,
                max: 9
            }));
            return n.push(this.luhn_calculate(n.join(""))), n.join("")
        }, l.prototype.cc_types = function() {
            return [{
                name: "American Express",
                short_name: "amex",
                prefix: "34",
                length: 15
            }, {
                name: "Bankcard",
                short_name: "bankcard",
                prefix: "5610",
                length: 16
            }, {
                name: "China UnionPay",
                short_name: "chinaunion",
                prefix: "62",
                length: 16
            }, {
                name: "Diners Club Carte Blanche",
                short_name: "dccarte",
                prefix: "300",
                length: 14
            }, {
                name: "Diners Club enRoute",
                short_name: "dcenroute",
                prefix: "2014",
                length: 15
            }, {
                name: "Diners Club International",
                short_name: "dcintl",
                prefix: "36",
                length: 14
            }, {
                name: "Diners Club United States & Canada",
                short_name: "dcusc",
                prefix: "54",
                length: 16
            }, {
                name: "Discover Card",
                short_name: "discover",
                prefix: "6011",
                length: 16
            }, {
                name: "InstaPayment",
                short_name: "instapay",
                prefix: "637",
                length: 16
            }, {
                name: "JCB",
                short_name: "jcb",
                prefix: "3528",
                length: 16
            }, {
                name: "Laser",
                short_name: "laser",
                prefix: "6304",
                length: 16
            }, {
                name: "Maestro",
                short_name: "maestro",
                prefix: "5018",
                length: 16
            }, {
                name: "Mastercard",
                short_name: "mc",
                prefix: "51",
                length: 16
            }, {
                name: "Solo",
                short_name: "solo",
                prefix: "6334",
                length: 16
            }, {
                name: "Switch",
                short_name: "switch",
                prefix: "4903",
                length: 16
            }, {
                name: "Visa",
                short_name: "visa",
                prefix: "4",
                length: 16
            }, {
                name: "Visa Electron",
                short_name: "electron",
                prefix: "4026",
                length: 16
            }]
        }, l.prototype.cc_type = function(t) {
            t = e(t);
            var i = this.cc_types(),
                n = null;
            if (t.name) {
                for (var s = 0; s < i.length; s++)
                    if (i[s].name === t.name || i[s].short_name === t.name) {
                        n = i[s];
                        break
                    }
                if (null === n) throw new Error("Credit card type '" + t.name + "'' is not suppoted")
            } else n = this.pick(i);
            return t.raw ? n : n.name
        }, l.prototype.dollar = function(t) {
            t = e(t, {
                max: 1e4,
                min: 0
            });
            var i = this.floating({
                    min: t.min,
                    max: t.max,
                    fixed: 2
                }).toString(),
                n = i.split(".")[1];
            return void 0 === n ? i += ".00" : n.length < 2 && (i += "0"), "$" + i
        }, l.prototype.exp = function(t) {
            t = e(t);
            var i = {};
            return i.year = this.exp_year(), i.month = i.year === (new Date).getFullYear() ? this.exp_month({
                future: !0
            }) : this.exp_month(), t.raw ? i : i.month + "/" + i.year
        }, l.prototype.exp_month = function(t) {
            t = e(t);
            var i, n;
            if (t.future) {
                do i = this.month({
                    raw: !0
                }).numeric, n = parseInt(i, 10); while (n < (new Date).getMonth())
            } else i = this.month({
                raw: !0
            }).numeric;
            return i
        }, l.prototype.exp_year = function() {
            return this.year({
                max: (new Date).getFullYear() + 10
            })
        }, l.prototype.d4 = function() {
            return this.natural({
                min: 1,
                max: 4
            })
        }, l.prototype.d6 = function() {
            return this.natural({
                min: 1,
                max: 6
            })
        }, l.prototype.d8 = function() {
            return this.natural({
                min: 1,
                max: 8
            })
        }, l.prototype.d10 = function() {
            return this.natural({
                min: 1,
                max: 10
            })
        }, l.prototype.d12 = function() {
            return this.natural({
                min: 1,
                max: 12
            })
        }, l.prototype.d20 = function() {
            return this.natural({
                min: 1,
                max: 20
            })
        }, l.prototype.d30 = function() {
            return this.natural({
                min: 1,
                max: 30
            })
        }, l.prototype.d100 = function() {
            return this.natural({
                min: 1,
                max: 100
            })
        }, l.prototype.rpg = function(t, i) {
            if (i = e(i), null === t) throw new Error("A type of die roll must be included");
            var n = t.toLowerCase().split("d"),
                s = [];
            if (2 !== n.length || !parseInt(n[0], 10) || !parseInt(n[1], 10)) throw new Error("Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");
            for (var a = n[0]; a > 0; a--) s[a - 1] = this.natural({
                min: 1,
                max: n[1]
            });
            return "undefined" != typeof i.sum && i.sum ? s.reduce(function(e, t) {
                return e + t
            }) : s
        }, l.prototype.guid = function(e) {
            e = e || {
                version: 5
            };
            var t = "ABCDEF1234567890",
                i = "AB89",
                n = this.string({
                    pool: t,
                    length: 8
                }) + "-" + this.string({
                    pool: t,
                    length: 4
                }) + "-" + e.version + this.string({
                    pool: t,
                    length: 3
                }) + "-" + this.string({
                    pool: i,
                    length: 1
                }) + this.string({
                    pool: t,
                    length: 3
                }) + "-" + this.string({
                    pool: t,
                    length: 12
                });
            return n
        }, l.prototype.hash = function(t) {
            t = e(t, {
                length: 40,
                casing: "lower"
            });
            var i = "upper" === t.casing ? o.toUpperCase() : o;
            return this.string({
                pool: i,
                length: t.length
            })
        }, l.prototype.luhn_check = function(e) {
            var t = e.toString(),
                i = +t.substring(t.length - 1);
            return i === this.luhn_calculate(+t.substring(0, t.length - 1))
        }, l.prototype.luhn_calculate = function(e) {
            for (var t = e.toString().split("").reverse(), i = 0, n = 0, s = t.length; s > n; ++n) {
                var a = +t[n];
                0 === n % 2 && (a *= 2, a > 9 && (a -= 9)), i += a
            }
            return 9 * i % 10
        }, l.prototype.mersenne_twister = function(e) {
            return new u(e)
        }, l.prototype.VERSION = "0.5.3";
        var u = function(e) {
            void 0 === e && (e = (new Date).getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(e)
        };
        u.prototype.init_genrand = function(e) {
            for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++) e = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (1812433253 * ((4294901760 & e) >>> 16) << 16) + 1812433253 * (65535 & e) + this.mti, this.mt[this.mti] >>>= 0
        }, u.prototype.init_by_array = function(e, t) {
            var i, n, s = 1,
                a = 0;
            for (this.init_genrand(19650218), i = this.N > t ? this.N : t; i; i--) n = this.mt[s - 1] ^ this.mt[s - 1] >>> 30, this.mt[s] = (this.mt[s] ^ (1664525 * ((4294901760 & n) >>> 16) << 16) + 1664525 * (65535 & n)) + e[a] + a, this.mt[s] >>>= 0, s++, a++, s >= this.N && (this.mt[0] = this.mt[this.N - 1], s = 1), a >= t && (a = 0);
            for (i = this.N - 1; i; i--) n = this.mt[s - 1] ^ this.mt[s - 1] >>> 30, this.mt[s] = (this.mt[s] ^ (1566083941 * ((4294901760 & n) >>> 16) << 16) + 1566083941 * (65535 & n)) - s, this.mt[s] >>>= 0, s++, s >= this.N && (this.mt[0] = this.mt[this.N - 1], s = 1);
            this.mt[0] = 2147483648
        }, u.prototype.genrand_int32 = function() {
            var e, t = new Array(0, this.MATRIX_A);
            if (this.mti >= this.N) {
                var i;
                for (this.mti === this.N + 1 && this.init_genrand(5489), i = 0; i < this.N - this.M; i++) e = this.mt[i] & this.UPPER_MASK | this.mt[i + 1] & this.LOWER_MASK, this.mt[i] = this.mt[i + this.M] ^ e >>> 1 ^ t[1 & e];
                for (; i < this.N - 1; i++) e = this.mt[i] & this.UPPER_MASK | this.mt[i + 1] & this.LOWER_MASK, this.mt[i] = this.mt[i + (this.M - this.N)] ^ e >>> 1 ^ t[1 & e];
                e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ t[1 & e], this.mti = 0
            }
            return e = this.mt[this.mti++], e ^= e >>> 11, e ^= 2636928640 & e << 7, e ^= 4022730752 & e << 15, e ^= e >>> 18, e >>> 0
        }, u.prototype.genrand_int31 = function() {
            return this.genrand_int32() >>> 1
        }, u.prototype.genrand_real1 = function() {
            return this.genrand_int32() * (1 / 4294967295)
        }, u.prototype.random = function() {
            return this.genrand_int32() * (1 / 4294967296)
        }, u.prototype.genrand_real3 = function() {
            return (this.genrand_int32() + .5) * (1 / 4294967296)
        }, u.prototype.genrand_res53 = function() {
            var e = this.genrand_int32() >>> 5,
                t = this.genrand_int32() >>> 6;
            return (67108864 * e + t) * (1 / 9007199254740992)
        }, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (exports = module.exports = l), exports.Chance = l), "function" == typeof define && define.amd && define("Chance", [], function() {
            return l
        }), "object" == typeof window && "object" == typeof window.document && (window.Chance = l, window.chance = new l)
    }(),
    function(e) {
        e.hideAddressbar = function(t) {
            t = "string" == typeof t ? document.querySelector(t) : t;
            var i = navigator.userAgent,
                n = ~i.indexOf("iPhone") || ~i.indexOf("iPod"),
                s = ~i.indexOf("iPad"),
                a = n || s,
                r = ~i.indexOf("Android"),
                o = e.navigator.standalone,
                l = 0;
            if ((a || r) && t) {
                r && e.addEventListener("scroll", function() {
                    t.style.height = e.innerHeight + "px"
                }, !1);
                var h = function() {
                    var i = 0;
                    a ? (i = document.documentElement.clientHeight, n && !o && (i += 60)) : r && (i = e.innerHeight + 56), t.style.height = i + "px", setTimeout(scrollTo, 0, 0, 1)
                };
                ! function c() {
                    var i = t.offsetWidth;
                    l !== i && (l = i, h(), e.addEventListener("resize", c, !1), console.log("resizefunt"))
                }()
            }
        }
    }(this);
var REVERSE_PREFIX = "REV",
    onVisibilityChangeSoundMuted = !1,
    visibilityState, allBgs = [],
    allBgContainer, OBJ_TOP_POS = 0,
    OBJ_BOTTOM_POS = 1,
    OBJ_VERTICAL_ANY_POS = 2,
    OBJ_LEFT_POS = 3,
    OBJ_RIGHT_POS = 4,
    OBJ_HORIZ_ANY_POS = 5,
    allAutoAligned = [],
    isLogoReady = !1,
    isGameInited = !1,
    sponsorLogo, logoDefaultY = 0,
    logoDefaultX = 0,
    currentLogoHorizPos = 0,
    currentLogoVertPos = 0,
    LOGO_TOP_POS = 0,
    LOGO_BOTTOM_POS = 1,
    LOGO_VERTICAL_ANY_POS = 2,
    LOGO_LEFT_POS = 3,
    LOGO_RIGHT_POS = 4,
    LOGO_HORIZ_ANY_POS = 5,
    logoPosDivisor = 1,
    sponsorLogoBitmap, currentLogoParams = {
        x: 0,
        y: 0,
        scale: 1
    },
    isAdPauseSoundMuted = !1,
    isSponsorLogoError = !1,
    logoConfig, sponsorPreload, sponsorLogoDefWidth = 1,
    sponsorLogoDefHeight = 1;
! function(e, t) {
    function i() {
        function e() {
            var i;
            return i = t("amd"), i.fork = e, i
        }
        return e()
    }

    function n() {
        function i() {
            function n() {
                var t, i;
                for (i = Array.prototype.slice.apply(arguments), t = 0; t < a.length; t += 1) "undefined" == typeof r[a[t]] ? delete e[a[t]] : e[a[t]] = r[a[t]];
                for (r = {}, t = 0; t < i.length; t += 1) {
                    if ("string" != typeof i[t]) throw new Error("Cannot replace namespaces. All new namespaces must be strings.");
                    r[i[t]] = e[i[t]], e[i[t]] = s
                }
                return a = i
            }
            var s, a = [],
                r = {};
            return s = t("global"), s.fork = i, s.noConflict = n, s
        }
        var n;
        n = i(), n.noConflict("KeyboardJS", "k")
    }[].indexOf || (Array.prototype.indexOf = function(e, t, i) {
        for (i = this.length, t = (i + ~~t) % i; i > t && (!(t in this) || this[t] !== e); t++);
        return t ^ i ? t : -1
    }), "function" == typeof define && define.amd ? define(i) : n()
}(this, function() {
    function e() {
        window.addEventListener ? (document.addEventListener("keydown", n, !1), document.addEventListener("keyup", s, !1), window.addEventListener("blur", i, !1), window.addEventListener("webkitfullscreenchange", i, !1), window.addEventListener("mozfullscreenchange", i, !1)) : window.attachEvent && (document.attachEvent("onkeydown", n), document.attachEvent("onkeyup", s), window.attachEvent("onblur", i))
    }

    function t() {
        i(), window.removeEventListener ? (document.removeEventListener("keydown", n, !1), document.removeEventListener("keyup", s, !1), window.removeEventListener("blur", i, !1), window.removeEventListener("webkitfullscreenchange", i, !1), window.removeEventListener("mozfullscreenchange", i, !1)) : window.detachEvent && (document.detachEvent("onkeydown", n), document.detachEvent("onkeyup", s), window.detachEvent("onblur", i))
    }

    function i(e) {
        M = [], c(), v(e)
    }

    function n(e) {
        var t, i;
        if (t = a(e.keyCode), !(t.length < 1)) {
            for (i = 0; i < t.length; i += 1) P(t[i]);
            h(), _(e)
        }
    }

    function s(e) {
        var t, i;
        if (t = a(e.keyCode), !(t.length < 1)) {
            for (i = 0; i < t.length; i += 1) A(t[i]);
            c(), v(e)
        }
    }

    function a(e) {
        return w[e] || []
    }

    function r(e) {
        var t;
        for (t in w)
            if (w.hasOwnProperty(t) && w[t].indexOf(e) > -1) return t;
        return !1
    }

    function o(e, t) {
        if ("string" != typeof e && ("object" != typeof e || "function" != typeof e.push)) throw new Error("Cannot create macro. The combo must be a string or array.");
        if ("object" != typeof t || "function" != typeof t.push) throw new Error("Cannot create macro. The injectedKeys must be an array.");
        L.push([e, t])
    }

    function l(e) {
        var t;
        if ("string" != typeof e && ("object" != typeof e || "function" != typeof e.push)) throw new Error("Cannot remove macro. The combo must be a string or array.");
        for (mI = 0; mI < L.length; mI += 1)
            if (t = L[mI], f(e, t[0])) {
                A(t[1]), L.splice(mI, 1);
                break
            }
    }

    function h() {
        var e, t, i;
        for (e = 0; e < L.length; e += 1)
            if (t = g(L[e][0]), -1 === D.indexOf(L[e]) && m(t))
                for (D.push(L[e]), i = 0; i < L[e][1].length; i += 1) P(L[e][1][i])
    }

    function c() {
        var e, t, i;
        for (e = 0; e < D.length; e += 1)
            if (t = g(D[e][0]), m(t) === !1) {
                for (i = 0; i < D[e][1].length; i += 1) A(D[e][1][i]);
                D.splice(e, 1), e -= 1
            }
    }

    function u(e, t, i) {
        function n() {
            var e;
            for (e = 0; e < h.length; e += 1) R.splice(R.indexOf(h[e]), 1)
        }

        function s(e) {
            function t() {
                var t, n;
                for (t = 0; t < i.length; t += 1)
                    if ("function" == typeof i[t])
                        if ("keyup" === e)
                            for (n = 0; n < h.length; n += 1) h[n].keyUpCallback.splice(h[n].keyUpCallback.indexOf(i[t]), 1);
                        else
                            for (n = 0; n < h.length; n += 1) h[n].keyDownCallback.splice(h[n].keyDownCallback.indexOf(i[t]), 1)
            }
            var i, n, s, a = {};
            if ("string" != typeof e) throw new Error("Cannot bind callback. The event name must be a string.");
            if ("keyup" !== e && "keydown" !== e) throw new Error('Cannot bind callback. The event name must be a "keyup" or "keydown".');
            for (i = Array.prototype.slice.apply(arguments, [1]), n = 0; n < i.length; n += 1)
                if ("function" == typeof i[n])
                    if ("keyup" === e)
                        for (s = 0; s < h.length; s += 1) h[s].keyUpCallback.push(i[n]);
                    else if ("keydown" === e)
                for (s = 0; s < h.length; s += 1) h[s].keyDownCallback.push(i[n]);
            return a.clear = t, a
        }
        var a, r, o, l = {},
            h = [];
        for ("string" == typeof e && (e = g(e)), r = 0; r < e.length; r += 1) {
            if (a = {}, o = S([e[r]]), "string" != typeof o) throw new Error("Failed to bind key combo. The key combo must be string.");
            a.keyCombo = o, a.keyDownCallback = [], a.keyUpCallback = [], t && a.keyDownCallback.push(t), i && a.keyUpCallback.push(i), R.push(a), h.push(a)
        }
        return l.clear = n, l.on = s, l
    }

    function d(e) {
        var t, i;
        for (t = 0; t < R.length; t += 1) i = R[t], f(e, i.keyCombo) && (R.splice(t, 1), t -= 1)
    }

    function p(e) {
        var t, i, n;
        if (e) {
            for (t = 0; t < R.length; t += 1)
                for (n = R[t], i = 0; i < n.keyCombo.length; i += 1)
                    if (n.keyCombo[i].indexOf(e) > -1) {
                        R.splice(t, 1), t -= 1;
                        break
                    }
        } else R = []
    }

    function _(e) {
        var t, i, n, s, a, r, o, l, h, c, u, d = [];
        for (a = [].concat(M), t = 0; t < R.length; t += 1) u = T(R[t].keyCombo).length, d[u] || (d[u] = []), d[u].push(R[t]);
        for (i = d.length - 1; i >= 0; i -= 1)
            if (d[i])
                for (t = 0; t < d[i].length; t += 1) {
                    for (n = d[i][t], s = T(n.keyCombo), h = !0, l = 0; l < s.length; l += 1)
                        if (-1 === a.indexOf(s[l])) {
                            h = !1;
                            break
                        }
                    if (h && m(n.keyCombo)) {
                        for (N.push(n), l = 0; l < s.length; l += 1) c = a.indexOf(s[l]), c > -1 && (a.splice(c, 1), l -= 1);
                        for (r = 0; r < n.keyDownCallback.length; r += 1) n.keyDownCallback[r](e, E(), n.keyCombo) === !1 && (o = !0);
                        o === !0 && (e.preventDefault(), e.stopPropagation())
                    }
                }
    }

    function v(e) {
        var t, i, n, s;
        for (t = 0; t < N.length; t += 1)
            if (n = N[t], m(n.keyCombo) === !1) {
                for (i = 0; i < n.keyUpCallback.length; i += 1) n.keyUpCallback[i](e, E(), n.keyCombo) === !1 && (s = !0);
                s === !0 && (e.preventDefault(), e.stopPropagation()), N.splice(t, 1), t -= 1
            }
    }

    function f(e, t) {
        var i, n, s;
        if (e = g(e), t = g(t), e.length !== t.length) return !1;
        for (i = 0; i < e.length; i += 1) {
            if (e[i].length !== t[i].length) return !1;
            for (n = 0; n < e[i].length; n += 1) {
                if (e[i][n].length !== t[i][n].length) return !1;
                for (s = 0; s < e[i][n].length; s += 1)
                    if (-1 === t[i][n].indexOf(e[i][n][s])) return !1
            }
        }
        return !0
    }

    function m(e) {
        var t, i, n, s, a, r, o = 0;
        for (e = g(e), t = 0; t < e.length; t += 1) {
            for (r = !0, o = 0, i = 0; i < e[t].length; i += 1) {
                for (n = [].concat(e[t][i]), s = o; s < M.length; s += 1) a = n.indexOf(M[s]), a > -1 && (n.splice(a, 1), o = s);
                if (0 !== n.length) {
                    r = !1;
                    break
                }
            }
            if (r) return !0
        }
        return !1
    }

    function T(e) {
        var t, i, n = [];
        for (e = g(e), t = 0; t < e.length; t += 1)
            for (i = 0; i < e[t].length; i += 1) n = n.concat(e[t][i]);
        return n
    }

    function g(e) {
        var t = e,
            i = 0,
            n = 0,
            s = !1,
            a = !1,
            r = [],
            o = [],
            l = [],
            h = "";
        if ("object" == typeof e && "function" == typeof e.push) return e;
        if ("string" != typeof e) throw new Error('Cannot parse "keyCombo" because its type is "' + typeof e + '". It must be a "string".');
        for (;
            " " === t.charAt(i);) i += 1;
        for (;;) {
            if (" " === t.charAt(i)) {
                for (;
                    " " === t.charAt(i);) i += 1;
                s = !0
            } else if ("," === t.charAt(i)) {
                if (n || a) throw new Error("Failed to parse key combo. Unexpected , at character index " + i + ".");
                a = !0, i += 1
            } else if ("+" === t.charAt(i)) {
                if (h.length && (l.push(h), h = ""), n || a) throw new Error("Failed to parse key combo. Unexpected + at character index " + i + ".");
                n = !0, i += 1
            } else if (">" === t.charAt(i)) {
                if (h.length && (l.push(h), h = ""), l.length && (o.push(l), l = []), n || a) throw new Error("Failed to parse key combo. Unexpected > at character index " + i + ".");
                n = !0, i += 1
            } else if (i < t.length - 1 && "!" === t.charAt(i) && (">" === t.charAt(i + 1) || "," === t.charAt(i + 1) || "+" === t.charAt(i + 1))) h += t.charAt(i + 1), n = !1, s = !1, a = !1, i += 2;
            else {
                if (!(i < t.length && "+" !== t.charAt(i) && ">" !== t.charAt(i) && "," !== t.charAt(i) && " " !== t.charAt(i))) {
                    i += 1;
                    continue
                }
                for ((n === !1 && s === !0 || a === !0) && (h.length && (l.push(h), h = ""), l.length && (o.push(l), l = []), o.length && (r.push(o), o = [])), n = !1, s = !1, a = !1; i < t.length && "+" !== t.charAt(i) && ">" !== t.charAt(i) && "," !== t.charAt(i) && " " !== t.charAt(i);) h += t.charAt(i), i += 1
            }
            if (i >= t.length) {
                h.length && (l.push(h), h = ""), l.length && (o.push(l), l = []), o.length && (r.push(o), o = []);
                break
            }
        }
        return r
    }

    function S(e) {
        var t, i, n = [];
        if ("string" == typeof e) return e;
        if ("object" != typeof e || "function" != typeof e.push) throw new Error("Cannot stringify key combo.");
        for (t = 0; t < e.length; t += 1) {
            for (n[t] = [], i = 0; i < e[t].length; i += 1) n[t][i] = e[t][i].join(" + ");
            n[t] = n[t].join(" > ")
        }
        return n.join(" ")
    }

    function E() {
        return [].concat(M)
    }

    function y(e) {
        return M.indexOf(e) > -1
    }

    function P(e) {
        if (e.match(/\s/)) throw new Error("Cannot add key name " + e + " to active keys because it contains whitespace.");
        M.indexOf(e) > -1 || M.push(e)
    }

    function A(e) {
        var t = r(e);
        "91" === t || "92" === t ? M = [] : M.splice(M.indexOf(e), 1)
    }

    function b(e, t) {
        if ("string" != typeof e) throw new Error("Cannot register new locale. The locale name must be a string.");
        if ("object" != typeof t) throw new Error("Cannot register " + e + " locale. The locale map must be an object.");
        if ("object" != typeof t.map) throw new Error("Cannot register " + e + " locale. The locale map is invalid.");
        t.macros || (t.macros = []), Y[e] = t
    }

    function C(e) {
        if (e) {
            if ("string" != typeof e) throw new Error("Cannot set locale. The locale name must be a string.");
            if (!Y[e]) throw new Error("Cannot set locale to " + e + " because it does not exist. If you would like to submit a " + e + " locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.");
            w = Y[e].map, L = Y[e].macros, B = e
        }
        return B
    }
    var B, w, L, O, I, x = {},
        Y = {},
        M = [],
        R = [],
        N = [],
        D = [];
    for (I = {
            map: {
                3: ["cancel"],
                8: ["backspace"],
                9: ["tab"],
                12: ["clear"],
                13: ["enter"],
                16: ["shift"],
                17: ["ctrl"],
                18: ["alt", "menu"],
                19: ["pause", "break"],
                20: ["capslock"],
                27: ["escape", "esc"],
                32: ["space", "spacebar"],
                33: ["pageup"],
                34: ["pagedown"],
                35: ["end"],
                36: ["home"],
                37: ["left"],
                38: ["up"],
                39: ["right"],
                40: ["down"],
                41: ["select"],
                42: ["printscreen"],
                43: ["execute"],
                44: ["snapshot"],
                45: ["insert", "ins"],
                46: ["delete", "del"],
                47: ["help"],
                91: ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"],
                92: ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"],
                145: ["scrolllock", "scroll"],
                186: ["semicolon", ";"],
                187: ["equal", "equalsign", "="],
                188: ["comma", ","],
                189: ["dash", "-"],
                190: ["period", "."],
                191: ["slash", "forwardslash", "/"],
                192: ["graveaccent", "`"],
                219: ["openbracket", "["],
                220: ["backslash", "\\"],
                221: ["closebracket", "]"],
                222: ["apostrophe", "'"],
                48: ["zero", "0"],
                49: ["one", "1"],
                50: ["two", "2"],
                51: ["three", "3"],
                52: ["four", "4"],
                53: ["five", "5"],
                54: ["six", "6"],
                55: ["seven", "7"],
                56: ["eight", "8"],
                57: ["nine", "9"],
                96: ["numzero", "num0"],
                97: ["numone", "num1"],
                98: ["numtwo", "num2"],
                99: ["numthree", "num3"],
                100: ["numfour", "num4"],
                101: ["numfive", "num5"],
                102: ["numsix", "num6"],
                103: ["numseven", "num7"],
                104: ["numeight", "num8"],
                105: ["numnine", "num9"],
                106: ["nummultiply", "num*"],
                107: ["numadd", "num+"],
                108: ["numenter"],
                109: ["numsubtract", "num-"],
                110: ["numdecimal", "num."],
                111: ["numdevide", "num/"],
                144: ["numlock", "num"],
                112: ["f1"],
                113: ["f2"],
                114: ["f3"],
                115: ["f4"],
                116: ["f5"],
                117: ["f6"],
                118: ["f7"],
                119: ["f8"],
                120: ["f9"],
                121: ["f10"],
                122: ["f11"],
                123: ["f12"]
            },
            macros: [
                ["shift + `", ["tilde", "~"]],
                ["shift + 1", ["exclamation", "exclamationpoint", "!"]],
                ["shift + 2", ["at", "@"]],
                ["shift + 3", ["number", "#"]],
                ["shift + 4", ["dollar", "dollars", "dollarsign", "$"]],
                ["shift + 5", ["percent", "%"]],
                ["shift + 6", ["caret", "^"]],
                ["shift + 7", ["ampersand", "and", "&"]],
                ["shift + 8", ["asterisk", "*"]],
                ["shift + 9", ["openparen", "("]],
                ["shift + 0", ["closeparen", ")"]],
                ["shift + -", ["underscore", "_"]],
                ["shift + =", ["plus", "+"]],
                ["shift + (", ["opencurlybrace", "opencurlybracket", "{"]],
                ["shift + )", ["closecurlybrace", "closecurlybracket", "}"]],
                ["shift + \\", ["verticalbar", "|"]],
                ["shift + ;", ["colon", ":"]],
                ["shift + '", ["quotationmark", '"']],
                ["shift + !,", ["openanglebracket", "<"]],
                ["shift + .", ["closeanglebracket", ">"]],
                ["shift + /", ["questionmark", "?"]]
            ]
        }, O = 65; 90 >= O; O += 1) I.map[O] = String.fromCharCode(O + 32), I.macros.push(["shift + " + String.fromCharCode(O + 32) + ", capslock + " + String.fromCharCode(O + 32), [String.fromCharCode(O)]]);
    return b("us", I), C("us"), e(), x.enable = e, x.disable = t, x.activeKeys = E, x.isPressed = y, x.on = u, x.clear = d, x.clear.key = p, x.locale = C, x.locale.register = b, x.macro = o, x.macro.remove = l, x.key = {}, x.key.name = a, x.key.code = r, x.combo = {}, x.combo.active = m, x.combo.parse = g, x.combo.stringify = S, x
});
var allLevels = [
        [
            ["DECOR_HELP_4_TYPE", 156, 203.95, 1.2, 1.2, 0, [""]],
            ["HERO_2_TYPE", 320.3, 294.65, 1, 1, 0, [""]],
            ["STATIC_TUBE_2_TYPE", 320.85, 788.65, 1, 1, -90, [""]]
        ],
        [
            ["HERO_1_TYPE", 285, 97.6, 1, 1, 0, [""]],
            ["HERO_2_TYPE", 369.75, 301.2, 1, 1, 0, [""]],
            ["STATIC_TUBE_1_TYPE", 208.9, 734.35, 1, 1, -90, [""]],
            ["STATIC_TUBE_2_TYPE", 491.15, 850.9, 1, 1, -90, [""]]
        ],
        [
            ["HERO_3_TYPE", 525.9, 184.1, 1, 1, 0, [""]],
            ["HERO_1_TYPE", 189.1, 116.35, 1, 1, 0, [""]],
            ["BONUS_STAR_TYPE", 537.7, 344.2, 1, 1, 14, [""]],
            ["BONUS_STAR_TYPE", 220.3, 273.35, 1, 1, -14, [""]],
            ["BONUS_STAR_TYPE", 143.5, 493.35, 1, 1, 11, [""]],
            ["STATIC_TUBE_1_TYPE", 188.85, 855.15, 1, 1, -90, [""]],
            ["STATIC_TUBE_3_TYPE", 527.1, 735.8, 1, 1, -90, [""]]
        ],
        [
            ["HERO_1_TYPE", 322.1, 199.95, 1.88, 1, 0, ["R_20_25_SIO"]],
            ["BONUS_STAR_TYPE", 327.1, 399.3, 1, 1, 28, [""]],
            ["BONUS_STAR_TYPE", 561.5, 280.25, 1, 1, 8, [""]],
            ["BONUS_STAR_TYPE", 34.65, 241.3, 1, 1, -7, [""]],
            ["STATIC_TUBE_1_TYPE", 331.45, 756.1, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 420.3, 575.05, .999, .999, 154, [""]],
            ["STATIC_BALK_1_TYPE", 177.25, 349.4, .998, .998, -143, [""]],
            ["HERO_2_TYPE", 205.55, 141.5, 1, 1, 0, [""]],
            ["HERO_2_TYPE", 350.1, 489.85, 1, 1, -12, [""]],
            ["HERO_2_TYPE", 501.45, 399.75, 1, 1, 13, [""]],
            ["BONUS_STAR_TYPE", 222.25, 548.35, 1, 1, -14, [""]],
            ["BONUS_STAR_TYPE", 354, 296.45, 1, 1, 16, [""]],
            ["STATIC_TUBE_2_TYPE", 159.05, 885.6, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 286.7, 575.45, .799, .799, 162, [""]],
            ["HERO_1_TYPE", 298.2, 331.55, 2.13, 1, 0, ["R_80_35_SIO"]],
            ["HERO_2_TYPE", 360.75, 166.5, 1.82, 1, 0, ["L_100_30_EIO"]],
            ["BONUS_STAR_TYPE", 302.75, 484.05, 1, 1, -7, [""]],
            ["BONUS_STAR_TYPE", 571.05, 444.3, 1, 1, 22, [""]],
            ["BONUS_STAR_TYPE", 69.4, 257.35, 1, 1, 8, [""]],
            ["STATIC_TUBE_1_TYPE", 85.4, 831.4, 1, 1, -90, [""]],
            ["STATIC_TUBE_2_TYPE", 567.45, 757.6, 1, 1, -90, [""]]
        ],
        [
            ["DECOR_HELP_3_TYPE", 112.25, 284.45, 1.28, 1.28, 0, [""]],
            ["HERO_3_TYPE", 317.9, 90.3, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 319.95, 226.95, 1, 1, 0, ["2"]],
            ["STATIC_BALK_1_TYPE", 319.95, 389.95, 1, 1, 0, ["2"]],
            ["BONUS_STAR_TYPE", 319, 309.95, 1, 1, 16, [""]],
            ["BONUS_STAR_TYPE", 316.7, 480, 1, 1, -18, [""]],
            ["STATIC_TUBE_3_TYPE", 318.15, 788.6, 1, 1, -90, [""]]
        ],
        [
            ["HERO_3_TYPE", 344.85, 221.15, .9, .9, 9, [""]],
            ["STATIC_BALK_1_TYPE", 306.95, 493.05, 1.07, 1.07, 18, ["2"]],
            ["STATIC_BALK_1_TYPE", 328, 341.25, 1, 1, -22, ["2"]],
            ["HERO_2_TYPE", 291.55, 69.95, .899, .899, -9, [""]],
            ["STATIC_BALK_1_TYPE", 300.45, 632.6, 1, 1, -12, ["2"]],
            ["BONUS_STAR_TYPE", 357, 417.65, 1, 1, 16, [""]],
            ["BONUS_STAR_TYPE", 554.75, 520.7, 1, 1, -2, [""]],
            ["BONUS_STAR_TYPE", 93, 555.4, 1, 1, -14, [""]],
            ["STATIC_TUBE_3_TYPE", 550.75, 868.6, 1, 1, -90, [""]],
            ["STATIC_TUBE_2_TYPE", 84.6, 884.65, 1, 1, -90, [""]]
        ],
        [
            ["HERO_1_TYPE", 319.2, 149.55, 2.28, .9, 0, ["R_80_35_SIO"]],
            ["STATIC_CIRCLE_TYPE", 207.45, 288.75, 1.38, 1.38, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 499.9, 360.05, 1.15, 1.15, 56, [""]],
            ["STATIC_CIRCLE_TYPE", 300.05, 471.8, 1.03, 1.03, 157, [""]],
            ["STATIC_CIRCLE_TYPE", 208.9, 602.55, .82, .82, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 646.15, 537.8, 1.03, 1.03, -31, [""]],
            ["BONUS_STAR_TYPE", 458.7, 554.85, 1, 1, 16, [""]],
            ["BONUS_STAR_TYPE", 303, 296.45, 1, 1, -10, [""]],
            ["STATIC_TUBE_1_TYPE", 508.25, 893.2, 1, 1, -90, [""]],
            ["STATIC_TUBE_1_TYPE", 72.35, 731.05, 1, 1, -90, [""]]
        ],
        [
            ["DECOR_HELP_2_TYPE", 207.3, 165.15, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 414.1, 229.9, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 326.75, 281.75, .998, .998, 0, [""]],
            ["BOMB_TYPE", 327.1, 218.45, 1, 1, 0, ["400_800"]],
            ["HERO_3_TYPE", 228.3, 386.85, .999, .999, 9, [""]],
            ["HERO_2_TYPE", 456.9, 413.95, .999, .999, -9, [""]],
            ["BONUS_STAR_TYPE", 124.7, 561.65, 1, 1, -18, [""]],
            ["STATIC_TUBE_2_TYPE", 555.45, 788.65, 1, 1, -90, [""]],
            ["STATIC_TUBE_3_TYPE", 92.75, 891.2, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 46.4, 215.55, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 131.7, 397.2, .859, .859, -145, [""]],
            ["STATIC_BALK_1_TYPE", 313.9, 429.15, .809, .809, 168, [""]],
            ["STATIC_BALK_1_TYPE", 237.9, 116.2, .998, .998, 135, [""]],
            ["STATIC_BALK_1_TYPE", 239.05, 618.7, .998, .998, 0, [""]],
            ["STATIC_BALK_1_TYPE", 638.9, 391.9, .998, .998, -100, [""]],
            ["STATIC_BALK_1_TYPE", 93.5, 264.1, .809, .809, 131, [""]],
            ["STATIC_BALK_1_TYPE", 423.45, 57.55, .809, .809, -171, [""]],
            ["STATIC_BALK_1_TYPE", 578.35, 179.6, .9, .9, 62, [""]],
            ["BONUS_STAR_TYPE", 419.95, 130.95, 1, 1, -8, [""]],
            ["BONUS_STAR_TYPE", 548.6, 436.3, 1, 1, 11, [""]],
            ["BOMB_TYPE", 234.85, 550.4, 1, 1, 0, ["400_2800"]],
            ["HERO_1_TYPE", 248.1, 249.4, 1, 1, 0, [""]],
            ["STATIC_TUBE_1_TYPE", 508.15, 810.1, 1, 1, -90, [""]],
            ["BOMB_TYPE", 45.25, 139.25, 1, 1, -20, ["400_2000"]]
        ],
        [
            ["TELEPORT_TYPE", 100.9, 158.95, 1, 1, 91, ["A"]],
            ["TELEPORT_TYPE", 508.45, 635.85, 1, 1, 0, ["A"]],
            ["HERO_3_TYPE", 518.7, 183.45, .999, .999, 9, [""]],
            ["BONUS_STAR_TYPE", 97.85, 316.1, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 520.35, 406.75, 1, 1, 33, [""]],
            ["BONUS_STAR_TYPE", 97.85, 471.8, 1, 1, 17, [""]],
            ["STATIC_TUBE_3_TYPE", 92.2, 812.85, 1, 1, -90, [""]]
        ],
        [
            ["TELEPORT_TYPE", 116, 560.2, 1, 1, 91, ["A"]],
            ["TELEPORT_TYPE", 180.45, 372.9, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 517.1, 556.1, 1, 1, 91, ["B"]],
            ["TELEPORT_TYPE", 569.95, 388.9, 1, 1, 0, ["B"]],
            ["HERO_3_TYPE", 320.6, 239.15, 2.29, .95, 0, ["R_50_30_SIO"]],
            ["HERO_2_TYPE", 316.5, 77.05, 2.25, .91, 0, ["L_100_23_SIO"]],
            ["BONUS_STAR_TYPE", 322.75, 371.6, 1, 1, -18, [""]],
            ["STATIC_TUBE_2_TYPE", 518.05, 891.25, 1, 1, -91, [""]],
            ["STATIC_TUBE_3_TYPE", 120.1, 891.2, 1, 1, -89, [""]],
            ["STATIC_BALK_1_TYPE", 107, 471.4, .998, .998, -7, [""]],
            ["STATIC_BALK_1_TYPE", 548.05, 469.55, .998, .998, 15, [""]],
            ["STATIC_BALK_1_TYPE", 329.65, 445.75, .998, .998, -6, [""]]
        ],
        [
            ["TELEPORT_TYPE", 370.05, 640.55, 1, 1, 91, ["A"]],
            ["TELEPORT_TYPE", 570.55, 224.15, 1, 1, 90, ["A"]],
            ["STATIC_BALK_1_TYPE", 610, 475.45, 1, 1, 22, ["2"]],
            ["STATIC_BALK_1_TYPE", 157.05, 649.35, 1.009, 1.009, 13, ["2"]],
            ["HERO_2_TYPE", 261.05, 94.95, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 218.45, 331.4, 1, 1, -22, ["2"]],
            ["STATIC_BALK_1_TYPE", 57.45, 502.4, 1, 1, -19, ["2"]],
            ["STATIC_BALK_1_TYPE", 234.05, 213.75, 1, 1, 15, ["2"]],
            ["BONUS_STAR_TYPE", 73.85, 220.45, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 566.8, 562, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 239.9, 549.5, 1, 1, -18, [""]],
            ["STATIC_TUBE_2_TYPE", 570.6, 858.25, 1, 1, -90, [""]],
            ["STATIC_BALK_1_TYPE", 474.95, 273.6, .998, .998, 90, [""]],
            ["STATIC_BALK_1_TYPE", 474.95, 498.55, .998, .998, 90, [""]],
            ["STATIC_BALK_1_TYPE", 7.95, 252.15, .998, .998, 90, [""]]
        ],
        [
            ["DECOR_HELP_1_TYPE", 344.85, 119, 1, 1, 0, [""]],
            ["BAD_1_TYPE", 186.75, 405.05, 1, 1, 0, [""]],
            ["HERO_3_TYPE", 122.7, 199.95, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 286.55, 591.1, .998, .998, 16, [""]],
            ["STATIC_BALK_1_TYPE", 92.45, 482.65, .998, .998, 43, [""]],
            ["BAD_1_TYPE", 494.65, 201, 1, 1, 0, [""]],
            ["BONUS_STAR_TYPE", 584.25, 569.25, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 306.95, 523.95, 1, 1, 11, [""]],
            ["BONUS_STAR_TYPE", 500.85, 336.15, 1, 1, 30, [""]],
            ["STATIC_TUBE_3_TYPE", 495.85, 868.85, 1, 1, -90, [""]]
        ],
        [
            ["BAD_1_TYPE", 179.2, 416.95, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 178.9, 551, 1, 1, -22, ["2"]],
            ["STATIC_BALK_1_TYPE", 490.95, 611.85, 1, 1, -27, ["2"]],
            ["BAD_1_TYPE", 492.35, 501.5, 1, 1, 0, [""]],
            ["HERO_1_TYPE", 484, 176.6, 1, 1, 7, [""]],
            ["HERO_1_TYPE", 165.2, 193.4, 1, 1, -11, [""]],
            ["BONUS_STAR_TYPE", 489.15, 360.9, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 308.7, 565.25, 1, 1, 26, [""]],
            ["STATIC_TUBE_1_TYPE", 171.05, 879.6, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 145.5, 598.9, .998, .998, -146, [""]],
            ["BAD_1_TYPE", 140.55, 207.65, 1, 1, 0, [""]],
            ["BAD_1_TYPE", 429.6, 542.3, .64, 1, 0, ["R_50_30_SIO"]],
            ["HERO_2_TYPE", 435.15, 225.8, 1, 1, 0, [""]],
            ["BAD_1_TYPE", 532.35, 421.1, .64, 1, 0, ["L_50_25_SIO"]],
            ["BONUS_STAR_TYPE", 155.45, 407.5, 1, 1, 26, [""]],
            ["BONUS_STAR_TYPE", 611.55, 623.7, 1, 1, 26, [""]],
            ["STATIC_TUBE_2_TYPE", 454.05, 887.5, 1, 1, -90, [""]]
        ],
        [
            ["HERO_3_TYPE", 317.4, 442.8, 2.26, .8, 0, ["R_50_55_SIO"]],
            ["HERO_2_TYPE", 327.6, 159.35, 2.34, .8, 0, ["L_100_60_SIO"]],
            ["HERO_1_TYPE", 326.6, 286.4, 2.18, .8, 0, ["R_80_50_SO"]],
            ["BONUS_STAR_TYPE", 516.5, 559.25, 1, 1, -16, [""]],
            ["BONUS_STAR_TYPE", 133.45, 594.6, 1, 1, 26, [""]],
            ["STATIC_TUBE_1_TYPE", 321.15, 787.15, 1, 1, -90, [""]],
            ["STATIC_TUBE_3_TYPE", 130.15, 901.2, 1, 1, -90, [""]],
            ["STATIC_TUBE_2_TYPE", 516.6, 858.25, 1, 1, -90, [""]]
        ],
        [
            ["TELEPORT_TYPE", 573.05, 299.8, 1, 1, 75, ["D"]],
            ["TELEPORT_TYPE", 58.25, 299.8, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 405.5, 299.8, 1, 1, 162, ["C"]],
            ["TELEPORT_TYPE", 228.2, 299.8, 1, 1, 0, ["B"]],
            ["TELEPORT_TYPE", 228.2, 483.4, 1, 1, -88, ["A"]],
            ["TELEPORT_TYPE", 573.05, 483.4, 1, 1, 47, ["B"]],
            ["TELEPORT_TYPE", 405.5, 483.4, 1, 1, 0, ["C"]],
            ["TELEPORT_TYPE", 58.25, 483.4, 1, 1, -61, ["D"]],
            ["TELEPORT_TYPE", 229.25, 710.6, 1, 1, -88, ["E"]],
            ["TELEPORT_TYPE", 393, -302.4, 1, 1, -88, ["E"]],
            ["HERO_1_TYPE", 323.4, 149.8, 2.29, .8, 0, ["R_80_50_SIO"]],
            ["BONUS_STAR_TYPE", 229.75, 591.5, 1, 1, 26, [""]],
            ["STATIC_BALK_1_TYPE", 94.45, 385.95, .998, .998, 0, [""]],
            ["STATIC_BALK_1_TYPE", 320.85, 385.95, .998, .998, 0, [""]],
            ["STATIC_BALK_1_TYPE", 545.65, 383.95, .998, .998, 0, [""]],
            ["STATIC_TUBE_1_TYPE", 402.1, 891.15, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 100.75, 350.95, .998, .998, 0, [""]],
            ["BOMB_TYPE", 178.6, 285.75, .86, .86, 0, ["300_2800"]],
            ["STATIC_BOX_TYPE", 470.05, 206.95, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 647.7, 539.45, .998, .998, 90, [""]],
            ["STATIC_BALK_1_TYPE", 647.7, 313.85, .998, .998, 90, [""]],
            ["BOMB_TYPE", 494.55, 135.15, 1, 1, 0, ["400_2800"]],
            ["STATIC_BALK_1_TYPE", 23.65, 640.7, .998, .998, 13, [""]],
            ["STATIC_BALK_1_TYPE", 9.05, 491.8, .998, .998, 90, [""]],
            ["STATIC_BALK_1_TYPE", 492.95, 335.1, .83, .83, 90, [""]],
            ["STATIC_BALK_1_TYPE", 306.4, 379.2, .86, .86, 15, ["2"]],
            ["BAD_1_TYPE", 105.5, 159.3, .96, .82, 0, ["R_50_30_SIO"]],
            ["STATIC_BALK_1_TYPE", 386.95, 572.35, .83, .83, 90, ["2"]],
            ["BAD_1_TYPE", 562.35, 379.85, .71, .71, 0, [""]],
            ["STATIC_BALK_1_TYPE", 294.7, 468.1, 1, 1, -12, ["2"]],
            ["STATIC_BALK_1_TYPE", 245.45, 667.05, 1, 1, 0, ["2"]],
            ["HERO_3_TYPE", 214.8, 576.4, .8, .8, 0, [""]],
            ["BONUS_STAR_TYPE", 543.05, 573.85, 1, 1, -16, [""]],
            ["BONUS_STAR_TYPE", 566.6, 231.3, 1, 1, -16, [""]],
            ["STATIC_TUBE_3_TYPE", 536.15, 899.15, 1, 1, -90, [""]]
        ],
        [
            ["TELEPORT_TYPE", 82.45, 189.75, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 268.1, 613.6, 1, 1, 0, ["A"]],
            ["STATIC_BALK_1_TYPE", 168.75, 510.3, .998, .998, 90, [""]],
            ["STATIC_BALK_1_TYPE", 168.75, 284.7, .998, .998, 90, [""]],
            ["BAD_1_TYPE", 452.7, 192.15, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", -6, 202.05, .998, .998, 90, [""]],
            ["HERO_2_TYPE", 385.75, 533.3, .8, .8, 0, ["CLICKED"]],
            ["STATIC_BALK_1_TYPE", 280.15, 129.05, .998, .998, -12, [""]],
            ["STATIC_BALK_1_TYPE", 461.15, 604.7, 1, 1, 0, ["2"]],
            ["STATIC_BALK_1_TYPE", 533.15, 270.15, 1, 1, -16, ["2"]],
            ["BAD_1_TYPE", 583.2, 151.8, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 674.5, 539, 1, 1, -32, ["2"]],
            ["STATIC_BALK_1_TYPE", 319.95, 426.9, 1.179, 1.179, 10, ["2"]],
            ["BONUS_STAR_TYPE", 82.5, 313.75, 1, 1, -16, [""]],
            ["BONUS_STAR_TYPE", 82.5, 502.55, 1, 1, 19, [""]],
            ["BONUS_STAR_TYPE", 313.95, 269, 1, 1, 18, [""]],
            ["BONUS_STAR_TYPE", 603.4, 348.8, 1, 1, -16, [""]],
            ["STATIC_TUBE_2_TYPE", 84.6, 877.2, 1, 1, -90, [""]]
        ],
        [
            ["BAD_2_TYPE", 536, 387.6, 1.3, .7, 0, ["R_50_40_SIO"]],
            ["HERO_1_TYPE", 323.4, 141.8, 2.29, .8, 0, ["R_80_50_SIO"]],
            ["BAD_2_TYPE", 460.55, 494.1, 1.25, .7, 0, ["R_0_40_SI"]],
            ["BAD_2_TYPE", 541.6, 594.9, 1.26, .7, 0, ["R_50_24_SIO"]],
            ["HERO_3_TYPE", 318.4, 273.9, 2.08, .8, 0, ["R_50_55_SIO"]],
            ["BAD_2_TYPE", 97, 395.6, 1.15, .7, 0, ["R_50_59_SIO"]],
            ["BAD_2_TYPE", 111, 536.4, 1.15, .7, 0, ["R_0_30_SIO"]],
            ["BONUS_STAR_TYPE", 404.15, 695.9, 1, 1, 19, [""]],
            ["STATIC_TUBE_1_TYPE", 88.2, 899.15, 1, 1, -90, [""]],
            ["STATIC_TUBE_3_TYPE", 550.75, 897.75, 1, 1, -90, [""]]
        ],
        [
            ["HERO_2_TYPE", 111.9, 77.15, .8, .8, 0, ["CLICKED"]],
            ["STATIC_BALK_1_TYPE", 319.3, 346.85, 1, 1, -7, ["2"]],
            ["STATIC_BALK_1_TYPE", 319.65, 480.3, 1.139, 1.139, 7, ["2"]],
            ["HERO_1_TYPE", 207.45, 115.3, .799, .799, -11, ["CLICKED"]],
            ["STATIC_BALK_1_TYPE", 162.1, 182.5, .998, .998, 24, [""]],
            ["HERO_2_TYPE", 455.65, 159.05, .8, .8, 0, ["CLICKED"]],
            ["HERO_1_TYPE", 535, 121.3, .799, .799, -11, ["CLICKED"]],
            ["STATIC_BALK_1_TYPE", 499.25, 200.15, .998, .998, -13, [""]],
            ["STATIC_BALK_1_TYPE", 391.75, 121.6, .7, .7, -90, ["2"]],
            ["STATIC_BALK_1_TYPE", 267.8, 125.05, .7, .7, -90, ["2"]],
            ["STATIC_BALK_1_TYPE", 310, 630.2, 1, 1, -17, ["2"]],
            ["STATIC_BALK_1_TYPE", 641.2, 549, .998, .998, -95, [""]],
            ["STATIC_BALK_1_TYPE", -11.95, 549, .998, .998, -84, [""]],
            ["BONUS_STAR_TYPE", 110.25, 391.4, 1, 1, 19, [""]],
            ["BONUS_STAR_TYPE", 518.35, 573.9, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 264.3, 559.85, 1, 1, 19, [""]],
            ["STATIC_TUBE_1_TYPE", 528.55, 899.15, 1, 1, -90, [""]],
            ["STATIC_TUBE_2_TYPE", 100.1, 902.3, 1, 1, -90, [""]]
        ],
        [
            ["MOVABLE_BALK_TYPE", 414, 253.1, 1.77, .82, -12, ["R_0_20_SIO"]],
            ["HERO_2_TYPE", 494.05, 147.35, .8, .8, 0, [""]],
            ["MOVABLE_BALK_TYPE", 240.2, 392.2, 1.77, .82, 18, ["R_40_25_SIO"]],
            ["MOVABLE_BALK_TYPE", 432.1, 528.7, 1.77, .82, -12, ["R_50_20_SIO"]],
            ["MOVABLE_BALK_TYPE", 71.95, 625.3, 1.029, .819, 18, ["R_40_25_SIO"]],
            ["HERO_3_TYPE", 129.7, 164.65, .8, .8, 0, [""]],
            ["STATIC_TUBE_3_TYPE", 498.05, 901.8, 1, 1, -90, [""]],
            ["STATIC_BALK_1_TYPE", 70.3, 517.1, .909, .909, 0, ["2"]],
            ["BONUS_STAR_TYPE", 515, 608.9, 1, 1, 10, [""]],
            ["BONUS_STAR_TYPE", 86.7, 436.65, 1, 1, -19, [""]],
            ["BONUS_STAR_TYPE", 388.8, 364.85, 1, 1, -19, [""]],
            ["STATIC_TUBE_2_TYPE", 318.05, 891.8, 1, 1, -90, [""]]
        ],
        [
            ["BAD_2_TYPE", 144.25, 164.25, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 603, 362.65, .8, .8, 0, [""]],
            ["BOMB_TYPE", 269.3, 612.95, .86, .86, 0, ["300_2800"]],
            ["STATIC_BOX_TYPE", 9.55, 641.75, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 169.95, 363.1, 1, 1, 14, [""]],
            ["BAD_2_TYPE", 75.55, 371.1, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 407.9, 415.15, .949, .949, 13, [""]],
            ["STATIC_BALK_1_TYPE", 248.85, 462.8, .849, .849, 13, [""]],
            ["HERO_3_TYPE", 272.6, 109.35, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 517.15, 635.15, 1, 1, -16, ["2"]],
            ["STATIC_BALK_1_TYPE", 596.1, 453.65, .739, .739, 12, ["2"]],
            ["BAD_1_TYPE", 454.05, 143.85, .8, .8, 0, [""]],
            ["BAD_1_TYPE", 543.6, 513.45, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 105.45, 692.55, .849, .849, -2, [""]],
            ["STATIC_BALK_1_TYPE", 515.3, 272.7, .909, .909, 11, ["2"]],
            ["STATIC_BALK_1_TYPE", 501.5, 200.9, .74, .74, -14, ["2"]],
            ["BONUS_STAR_TYPE", 133, 604.45, 1, 1, -19, [""]],
            ["BONUS_STAR_TYPE", 261, 393.7, 1, 1, 19, [""]],
            ["BONUS_STAR_TYPE", 608.6, 222.1, 1, 1, 22, [""]],
            ["STATIC_TUBE_3_TYPE", 310.8, 897.75, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 135.45, 407.15, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 559.7, 608.8, .849, .849, 6, [""]],
            ["BOMB_TYPE", 508.6, 189, .86, .86, 0, ["300_2800"]],
            ["STATIC_BOX_TYPE", 503.85, 258.75, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 122.7, 273.75, .739, .739, 171, ["2"]],
            ["BAD_2_TYPE", 127.1, 170.65, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 226.55, 614.5, .91, .91, -158, ["2"]],
            ["STATIC_BALK_1_TYPE", 453.5, 684.25, .849, .849, 8, [""]],
            ["BOMB_TYPE", 306.2, 336.95, .86, .86, 0, ["300_2800"]],
            ["STATIC_BOX_TYPE", 304.85, 408.25, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 346.65, 245.75, .849, .849, 1, [""]],
            ["HERO_1_TYPE", 282.6, 536.25, .8, .8, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 21.65, 455.1, 1.38, 1.38, 0, [""]],
            ["BAD_1_TYPE", 335.45, 90.55, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 228.1, 178.65, .739, .739, -90, ["2"]],
            ["STATIC_BALK_1_TYPE", 24.05, 175.95, .739, .739, -90, ["2"]],
            ["STATIC_BALK_1_TYPE", 172.6, 341.9, .739, .739, -165, ["2"]],
            ["BONUS_STAR_TYPE", 81.15, 580.75, 1, 1, -19, [""]],
            ["BONUS_STAR_TYPE", 414.4, 540.3, 1, 1, -19, [""]],
            ["STATIC_CIRCLE_TYPE", -35.6, 583.1, 1.38, 1.38, 0, [""]],
            ["STATIC_TUBE_1_TYPE", 107.75, 882.1, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 606.7, 359.65, 1, 1, -22, ["2"]],
            ["STATIC_BALK_1_TYPE", 109.05, 535.15, 1, 1, 15, ["2"]],
            ["STATIC_BALK_1_TYPE", 142.95, 431.7, 1, 1, -5, ["2"]],
            ["HERO_2_TYPE", 322.15, 118.65, 2.06, .704, 0, ["L_100_60_SIO"]],
            ["STATIC_BALK_1_TYPE", 113.15, 660.95, .73, .73, 102, ["2"]],
            ["STATIC_BALK_1_TYPE", 326.9, 599.55, .73, .73, -170, ["2"]],
            ["STATIC_BALK_1_TYPE", 377.3, 411.1, 1, 1, -5, ["2"]],
            ["STATIC_BALK_1_TYPE", 436.45, 293.1, .73, .73, 102, ["2"]],
            ["STATIC_BALK_1_TYPE", 234.75, 321.3, .73, .73, 75, ["2"]],
            ["STATIC_BALK_1_TYPE", 29.55, 332.3, .73, .73, 102, ["2"]],
            ["STATIC_BALK_1_TYPE", 531.2, 678, 1, 1, -3, ["2"]],
            ["STATIC_BALK_1_TYPE", 502.3, 621.35, .73, .73, -173, ["2"]],
            ["BAD_2_TYPE", 568.1, 285.05, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 127.55, 337.7, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 340.85, 319.7, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 320.6, 514.8, .8, .8, 0, [""]],
            ["BONUS_STAR_TYPE", 180.1, 668.5, 1, 1, -19, [""]],
            ["BONUS_STAR_TYPE", 520.9, 549.7, 1, 1, -6, [""]],
            ["BONUS_STAR_TYPE", 163.4, 490.35, 1, 1, 32, [""]],
            ["STATIC_TUBE_2_TYPE", 318.05, 916.4, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 197.3, 445.85, 1, 1, -8, [""]],
            ["STATIC_BALK_1_TYPE", 624.45, 448.2, 1, 1, 9, [""]],
            ["BAD_1_TYPE", 459.7, 546.95, .64, 1, 0, ["R_50_30_SIO"]],
            ["BAD_1_TYPE", 313.6, 278.65, 2.24, 1.938, 0, ["L_50_40_SIO"]],
            ["HERO_3_TYPE", 320.1, 63.85, 1.13, .8, 0, ["R_50_55_SIO"]],
            ["STATIC_BALK_1_TYPE", 66.05, 607.05, .98, .98, -163, ["2"]],
            ["STATIC_BALK_1_TYPE", 291.05, 618.65, .84, .84, 175, ["2"]],
            ["STATIC_BALK_1_TYPE", -34, 473.9, .98, .98, 175, ["2"]],
            ["STATIC_BALK_1_TYPE", -146.85, 541.5, .98, .98, -163, ["2"]],
            ["BOMB_TYPE", 313.8, 555, .86, .86, 0, ["300_800"]],
            ["BOMB_TYPE", 233, 565.1, .86, .86, 0, ["300_800"]],
            ["BOMB_TYPE", 130.25, 565.1, .86, .86, 0, ["300_800"]],
            ["STATIC_TUBE_3_TYPE", 310.8, 897.75, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 169.95, 505.75, 1, 1, 51, [""]],
            ["BONUS_STAR_TYPE", 35.45, 533.95, 1, 1, -18, [""]],
            ["BONUS_STAR_TYPE", 542.75, 666.7, 1, 1, 32, [""]],
            ["BONUS_STAR_TYPE", 349.15, 466.1, 1, 1, 32, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 162.75, 183.05, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 52.6, 270.55, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 290.8, 284.55, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 156.75, 370.55, 1, 1, 0, [""]],
            ["BAD_2_TYPE", 508.8, 217.5, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 389.1, 484.9, 1, 1, 0, [""]],
            ["BOMB_TYPE", 156.4, 297.35, .86, .86, 0, ["300_1800"]],
            ["BOMB_TYPE", 292.45, 212.9, .86, .86, 0, ["300_1800"]],
            ["BOMB_TYPE", 162.4, 107.5, .86, .86, 0, ["300_1800"]],
            ["BOMB_TYPE", 52.25, 199.35, .86, .86, 0, ["300_1800"]],
            ["HERO_1_TYPE", 429.5, 394.6, .8, .8, 0, [""]],
            ["HERO_1_TYPE", 196.8, 568.8, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 392.15, 199.4, .98, .98, -73, ["2"]],
            ["STATIC_BALK_1_TYPE", 602.2, 194.1, .98, .98, -110, ["2"]],
            ["STATIC_BALK_1_TYPE", 285.2, 415.05, .74, .74, -156, ["2"]],
            ["STATIC_BALK_1_TYPE", 563.85, 397.3, .98, .98, -110, ["2"]],
            ["STATIC_TUBE_1_TYPE", 554.6, 882.1, 1, 1, -90, [""]],
            ["STATIC_TUBE_1_TYPE", 100.15, 905.25, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 566.9, 560.65, 1, 1, 32, [""]],
            ["BONUS_STAR_TYPE", 86.95, 599.2, 1, 1, -7, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 538.45, 540.4, 1, 1, 87, [""]],
            ["STATIC_BALK_1_TYPE", 526.15, 308.5, 1, 1, 87, [""]],
            ["MOVABLE_BALK_TYPE", 205.15, 484.7, 1.389, .819, -91, ["R_0_20_SIO"]],
            ["HERO_1_TYPE", 209.75, 169.7, .78, .91, 0, ["R_80_30_SIO"]],
            ["BONUS_STAR_TYPE", 406.9, 581.9, 1, 1, 25, [""]],
            ["BONUS_STAR_TYPE", 332.05, 462.5, 1, 1, -10, [""]],
            ["STATIC_TUBE_1_TYPE", 404.35, 905.25, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 169.15, 258.75, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 29.85, 401.35, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 62.05, 672.5, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 373.6, 603.9, .999, .999, -45, ["2"]],
            ["STATIC_BALK_1_TYPE", 376.75, 135.05, .999, .999, -135, ["2"]],
            ["STATIC_BALK_1_TYPE", 383.55, 417.55, .999, .999, 172, ["2"]],
            ["STATIC_BALK_1_TYPE", 154.75, 449.35, .999, .999, -8, ["2"]],
            ["STATIC_BALK_1_TYPE", 69.15, 125.55, .999, .999, -43, ["2"]],
            ["STATIC_BALK_1_TYPE", 355.95, 278, .999, .999, -158, ["2"]],
            ["STATIC_BALK_1_TYPE", 146.65, 364.9, .5, 1.01, -98, ["2"]],
            ["STATIC_BALK_1_TYPE", 21.9, 287.4, .5, 1.009, -91, ["2"]],
            ["STATIC_BOX_TYPE", 669.25, 288.65, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 564.15, 234.2, .5, 1.01, 0, ["2"]],
            ["HERO_2_TYPE", 568.15, 147.45, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 563.35, 327.75, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 553.35, 448.2, .8, .8, 0, [""]],
            ["BAD_2_TYPE", 545.35, 585.25, .8, .8, 0, [""]],
            ["BOMB_TYPE", 66.2, 597.35, .86, .86, 0, ["300_1800"]],
            ["BOMB_TYPE", 177.1, 184.45, .86, .86, 0, ["300_2400"]],
            ["BOMB_TYPE", 206.8, 375.6, .86, .86, 0, ["300_1800"]],
            ["BAD_2_TYPE", 199.75, 594.3, .8, .8, 0, [""]],
            ["STATIC_TUBE_2_TYPE", 544.6, 908.4, 1, 1, -88, [""]],
            ["BONUS_STAR_TYPE", 298.75, 164.2, 1, 1, -7, [""]],
            ["BONUS_STAR_TYPE", 347.45, 540.25, 1, 1, 25, [""]]
        ],
        [
            ["MOVABLE_BALK_TYPE", 492.05, 514.05, 1.389, .819, -89, ["R_30_20_SIO"]],
            ["MOVABLE_BALK_TYPE", 77.85, 484.7, 1.389, .819, -92, ["R_0_20_SIO"]],
            ["HERO_3_TYPE", 116.2, 169.85, .74, .8, 0, ["R_50_45_SIO"]],
            ["HERO_3_TYPE", 496.6, 211.5, .91, .8, 0, ["R_50_20_SIO"]],
            ["STATIC_TUBE_3_TYPE", 294.05, 893.2, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 225.5, 559.65, 1, 1, 25, [""]],
            ["BONUS_STAR_TYPE", 379.6, 492.8, 1, 1, -10, [""]],
            ["BONUS_STAR_TYPE", 279.8, 424.1, 1, 1, -10, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 426.05, 155.65, .949, .949, -90, [""]],
            ["STATIC_BALK_1_TYPE", 217.8, 153.05, 1, 1, 90, [""]],
            ["STATIC_BALK_1_TYPE", -2.55, 309.3, 1, 1, 90, [""]],
            ["STATIC_BALK_1_TYPE", 645.7, 294.1, 1, 1, 90, [""]],
            ["HERO_2_TYPE", 553, 219.85, .8, .8, 0, [""]],
            ["HERO_1_TYPE", 94.8, 183.5, .799, .799, -11, [""]],
            ["STATIC_BOX_TYPE", 67.15, 444.35, 1, 1, 0, [""]],
            ["BOMB_TYPE", 75.1, 370.05, .86, .86, 0, ["300_2400"]],
            ["STATIC_BOX_TYPE", 577.5, 444.35, .97, .97, 0, [""]],
            ["BOMB_TYPE", 578.45, 370.05, .86, .86, 0, ["300_2400"]],
            ["STATIC_BALK_1_TYPE", 461.6, 338.2, .74, .74, 41, ["2"]],
            ["STATIC_BALK_1_TYPE", 610.2, 595.9, .95, .95, 90, ["2"]],
            ["STATIC_BALK_1_TYPE", -2, 582.75, .95, .95, 90, ["2"]],
            ["BAD_1_TYPE", 326.3, 112.65, .8, .8, 0, [""]],
            ["STATIC_TUBE_1_TYPE", 477.75, 900.8, 1, 1, -90, [""]],
            ["STATIC_TUBE_2_TYPE", 118.1, 902.3, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 294.85, 644.8, 1, 1, -10, [""]],
            ["BONUS_STAR_TYPE", 317.8, 249.7, 1, 1, 10, [""]],
            ["BONUS_STAR_TYPE", 99.75, 578.5, 1, 1, 20, [""]],
            ["BONUS_STAR_TYPE", 482.5, 590.75, 1, 1, 0, [""]]
        ],
        [
            ["TELEPORT_TYPE", 84.45, 93.3, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 554.1, 445.45, 1, 1, 0, ["A"]],
            ["STATIC_BALK_1_TYPE", 371.4, 496.1, 1, .98, 0, ["2"]],
            ["TELEPORT_TYPE", 554.1, 596.45, 1, 1, 0, ["B"]],
            ["TELEPORT_TYPE", 554.1, 297.7, 1, 1, 0, ["B"]],
            ["STATIC_BALK_1_TYPE", 137.25, 292.95, 1, 1, 8, [""]],
            ["STATIC_BALK_1_TYPE", 371.2, 314.3, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 342.5, 689.8, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 115.8, 693.8, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 453.9, 594.5, .66, .66, 90, [""]],
            ["HERO_2_TYPE", 398.75, 115.6, .8, .8, 0, [""]],
            ["STATIC_BALK_1_TYPE", 81.35, 402.65, .98, .98, 142, ["2"]],
            ["STATIC_BALK_1_TYPE", 167.6, 191.55, .98, .98, 174, ["2"]],
            ["BAD_1_TYPE", 341, 575.6, .64, 1, 0, ["R_50_30_SIO"]],
            ["BOMB_TYPE", 250.35, 629.2, .86, .86, 0, ["300_1800"]],
            ["BAD_1_TYPE", 121.2, 510.35, .71, .71, 0, [""]],
            ["STATIC_BALK_1_TYPE", 261, 406.45, .77, .95, -143, ["2"]],
            ["BAD_1_TYPE", 255.45, 79.35, .71, .71, 0, [""]],
            ["STATIC_TUBE_2_TYPE", 550.6, 918.3, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 415.8, 406.05, 1, 1, -10, [""]],
            ["BONUS_STAR_TYPE", 432.25, 244.3, 1, 1, 32, [""]],
            ["BONUS_STAR_TYPE", 18.75, 214.05, 1, 1, 32, [""]]
        ],
        [
            ["STATIC_CIRCLE_TYPE", 337.55, 325.75, .79, .79, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 122, 325.65, .74, .74, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 637.5, 444.05, .86, .86, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 210.75, 446.7, .8, .8, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 372, 541.9, .76, .76, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 72.15, 580.5, .8, .8, 0, [""]],
            ["HERO_3_TYPE", 324.8, 117.6, 2.32, .7, 0, ["R_50_45_SIO"]],
            ["STATIC_CIRCLE_TYPE", 520.8, 540.2, .8, .8, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 521.2, 321.55, .79, .79, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 373.7, 647.7, .8, .8, 0, [""]],
            ["STATIC_CIRCLE_TYPE", -22.05, 453.9, .8, .8, 0, [""]],
            ["HERO_3_TYPE", 322.8, 229.05, 2.32, .7, 0, ["R_0_45_SIO"]],
            ["STATIC_TUBE_3_TYPE", 159.55, 910.05, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 214.15, 602.55, 1, 1, -10, [""]],
            ["BONUS_STAR_TYPE", 337.2, 436.75, 1, 1, -10, [""]],
            ["BONUS_STAR_TYPE", 119.55, 455.1, 1, 1, -10, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 328.65, 546.6, 1, 1, -90, [""]],
            ["STATIC_BOX_TYPE", 37.85, 232.6, 1, 1, 0, [""]],
            ["BOMB_TYPE", 43.8, 158.3, .86, .86, 0, ["300_2400"]],
            ["STATIC_BALK_1_TYPE", 165.35, 532.45, .95, .95, 90, ["2"]],
            ["STATIC_BOX_TYPE", 254, 680.5, 1, 1, 0, [""]],
            ["BOMB_TYPE", 240.6, 600.55, .86, .86, 0, ["200_2400"]],
            ["BAD_1_TYPE", 243.6, 510.5, .71, .71, 0, [""]],
            ["STATIC_BOX_TYPE", 169.05, 680.5, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 165.35, 281.35, .95, .95, 90, ["2"]],
            ["HERO_1_TYPE", 240.85, 318.5, .799, .799, 3, [""]],
            ["STATIC_BALK_1_TYPE", 399.15, 291.45, .95, .95, 90, ["2"]],
            ["STATIC_BOX_TYPE", 37.85, 389.3, 1, 1, 0, [""]],
            ["BOMB_TYPE", 43.8, 315, .86, .86, 0, ["300_2400"]],
            ["STATIC_BALK_1_TYPE", 622.5, 281.35, .95, .95, 90, ["2"]],
            ["HERO_1_TYPE", 318.85, 103.8, 1.15, .83, 0, ["R_80_30_SIO"]],
            ["BAD_1_TYPE", 60.75, 510.5, .71, .71, 0, [""]],
            ["STATIC_TUBE_1_TYPE", 551.4, 897.2, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 536.9, 496.65, 1, 1, 20, [""]],
            ["BONUS_STAR_TYPE", 503, 283.7, 1, 1, -10, [""]],
            ["BONUS_STAR_TYPE", 52.5, 657.95, 1, 1, -10, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 206.4, 236.35, .86, .86, 15, ["2"]],
            ["STATIC_BALK_1_TYPE", 324.95, 368.8, 1, 1, -12, ["2"]],
            ["HERO_3_TYPE", 146.95, 454.5, .8, .8, 0, [""]],
            ["HERO_2_TYPE", 533.25, 531.3, .8, .8, 0, [""]],
            ["BOMB_TYPE", 225.1, 80.5, .86, .86, 0, ["300_2400"]],
            ["BOMB_TYPE", 325, 69.95, .99, .99, 0, ["400_2800"]],
            ["STATIC_BALK_1_TYPE", 370.7, 133.5, .65, 1, 0, ["2"]],
            ["STATIC_BALK_1_TYPE", 217.1, 139.6, .58, 1, 0, ["2"]],
            ["STATIC_BALK_1_TYPE", 651.2, 481.2, .86, .86, 90, ["2"]],
            ["STATIC_BALK_1_TYPE", 394, 287, .86, .86, 15, ["2"]],
            ["STATIC_BALK_1_TYPE", 556.2, 331.6, .609, .859, 15, ["2"]],
            ["STATIC_BALK_1_TYPE", -25, 463.7, 1, 1, -12, ["2"]],
            ["STATIC_BALK_1_TYPE", 321.75, 679.85, 1, 1, -4, ["2"]],
            ["BOMB_TYPE", 94.5, 106.3, 1.03, 1.03, 0, ["400_2800"]],
            ["STATIC_BALK_1_TYPE", 74.2, 165.85, .65, 1, 0, ["2"]],
            ["STATIC_TUBE_2_TYPE", 106.5, 918.3, 1, 1, -90, [""]],
            ["STATIC_TUBE_3_TYPE", 541.65, 896.05, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 119.85, 603, 1, 1, 20, [""]],
            ["BONUS_STAR_TYPE", 346.45, 571.95, 1, 1, -11, [""]]
        ],
        [
            ["TELEPORT_TYPE", 581.55, 640.55, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 85.55, 552.8, 1, 1, 0, ["A"]],
            ["STATIC_BALK_1_TYPE", 53.1, 454.45, 1, 1, 13, [""]],
            ["STATIC_BALK_1_TYPE", 670, 479.55, 1, 1, 90, [""]],
            ["HERO_1_TYPE", 480.5, 504.2, .799, .799, -8, [""]],
            ["HERO_1_TYPE", 323.85, 118.6, 1.15, .83, 0, ["R_80_25_SIO"]],
            ["MOVABLE_BALK_TYPE", 417.2, 329.55, 1.389, .73, -96, ["R_0_12_SIO"]],
            ["BAD_1_TYPE", 568.3, 162.55, .71, .71, 0, [""]],
            ["BAD_1_TYPE", 81.2, 209.4, .64, 1, 0, ["R_50_30_SIO"]],
            ["STATIC_BALK_1_TYPE", 0, 371.5, 1, 1, -10, ["2"]],
            ["STATIC_BOX_TYPE", 463.65, 675.65, 1, 1, 3, [""]],
            ["MOVABLE_BALK_TYPE", 265.2, 323.25, 1.389, .73, -96, ["R_0_12_SIO"]],
            ["STATIC_TUBE_1_TYPE", 85.45, 885.25, 1, 1, -91, [""]],
            ["BONUS_STAR_TYPE", 248.9, 635.5, 1, 1, -11, [""]],
            ["BONUS_STAR_TYPE", 578.95, 285.25, 1, 1, -11, [""]],
            ["BONUS_STAR_TYPE", 417.05, 326.35, 1, 1, 20, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 221.35, 649.55, 1, 1, 6, [""]],
            ["STATIC_BALK_1_TYPE", -12.1, 620.75, 1, 1, 6, [""]],
            ["STATIC_BALK_1_TYPE", -1.8, 217.1, 1, 1, 90, [""]],
            ["STATIC_BALK_1_TYPE", -1.8, 459.35, 1, 1, 90, [""]],
            ["STATIC_BOX_TYPE", 578.35, 635.8, 1, 1, 0, [""]],
            ["BOMB_TYPE", 582.5, 560.65, .86, .86, 0, ["300_1800"]],
            ["BAD_2_TYPE", 435.05, 437.8, .8, .8, 0, [""]],
            ["STATIC_BOX_TYPE", 578.35, 462.75, 1, 1, 0, [""]],
            ["BOMB_TYPE", 582.5, 387.6, .86, .86, 0, ["300_1800"]],
            ["BOMB_TYPE", 432.85, 597.45, .86, .86, 0, ["300_1800"]],
            ["STATIC_BOX_TYPE", 582.35, 290.4, 1, 1, 0, [""]],
            ["BOMB_TYPE", 586.5, 215.25, .86, .86, 0, ["250_1800"]],
            ["STATIC_BOX_TYPE", 264.85, 492.35, 1, 1, 0, [""]],
            ["BOMB_TYPE", 269, 417.2, .86, .86, 0, ["300_1800"]],
            ["BAD_2_TYPE", 295.45, 209.7, .8, .8, 0, [""]],
            ["STATIC_BOX_TYPE", 215.05, 321.7, 1, 1, 0, [""]],
            ["STATIC_BALK_1_TYPE", 279, 81.6, 1, 1, -20, ["2"]],
            ["STATIC_BALK_1_TYPE", 471, 123.3, 1, 1, 11, ["2"]],
            ["HERO_3_TYPE", 86.6, 176.95, .8, .8, 0, [""]],
            ["STATIC_TUBE_3_TYPE", 429.3, 893.65, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 120.5, 420.4, 1, 1, -11, [""]],
            ["BONUS_STAR_TYPE", 440.95, 286, 1, 1, 12, [""]]
        ],
        [
            ["TELEPORT_TYPE", 417.55, 445.45, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 554.55, 596.9, 1, 1, 0, ["A"]],
            ["TELEPORT_TYPE", 149.6, 443.6, 1, 1, 0, ["B"]],
            ["TELEPORT_TYPE", 567.15, 455.45, 1, 1, 0, ["C"]],
            ["TELEPORT_TYPE", 407.55, 583.85, 1, 1, 0, ["B"]],
            ["TELEPORT_TYPE", 222.2, 588.9, 1, 1, 0, ["C"]],
            ["TELEPORT_TYPE", 15, 415.85, 1, 1, 0, ["D"]],
            ["TELEPORT_TYPE", 58.45, 552.8, 1, 1, 0, ["D"]],
            ["TELEPORT_TYPE", 290.65, 455.45, 1, 1, 0, ["E"]],
            ["TELEPORT_TYPE", 58.45, 684, 1, 1, 0, ["E"]],
            ["HERO_2_TYPE", 322.15, 118.85, 2.25, .76, 0, ["L_100_50_SIO"]],
            ["HERO_1_TYPE", 318.95, 244.4, 2.13, .75, 0, ["R_40_30_SIO"]],
            ["STATIC_TUBE_1_TYPE", 402.5, 910, 1, 1, -89, [""]],
            ["BONUS_STAR_TYPE", 544.3, 322.35, 1, 1, 12, [""]],
            ["STATIC_TUBE_2_TYPE", 230.1, 912, 1, 1, -91, [""]],
            ["BONUS_STAR_TYPE", 66.1, 182.05, 1, 1, -17, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 109.4, 242.35, 1.11, 1.11, -90, [""]],
            ["STATIC_BALK_1_TYPE", 149.65, 324.05, .66, .66, 180, [""]],
            ["STATIC_BALK_1_TYPE", 13.1, 107.15, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 106.5, 135.85, .709, .709, -152, [""]],
            ["STATIC_BALK_1_TYPE", 236.95, 225.4, .679, .679, -152, [""]],
            ["STATIC_BALK_1_TYPE", 323.25, 282.2, .8, .8, 90, [""]],
            ["STATIC_BALK_1_TYPE", 323.25, 180.35, .8, .8, 90, [""]],
            ["BOMB_TYPE", 47.25, 80.3, .8, .8, 0, ["200_900"]],
            ["STATIC_BALK_1_TYPE", 242.15, 284.15, .58, .58, 135, [""]],
            ["STATIC_BALK_1_TYPE", 201.2, 270.2, .74, .74, 90, [""]],
            ["STATIC_BALK_1_TYPE", 41.6, 174.75, .8, .8, 180, [""]],
            ["BOMB_TYPE", 17.9, 143.85, .8, .8, 0, ["200_300"]],
            ["STATIC_BALK_1_TYPE", 236.7, 422.8, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 284.25, 370.4, .8, .8, 135, [""]],
            ["STATIC_BALK_1_TYPE", 134.85, 422.8, .8, .8, 180, [""]],
            ["BONUS_HOLE_TYPE", 49.85, 382.2, .87, .87, 90, [""]],
            ["STATIC_BOX_TYPE", 27.55, 382.6, 1.718, .34, 90, ["INVIS"]],
            ["PUSHER_TYPE", 111.9, 92.7, .899, .899, -66, [""]],
            ["PUSHER_TYPE", 250.25, 193.35, .9, .9, -65, [""]],
            ["PUSHER_TYPE", 154.95, 285.45, .9, .9, -84, [""]],
            ["ZOMBIE_TYPE", 119.2, 385.45, 1, 1, -91, ["4"]],
            ["BONUS_STAR_TYPE", 161.05, 203.6, .9, .9, 0, [""]]
        ],
        [
            ["HERO_3_TYPE", 321.05, 198.65, 2.29, 1, 0, ["R_50_30_EO"]],
            ["HERO_2_TYPE", 177.55, 51.5, 1, 1, 0, ["L_100_10_EIO"]],
            ["HERO_1_TYPE", 106.9, 416.45, 1, 1, 0, ["R_0_20_SIO"]],
            ["HERO_1_TYPE", 135, 578.9, 1, 1, 0, [""]],
            ["HERO_3_TYPE", 465.95, 344.4, 1.06, .73, 0, ["R_50_30_SIO"]]
        ],
        [
            ["STATIC_BOX_TYPE", 161.6, 214.15, 1, 1, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 262.35, 127.85, .8, .8, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 227.4, 271.95, 1, 1, 0, [""]],
            ["BONUS_DANGER_KUST_TYPE", 88.9, 267.2, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 89.25, 288.6, 1.718, .34, 0, ["INVIS"]],
            ["BONUS_HOLE_TYPE", 264.95, 390.6, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 265.55, 412.45, 1.718, .34, 0, ["INVIS"]],
            ["BONUS_KAKTUS_TYPE", 60.2, 378.6, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 60.9, 409.4, 1.718, .43, 0, ["INVIS"]],
            ["CONVEYOR_TYPE", 103.65, 130.75, 1, 1, 0, ["R_0_1000_ACTIV"]],
            ["STATIC_BOX_TYPE", 304.95, 306.95, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 158.8, 418.35, 1, 1, 0, ["2"]],
            ["BONUS_STAR_TYPE", 168.85, 28.5, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 151.05, 215.55, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 45.7, 208.2, .9, .9, 0, [""]],
            ["PUSHER_TYPE", 258.75, 68.05, 1, 1, -116, [""]],
            ["PUSHER_TYPE", 227.45, 203.9, 1, 1, -90, [""]],
            ["PUSHER_TYPE", 159.1, 355.4, 1, 1, -90, [""]],
            ["DYNAMIC_CIRCLE_TYPE", 56.15, 70.95, .76, .76, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 262.35, 127.85, .8, .8, 0, [""]],
            ["STATIC_CIRCLE_TYPE", 227.4, 271.95, 1, 1, 0, [""]],
            ["BONUS_HOLE_TYPE", 276.95, 418.15, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 277.55, 440, 1.718, .34, 0, ["INVIS"]],
            ["CONVEYOR_TYPE", 103.65, 130.75, 1, 1, 0, ["R_0_1000_ACTIV"]],
            ["CONVEYOR_TYPE", 82.3, 334.9, .79, .79, 16, ["L_0_500_DISABLED"]],
            ["STATIC_BOX_TYPE", 193.85, 405.3, 1, 1, 0, [""]],
            ["PUSHER_TYPE", 258.75, 68.05, 1, 1, -116, [""]],
            ["PUSHER_TYPE", 227.45, 203.9, 1, 1, -90, [""]],
            ["PUSHER_TYPE", 54.1, 275.15, 1, 1, -90, [""]],
            ["DYNAMIC_CIRCLE_TYPE", 56.15, 70.95, .76, .76, 0, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 102.8, 330.7, 1, 1, 0, ["2"]],
            ["STATIC_CIRCLE_TYPE", 234.9, 317.6, 1, 1, 0, [""]],
            ["PUSHER_TYPE", 234.95, 249.55, 1, 1, -90, [""]],
            ["STATIC_BOX_TYPE", 235.75, 164.15, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 31.8, 385.9, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 38.05, 139.65, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 126.65, 186.1, 1, 1, 0, [""]],
            ["BOMB_TYPE", 172.2, 285.8, .8, .8, 0, ["140_300"]],
            ["DECOR_MONEY_TYPE", 115.45, 448.8, 1, 1, 0, [""]],
            ["DECOR_GUN_TYPE", 261.7, 435.75, 1, 1, 0, [""]],
            ["ZOMBIE_TYPE", 106.85, 266.15, 1, 1, -88, [""]],
            ["STATIC_BOX_TYPE", 172.25, 339.9, 1, 1, 0, [""]],
            ["ZOMBIE_TYPE", 38.5, 79.7, 1, 1, -93, ["2"]],
            ["ZOMBIE_TYPE", 235.45, 103.7, 1, 1, -97, ["3"]],
            ["ZOMBIE_TYPE", 32.65, 322.45, 1, 1, -91, ["4"]],
            ["ZOMBIE_TYPE", 128.1, 125.7, 1, 1, -90, ["5"]]
        ],
        [
            ["STATIC_BOX_TYPE", 255.5, 424.25, 1, 1, 0, [""]],
            ["TELEPORT_TYPE", 74.1, 388.8, 1.29, 1.29, 0, ["A"]],
            ["TELEPORT_TYPE", 222.9, 121.65, 1.29, 1.29, 0, ["A"]],
            ["STATIC_BOX_TYPE", 54.7, 250.25, .8, .8, 0, ["2"]],
            ["STATIC_BOX_TYPE", 110.3, 262.25, .8, .8, 0, ["2"]],
            ["STATIC_BOX_TYPE", 165.9, 273.25, .8, .8, 0, ["2"]],
            ["STATIC_BOX_TYPE", 221.5, 264.25, .8, .8, 0, ["2"]],
            ["STATIC_BOX_TYPE", 277.1, 250.25, .8, .8, 0, ["2"]],
            ["PUSHER_TYPE", 254.2, 366.4, 1, 1, -90, [""]],
            ["STATIC_BOX_TYPE", 164.75, 425.9, 1, 1, 0, ["2"]],
            ["ZOMBIE_TYPE", 165.6, 364, 1, 1, -91, ["4"]]
        ],
        [
            ["STATIC_CIRCLE_TYPE", 141.4, 210.6, 1, 1, 0, [""]],
            ["BONUS_DANGER_KUST_TYPE", 265.2, 219.65, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 265.55, 241.05, 1.718, .34, 0, ["INVIS"]],
            ["BONUS_KAKTUS_TYPE", 87.25, 338.4, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 87.95, 369.2, 1.718, .43, 0, ["INVIS"]],
            ["STATIC_BOX_TYPE", 78.6, 210.15, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 263.15, 362.65, 1, 1, 0, ["2"]],
            ["BONUS_STAR_TYPE", 92.65, 85.4, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 34.7, 65.55, .9, .9, 0, [""]],
            ["PUSHER_TYPE", 141.45, 142.55, 1, 1, -90, [""]],
            ["PUSHER_TYPE", 263.45, 299.7, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 60.2, 153.3, 1, 1, -90, ["5"]],
            ["ZOMBIE_TYPE", 190.05, 295.8, 1, 1, -90, ["5"]],
            ["STATIC_BOX_TYPE", 187.15, 361.95, 1, 1, 0, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 81.25, 295.8, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 249.2, 344.2, .92, .92, 0, [""]],
            ["STATIC_BOX_TYPE", 248.7, 298.55, .7, .7, 0, [""]],
            ["STATIC_BOX_TYPE", 167.15, 285.6, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 167.15, 341.05, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 83.5, 351.8, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 82.7, 408.05, 1, 1, 0, ["2"]],
            ["BONUS_HOLE_TYPE", 246.7, 247.5, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 247.3, 269.35, 1.718, .34, 0, ["INVIS"]],
            ["PUSHER_TYPE", 79.3, 237.35, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 156, 229.35, 1, 1, -90, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 67.15, 260.6, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 142.35, 266.15, .92, .92, 0, [""]],
            ["BONUS_HOLE_TYPE", 230.65, 335.8, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 231.25, 357.65, 1.718, .34, 0, ["INVIS"]],
            ["PUSHER_TYPE", 65.4, 200, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 144.9, 209.1, 1, 1, -90, [""]]
        ],
        [
            ["DECOR_GUN_TYPE", 108.25, 435.75, 1, 1, 0, [""]],
            ["DECOR_HELP_2_TYPE", 140.15, 313.55, .78, .78, 0, [""]],
            ["STATIC_BOX_TYPE", 67.15, 260.6, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 142.35, 266.15, .92, .92, 0, [""]],
            ["BONUS_HOLE_TYPE", 230.65, 335.8, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 231.25, 357.65, 1.718, .34, 0, ["INVIS"]],
            ["PUSHER_TYPE", 65.4, 200, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 144.9, 209.1, 1, 1, -90, [""]]
        ],
        [
            ["BOMB_TYPE", 151.2, 180.15, .8, .8, 0, ["170_1000"]],
            ["BOMB_TYPE", 225.25, 298.95, .8, .8, 0, ["170_900"]],
            ["BONUS_STAR_TYPE", 19.3, 200.5, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 291.35, 219.75, .9, .9, 0, [""]],
            ["ZOMBIE_TYPE", 86.2, 176.6, 1, 1, -90, ["5"]],
            ["STATIC_BOX_TYPE", 85.75, 234.75, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 153.4, 222.55, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 226.1, 244.5, 1, 1, 0, ["2"]],
            ["ZOMBIE_TYPE", 226.7, 188.15, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 221.35, 110.1, .9, .9, 0, [""]],
            ["STATIC_BOX_TYPE", 226.1, 341.05, 1, 1, 0, ["2"]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 177.6, 182.55, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 266.35, 68.65, .8, .8, 46, [""]],
            ["BOMB_TYPE", 156.8, 145.35, .8, .8, 0, ["200_900"]],
            ["STATIC_BALK_1_TYPE", 159.1, 311, .8, .8, 164, [""]],
            ["STATIC_BALK_1_TYPE", 56.25, 293, .8, .8, -121, [""]],
            ["BONUS_DANGER_KUST_TYPE", 229.35, 413.55, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 229.65, 435, 1.718, .34, 0, ["INVIS"]],
            ["STATIC_BOX_TYPE", 59.85, 190.8, 1, 1, 0, [""]],
            ["PUSHER_TYPE", 58, 130.2, 1, 1, -90, [""]],
            ["STATIC_BOX_TYPE", 245.6, 285.8, 1, 1, -17, [""]],
            ["STATIC_BOX_TYPE", 317.4, 154.9, 1, 1, -85, [""]],
            ["STATIC_BOX_TYPE", 302.65, 224.95, 1, 1, -71, [""]],
            ["ZOMBIE_TYPE", 162.05, 372.15, 1, 1, -90, ["2"]],
            ["STATIC_BOX_TYPE", 143.95, 426.8, 1, 1, 0, ["2"]],
            ["BONUS_STAR_TYPE", 178.8, 84.95, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 249, 135.5, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 88.8, 174.85, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 301.55, 137.55, .8, .8, -90, [""]],
            ["STATIC_BALK_1_TYPE", 216.3, 166.85, .8, .8, 180, [""]],
            ["DECOR_GUN_TYPE", 237.05, 435.85, 1, 1, 0, [""]],
            ["CONVEYOR_TYPE", 106.55, 342.7, 1, 1, 0, ["R_0_5000_ACTIV"]],
            ["CONVEYOR_TYPE", 219, 246.15, 1, 1, 0, ["L_0_3000_ACTIV"]],
            ["STATIC_BALK_1_TYPE", 31.55, 202.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 190.1, 158.95, .8, .8, 180, [""]],
            ["PUSHER_TYPE", 46.5, 149.65, 1, 1, -90, [""]],
            ["STATIC_BOX_TYPE", 309.55, 102.75, 1, 1, -17, [""]],
            ["ZOMBIE_TYPE", 279.25, 371.15, 1, 1, -90, ["2"]],
            ["STATIC_BOX_TYPE", 257.9, 430.8, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 316.35, 171.9, 1, 1, 0, [""]],
            ["DYNAMIC_CIRCLE_TYPE", 221.3, 122.85, .76, .76, 0, [""]],
            ["STATIC_BOX_TYPE", -7.2, 288.3, 1, 1, 0, [""]],
            ["BONUS_STAR_TYPE", 152.25, 96.2, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 43, 79.75, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 242.2, 64.5, .9, .9, 0, [""]]
        ],
        [
            ["TELEPORT_TYPE", 56.35, 315.55, 1.29, 1.29, 91, ["A"]],
            ["TELEPORT_TYPE", 255.7, 70.35, 1.29, 1.29, 0, ["A"]],
            ["STATIC_BOX_TYPE", 49.65, 384.3, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 123.1, 383.3, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 272.3, 339.75, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 191.75, 312.95, 1, 1, 0, [""]],
            ["PUSHER_TYPE", 274, 283.7, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 91.5, 137.05, 1, 1, -90, ["5"]],
            ["BONUS_STAR_TYPE", 195, 220.7, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 121.1, 277.95, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 26.05, 131.25, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 123.85, 209.95, .8, .8, -140, [""]],
            ["BONUS_DANGER_KUST_TYPE", 43.6, 401, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 43.9, 422.45, 1.718, .34, 0, ["INVIS"]],
            ["TELEPORT_TYPE", 159.6, 203.1, 1.29, 1.29, 91, ["A"]],
            ["TELEPORT_TYPE", 283.65, 86.9, 1.29, 1.29, 0, ["A"]],
            ["TELEPORT_TYPE", 39.3, 86.95, 1.29, 1.29, 0, ["B"]],
            ["TELEPORT_TYPE", 86.35, 260.3, 1.29, 1.29, 0, ["B"]],
            ["STATIC_BOX_TYPE", 291.75, 400.45, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 218.55, 389.45, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 159.55, 344.2, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 149, 288.75, 1, 1, 0, ["2"]],
            ["STATIC_BALK_1_TYPE", 51.55, 138.9, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 158.8, 138.25, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 265.65, 138.9, .8, .8, 180, [""]],
            ["PUSHER_TYPE", 186.1, 90.7, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 290.5, 342.5, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 104.35, 94.5, 1, 1, -90, ["2"]],
            ["BONUS_STAR_TYPE", 231.8, 262.1, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 71.85, 325.35, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 222.8, 316.95, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BOX_TYPE", 19.3, 372, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 82.95, 371.7, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 154.05, 281.55, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 225.25, 320.35, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 292.9, 343.95, 1, 1, 0, [""]],
            ["STATIC_BOX_TYPE", 154.6, 338.55, 1, 1, 0, [""]],
            ["BONUS_HOLE_TYPE", 300.45, 262.4, .87, .87, -90, [""]],
            ["STATIC_BOX_TYPE", 322.3, 261.8, 1.718, .34, -90, ["INVIS"]],
            ["STATIC_BOX_TYPE", -20.85, 199.25, 1, 1, 0, [""]],
            ["DYNAMIC_RECT_TYPE", 48.55, 160.9, 1.03, 1.03, 0, [""]],
            ["ZOMBIE_TYPE", 244.45, 266.35, 1, 1, -91, ["4"]],
            ["DYNAMIC_CIRCLE_TYPE", 82.8, 129.7, .76, .76, 0, [""]],
            ["PUSHER_TYPE", 49.85, 315.9, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 50.05, 209.25, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 105, 242.1, .9, .9, 0, [""]]
        ],
        [
            ["BONUS_KAKTUS_TYPE", 47.25, 310.25, .95, .95, 0, [""]],
            ["STATIC_BOX_TYPE", 48.1, 339.45, 1.632, .408, 0, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 111.95, 170, .87, .87, -90, [""]],
            ["STATIC_BALK_1_TYPE", 171.3, 222.4, .72, .72, 180, [""]],
            ["STATIC_BALK_1_TYPE", 149.75, 380.1, .8, .8, 180, [""]],
            ["STATIC_BOX_TYPE", 246.05, 339.1, 1, 1, 0, ["2"]],
            ["STATIC_BOX_TYPE", 313.7, 338.65, 1, 1, 0, ["2"]],
            ["PUSHER_TYPE", 152.05, 342.55, .9, .9, -90, [""]],
            ["ZOMBIE_TYPE", 110.05, 90.4, .9, .9, -90, [""]],
            ["BONUS_STAR_TYPE", 273.7, 259.6, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 50.45, 170.45, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 198.6, 134.1, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 99.85, 428.35, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 206.1, 428.7, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 276.15, 160.3, .8, .8, 180, [""]],
            ["BONUS_HOLE_TYPE", 31.8, 150.6, .87, .87, 90, [""]],
            ["STATIC_BOX_TYPE", 9.5, 151, 1.718, .34, 90, ["INVIS"]],
            ["BONUS_KAKTUS_TYPE", 35.45, 263.3, 1, 1, 90, [""]],
            ["STATIC_BOX_TYPE", 4.65, 264, 1.718, .43, 90, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 73.2, 306.55, .8, .8, 180, [""]],
            ["BONUS_HOLE_TYPE", 31.8, 377.95, .87, .87, 90, [""]],
            ["STATIC_BOX_TYPE", 9.5, 378.35, 1.718, .34, 90, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 313.45, 428.7, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 169.45, 305.15, .69, .69, 180, [""]],
            ["STATIC_BOX_TYPE", 97.95, 201.35, .93, .93, 0, [""]],
            ["STATIC_BALK_1_TYPE", 324.35, 322.55, .8, .8, 90, [""]],
            ["PUSHER_TYPE", 254.25, 116.65, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 109.3, 387.1, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 84.7, 146.5, 1, 1, -90, ["2"]],
            ["ZOMBIE_TYPE", 104.1, 268.95, 1, 1, -91, ["4"]],
            ["BONUS_STAR_TYPE", 177.6, 116.25, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 197.6, 227.7, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 274.75, 304.15, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 39.05, 428.35, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 142.3, 428.7, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 192.8, 160.3, .8, .8, 180, [""]],
            ["BONUS_HOLE_TYPE", 31.8, 367.55, .87, .87, 90, [""]],
            ["STATIC_BOX_TYPE", 9.5, 367.95, 1.718, .34, 90, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 245.15, 428.7, .8, .8, 180, [""]],
            ["STATIC_BOX_TYPE", 29.4, 204.2, 1, 1, 0, [""]],
            ["CONVEYOR_TYPE", 124.35, 250.8, 1, 1, 0, ["R_0_5000_ACTIV"]],
            ["CONVEYOR_TYPE", 293.3, 321, 1, 1, 0, ["L_0_3000_ACTIV"]],
            ["BONUS_HOLE_TYPE", 303.6, 385.7, .87, .87, -90, [""]],
            ["STATIC_BOX_TYPE", 325.45, 385.1, 1.718, .34, -90, ["INVIS"]],
            ["BOMB_TYPE", 176.85, 132.1, .8, .8, 0, ["200_900"]],
            ["STATIC_BALK_1_TYPE", 283.25, 124.45, .8, .8, 131, [""]],
            ["STATIC_BALK_1_TYPE", 313.5, 250.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 315.5, 31.75, .8, .8, 90, [""]],
            ["PUSHER_TYPE", 44.45, 147.55, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 85, 387.1, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 237.7, 386.7, 1, 1, -90, ["2"]],
            ["BONUS_STAR_TYPE", 245.95, 207.6, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 39, 62.95, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 245.95, 65.55, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 54.05, 427.7, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 157.3, 428.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 260.15, 428.05, .8, .8, 180, [""]],
            ["STATIC_BOX_TYPE", 159.1, 388.8, 1, 1, 0, ["2"]],
            ["TELEPORT_TYPE", 276.9, 384.9, 1.29, 1.29, 91, ["A"]],
            ["TELEPORT_TYPE", 40.45, 71.45, 1.29, 1.29, 0, ["A"]],
            ["STATIC_BALK_1_TYPE", 57.45, 252.8, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 160.7, 253.15, .8, .8, 180, [""]],
            ["BONUS_DANGER_KUST_TYPE", 265.25, 233, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 265.55, 254.45, 1.718, .34, 0, ["INVIS"]],
            ["STATIC_BOX_TYPE", 184.1, 150.15, .69, .69, 0, ["2"]],
            ["STATIC_BALK_1_TYPE", -25.65, 200.25, .8, .8, -122, [""]],
            ["PUSHER_TYPE", 161.5, 328.35, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 183.6, 103.35, 1, 1, -91, ["4"]],
            ["ZOMBIE_TYPE", 185.1, 216.3, 1, 1, -90, ["5"]],
            ["BONUS_STAR_TYPE", 63.05, 382, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 55.05, 203.7, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 257.05, 319.15, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 232, 180.75, .8, .8, 90, [""]],
            ["STATIC_BALK_1_TYPE", 232, 77, .8, .8, 90, [""]],
            ["STATIC_BALK_1_TYPE", 232, 282.55, .8, .8, 90, [""]],
            ["STATIC_BALK_1_TYPE", 232, 389.6, .8, .8, 90, [""]],
            ["TELEPORT_TYPE", 279.95, 83.5, 1.29, 1.29, 91, ["A"]],
            ["STATIC_BALK_1_TYPE", 31.25, 137.4, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 169.7, 214.25, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 2.7, 284.85, .8, .8, -119, [""]],
            ["STATIC_BALK_1_TYPE", 86.85, 336.3, .8, .8, 180, [""]],
            ["TELEPORT_TYPE", 178.95, 401.85, 1.29, 1.29, 91, ["A"]],
            ["BONUS_DANGER_KUST_TYPE", 294.45, 407.7, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 294.75, 429.15, 1.718, .34, 0, ["INVIS"]],
            ["PUSHER_TYPE", 53.65, 99.5, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 115.05, 298, 1, 1, -90, ["2"]],
            ["BONUS_STAR_TYPE", 182.5, 34.6, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 286.05, 181.9, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 286.05, 250.95, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 286.05, 319.15, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 49.05, 250.95, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 270.05, 141.95, .8, .8, 180, [""]],
            ["CONVEYOR_TYPE", 166.75, 334.8, .8, .8, 0, ["R_0_5000_ACTIV"]],
            ["CONVEYOR_TYPE", 143, 242.95, .73, .73, 0, ["L_0_3000_ACTIV"]],
            ["BONUS_HOLE_TYPE", 291.5, 84.9, .774, .774, -90, [""]],
            ["STATIC_BOX_TYPE", 311, 84.5, 1.529, .302, -90, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 333.35, 274.35, .8, .8, 90, [""]],
            ["STATIC_BOX_TYPE", 286.3, 354.75, 1.01, 1.01, 0, [""]],
            ["STATIC_BOX_TYPE", 31.95, 404.6, .9, .9, 0, [""]],
            ["STATIC_BALK_1_TYPE", 16.55, 244.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 168.2, 142.7, .8, .8, 180, [""]],
            ["PUSHER_TYPE", 34.1, 351.25, .9, .9, -90, [""]],
            ["ZOMBIE_TYPE", 223.55, 103.7, .9, .9, -90, [""]],
            ["BONUS_STAR_TYPE", 274.05, 233.7, .78, .78, 0, [""]],
            ["BONUS_STAR_TYPE", 164.4, 289.95, .81, .81, 0, [""]],
            ["BONUS_STAR_TYPE", 85.2, 131.8, .81, .81, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 157.3, 438.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 260.15, 438.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 49.9, 253.75, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 19.05, 318.45, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 130.35, 224.95, .56, .56, 137, [""]],
            ["STATIC_BALK_1_TYPE", 210.85, 203.85, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 210.85, 272.95, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 292.4, 167.15, .56, .56, 137, [""]],
            ["TELEPORT_TYPE", 135.5, 309.2, 1.29, 1.29, 91, ["A"]],
            ["TELEPORT_TYPE", 266.85, 115.15, 1.29, 1.29, 0, ["A"]],
            ["BOMB_TYPE", 186.85, 243.6, .8, .8, 0, ["170_1000"]],
            ["BOMB_TYPE", 23.25, 290.6, .8, .8, 0, ["100_3500"]],
            ["BONUS_DANGER_KUST_TYPE", 52.65, 419.25, .87, .87, 0, [""]],
            ["STATIC_BOX_TYPE", 52.95, 440.7, 1.718, .34, 0, ["INVIS"]],
            ["BONUS_HOLE_TYPE", 7.2, 372.35, .705, .705, 90, [""]],
            ["STATIC_BOX_TYPE", -10.95, 372.6, 1.391, .275, 90, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 31.25, 124.65, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 317.5, 376.4, .8, .8, 90, [""]],
            ["STATIC_BALK_1_TYPE", 10.4, 188.5, .8, .8, 90, [""]],
            ["ZOMBIE_TYPE", 67.65, 211.75, 1, 1, -90, ["2"]],
            ["PUSHER_TYPE", 40.65, 85, 1, 1, -90, [""]],
            ["BONUS_STAR_TYPE", 159.65, 100.85, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 187.4, 382, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 54.05, 358.7, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 157.3, 361.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 260.15, 362.05, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 109.5, 269.95, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 10.5, 289.6, .8, .8, -90, [""]],
            ["STATIC_BALK_1_TYPE", 10.5, 183.45, .8, .8, -90, [""]],
            ["BOMB_TYPE", 77.85, 242.1, .8, .8, 0, ["100_900"]],
            ["BONUS_HOLE_TYPE", 292.05, 163.95, .774, .774, -90, [""]],
            ["STATIC_BOX_TYPE", 311.55, 163.55, 1.529, .302, -90, ["INVIS"]],
            ["BONUS_HOLE_TYPE", 292.05, 254.75, .774, .774, -90, [""]],
            ["STATIC_BOX_TYPE", 311.55, 254.35, 1.529, .302, -90, ["INVIS"]],
            ["STATIC_BOX_TYPE", 274.6, 325.65, .93, .93, 0, [""]],
            ["BOMB_TYPE", 209.7, 403.4, .8, .8, 0, ["120_1800"]],
            ["STATIC_BOX_TYPE", 207.6, 447.8, .93, .93, 0, [""]],
            ["PUSHER_TYPE", 142.25, 231.15, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 82.4, 320.85, 1, 1, -91, ["4"]],
            ["BONUS_STAR_TYPE", 189.6, 317.8, .9, .9, 0, [""]],
            ["BONUS_STAR_TYPE", 228.95, 189.15, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 109.4, 242.35, 1.11, 1.11, -90, [""]],
            ["STATIC_BALK_1_TYPE", 149.65, 324.05, .66, .66, 180, [""]],
            ["STATIC_BALK_1_TYPE", 13.1, 107.15, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 106.5, 135.85, .709, .709, -152, [""]],
            ["STATIC_BALK_1_TYPE", 236.95, 225.4, .679, .679, -152, [""]],
            ["STATIC_BALK_1_TYPE", 323.25, 282.2, .8, .8, 90, [""]],
            ["STATIC_BALK_1_TYPE", 323.25, 180.35, .8, .8, 90, [""]],
            ["BOMB_TYPE", 47.25, 80.3, .8, .8, 0, ["200_900"]],
            ["STATIC_BALK_1_TYPE", 242.15, 284.15, .58, .58, 135, [""]],
            ["STATIC_BALK_1_TYPE", 201.2, 270.2, .74, .74, 90, [""]],
            ["STATIC_BALK_1_TYPE", 41.6, 174.75, .8, .8, 180, [""]],
            ["BOMB_TYPE", 17.9, 143.85, .8, .8, 0, ["200_300"]],
            ["STATIC_BALK_1_TYPE", 236.7, 422.8, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 284.25, 370.4, .8, .8, 135, [""]],
            ["STATIC_BALK_1_TYPE", 134.85, 422.8, .8, .8, 180, [""]],
            ["BONUS_HOLE_TYPE", 49.85, 382.2, .87, .87, 90, [""]],
            ["STATIC_BOX_TYPE", 27.55, 382.6, 1.718, .34, 90, ["INVIS"]],
            ["PUSHER_TYPE", 111.9, 92.7, .899, .899, -66, [""]],
            ["PUSHER_TYPE", 250.25, 193.35, .9, .9, -65, [""]],
            ["PUSHER_TYPE", 154.95, 285.45, .9, .9, -84, [""]],
            ["ZOMBIE_TYPE", 119.2, 385.45, 1, 1, -91, ["4"]],
            ["BONUS_STAR_TYPE", 161.05, 203.6, .9, .9, 0, [""]]
        ],
        [
            ["STATIC_BALK_1_TYPE", 270.05, 422.8, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 165.2, 422.8, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 49.9, 422.8, .8, .8, 180, [""]],
            ["STATIC_BALK_1_TYPE", 112.5, 349.1, .77, .77, 173, [""]],
            ["STATIC_BALK_1_TYPE", 197.75, 339.25, .56, .56, 0, [""]],
            ["BOMB_TYPE", 35.25, 393.15, .8, .8, 0, ["200_1400"]],
            ["STATIC_BALK_1_TYPE", 134.55, 218.05, .77, .77, -175, [""]],
            ["STATIC_BALK_1_TYPE", 232.2, 226.95, .77, .77, -175, [""]],
            ["STATIC_BALK_1_TYPE", 328.5, 217.1, .56, .56, -17, [""]],
            ["STATIC_BALK_1_TYPE", 39.65, 160.3, .77, .77, 130, [""]],
            ["BOMB_TYPE", 288.8, 257.5, .71, .71, 0, ["200_900"]],
            ["STATIC_BALK_1_TYPE", 19.25, 298.5, .77, .77, 90, [""]],
            ["STATIC_BALK_1_TYPE", 28.75, 356.7, .56, .56, -3, [""]],
            ["STATIC_BALK_1_TYPE", 298.85, 282.45, .56, .56, 0, [""]],
            ["STATIC_BALK_1_TYPE", 304, 58.15, .77, .77, -133, [""]],
            ["BONUS_KAKTUS_TYPE", 122.05, 93.5, 1, 1, 90, [""]],
            ["STATIC_BOX_TYPE", 91.25, 94.2, 1.718, .43, 90, ["INVIS"]],
            ["STATIC_BALK_1_TYPE", 198.65, 124, .77, .77, 175, [""]],
            ["PUSHER_TYPE", 288.45, 384, 1, 1, -90, [""]],
            ["ZOMBIE_TYPE", 175.9, 86.75, 1, 1, -94, ["4"]],
            ["BOMB_TYPE", 227.05, 313.4, .8, .8, 0, ["100_300"]],
            ["BONUS_STAR_TYPE", 287.5, 319.15, .9, .9, 0, [""]]
        ]
    ],
    allBgIndexes = [1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 2, 3, 1, 3, 1, 2, 1, 3, 1, 2, 1, 2, 1, 2, 3, 2, 1, 3, 2, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    isEditorDebug = !1,
    editorLevelToLoad = 39,
    manifest = [],
    preloaderManifest = [, {
        src: "preloaderchar.png",
        id: "preloaderchar"
    }, {
        src: "preloaderline.png",
        id: "preloaderline"
    }, {
        src: "preloaderlinebg.png",
        id: "preloaderlinebg"
    }],
    zoeCFG = {
        framerate: 24,
        images: ["assets/dropmeassets.png"],
        frames: [
            [764, 2, 221, 205, 0, 100, 100],
            [1580, 794, 126, 138, 0, 61, 59],
            [139, 1071, 126, 127, 0, 61, 60],
            [1838, 794, 149, 137, 0, 77, 66],
            [372, 1200, 100, 100, 0, 48, 49],
            [1897, 1071, 100, 100, 0, 48, 49],
            [985, 2, 177, 191, 0, 87, 98],
            [937, 794, 133, 139, 0, 65, 67],
            [270, 1200, 102, 101, 0, 49, 48],
            [803, 1200, 83, 85, 0, 40, 40],
            [2014, 1373, 36, 40, 0, 0, 0],
            [1454, 794, 126, 138, 0, 61, 59],
            [1196, 794, 126, 138, 0, 61, 59],
            [1070, 794, 126, 138, 0, 61, 59],
            [2, 1200, 268, 102, 0, 132, 74],
            [1592, 1200, 78, 82, 0, 37, 39],
            [1813, 469, 153, 147, 0, 77, 69],
            [788, 794, 149, 139, 0, 68, 69],
            [2046, 2, 4, 4, 0, 500, 500],
            [288, 2, 476, 224, 0, 236, 201],
            [1259, 1071, 638, 106, 0, 317, 53],
            [2, 2, 286, 286, 0, 141, 141],
            [785, 1302, 390, 66, 0, 189, 41],
            [182, 1302, 60, 70, 0, 25, 35],
            [1175, 1302, 537, 65, 0, 249, 40],
            [2006, 1200, 44, 66, 0, -4, -7],
            [347, 1302, 51, 68, 0, -5, -6],
            [398, 1302, 55, 68, 0, -4, -6],
            [453, 1302, 57, 68, 0, -5, -6],
            [510, 1302, 51, 68, 0, -6, -6],
            [242, 1302, 52, 69, 0, -5, -5],
            [294, 1302, 53, 69, 0, -6, -6],
            [561, 1302, 53, 68, 0, -5, -6],
            [734, 1302, 51, 67, 0, -6, -6],
            [614, 1302, 52, 68, 0, -6, -6],
            [1331, 1430, 227, 46, 0, 113, 21],
            [709, 1200, 94, 94, 0, 0, 0],
            [379, 794, 134, 140, 0, 65, 68],
            [654, 794, 134, 140, 0, 65, 68],
            [245, 794, 134, 140, 0, 65, 68],
            [1309, 647, 134, 140, 0, 65, 68],
            [1558, 1430, 113, 26, 0, 54, 10],
            [1752, 1373, 57, 50, 0, 27, 24],
            [1921, 1200, 85, 72, 0, 41, 34],
            [541, 1477, 226, 45, 0, 111, 20],
            [1839, 1302, 58, 58, 0, 27, 27],
            [1780, 1302, 59, 58, 0, 27, 27],
            [1897, 1302, 58, 56, 0, 27, 26],
            [1955, 1302, 57, 50, 0, 27, 24],
            [472, 1200, 66, 95, 0, 30, 53],
            [886, 1200, 96, 85, 0, 42, 40],
            [1848, 1373, 43, 48, 0, -31, 55],
            [1930, 1373, 41, 47, 0, -32, 55],
            [1809, 1373, 39, 48, 0, -33, 57],
            [2012, 1302, 37, 47, 0, -34, 57],
            [1891, 1373, 39, 48, 0, -33, 56],
            [1971, 1373, 43, 42, 0, -31, 49],
            [1072, 1200, 90, 84, 0, 43, 40],
            [982, 1200, 90, 84, 0, 43, 40],
            [1162, 1200, 90, 84, 0, 43, 40],
            [1252, 1200, 90, 84, 0, 43, 40],
            [1419, 1200, 90, 84, 0, 43, 40],
            [1712, 1302, 68, 65, 0, 32, 31],
            [538, 1200, 94, 94, 0, 45, 45],
            [2003, 647, 44, 93, 0, 19, 73],
            [1987, 794, 57, 107, 0, 27, 77],
            [1966, 2, 80, 123, 0, 39, 82],
            [139, 934, 101, 136, 0, 50, 85],
            [142, 794, 103, 140, 0, 51, 88],
            [362, 647, 104, 144, 0, 51, 91],
            [110, 647, 106, 146, 0, 52, 92],
            [2, 647, 108, 147, 0, 53, 92],
            [1255, 469, 110, 150, 0, 54, 93],
            [1966, 469, 80, 122, 0, 40, 93],
            [694, 1071, 80, 116, 0, 40, 94],
            [992, 1071, 80, 112, 0, 40, 95],
            [1972, 934, 78, 110, 0, 39, 97],
            [1181, 1071, 78, 107, 0, 39, 99],
            [632, 1200, 77, 94, 0, 38, 101],
            [1342, 1200, 77, 84, 0, 38, 93],
            [1670, 1200, 76, 82, 0, 37, 93],
            [1746, 1200, 75, 81, 0, 37, 94],
            [1821, 1200, 60, 80, 0, 22, 95],
            [1997, 1071, 42, 78, 0, 21, 95],
            [1881, 1200, 40, 78, 0, 20, 96],
            [1810, 1430, 12, 13, 0, 0, 83],
            [666, 1302, 68, 67, 0, 32, 32],
            [1509, 1200, 83, 83, 0, 40, 40],
            [1072, 1071, 109, 108, 0, 53, 52],
            [1705, 934, 129, 129, 0, 63, 63],
            [240, 934, 135, 135, 0, 66, 66],
            [513, 794, 141, 140, 0, 69, 68],
            [1365, 469, 151, 150, 0, 74, 73],
            [653, 469, 151, 151, 0, 74, 74],
            [804, 469, 151, 151, 0, 74, 74],
            [1105, 469, 150, 150, 0, 74, 73],
            [955, 469, 150, 150, 0, 74, 73],
            [1516, 469, 149, 149, 0, 73, 73],
            [1665, 469, 148, 148, 0, 73, 72],
            [216, 647, 146, 146, 0, 72, 71],
            [466, 647, 143, 142, 0, 70, 69],
            [2, 934, 137, 137, 0, 67, 67],
            [375, 934, 134, 134, 0, 66, 65],
            [1443, 934, 133, 132, 0, 65, 64],
            [1576, 934, 129, 129, 0, 63, 63],
            [910, 934, 130, 133, 0, 63, 64],
            [1040, 934, 138, 132, 0, 68, 62],
            [1178, 934, 132, 132, 0, 64, 64],
            [1706, 794, 132, 138, 0, 62, 66],
            [509, 934, 131, 134, 0, 64, 65],
            [772, 934, 138, 133, 0, 66, 66],
            [1310, 934, 133, 132, 0, 65, 64],
            [1322, 794, 132, 138, 0, 66, 68],
            [640, 934, 132, 134, 0, 64, 65],
            [1475, 2, 310, 189, 0, 153, 138],
            [170, 288, 490, 179, 0, 244, 87],
            [2, 469, 494, 178, 0, 245, 87],
            [660, 288, 494, 179, 0, 245, 87],
            [1154, 288, 178, 178, 0, 88, 90],
            [1332, 288, 179, 178, 0, 87, 91],
            [1690, 288, 179, 178, 0, 89, 91],
            [1511, 288, 179, 178, 0, 89, 92],
            [1834, 934, 138, 129, 0, 67, 66],
            [265, 1071, 137, 126, 0, 66, 65],
            [2, 1071, 137, 129, 0, 69, 67],
            [402, 1071, 146, 126, 0, 72, 64],
            [496, 469, 157, 178, 0, 76, 87],
            [2, 288, 168, 181, 0, 86, 90],
            [1785, 2, 181, 186, 0, 97, 92],
            [2, 1302, 180, 71, 0, 107, 64],
            [1671, 1430, 139, 21, 0, 64, 66],
            [1869, 288, 179, 178, 0, 89, 92],
            [548, 1071, 146, 126, 0, 72, 64],
            [1863, 647, 140, 140, 0, 68, 68],
            [2, 794, 140, 140, 0, 68, 68],
            [1583, 647, 140, 140, 0, 68, 68],
            [1443, 647, 140, 140, 0, 68, 68],
            [1029, 647, 140, 140, 0, 68, 68],
            [1169, 647, 140, 140, 0, 68, 68],
            [889, 647, 140, 140, 0, 68, 68],
            [609, 647, 140, 140, 0, 68, 68],
            [749, 647, 140, 140, 0, 68, 68],
            [1723, 647, 140, 140, 0, 68, 68],
            [2, 1430, 390, 47, 0, 193, 25],
            [1457, 1373, 295, 56, 0, 145, 25],
            [2, 1373, 508, 57, 0, 253, 25],
            [392, 1430, 576, 46, 0, 285, 25],
            [968, 1430, 363, 46, 0, 178, 25],
            [2, 1477, 539, 46, 0, 266, 25],
            [510, 1373, 407, 57, 0, 200, 25],
            [917, 1373, 540, 57, 0, 268, 25],
            [1359, 1477, 598, 38, 0, 297, 22],
            [767, 1477, 592, 41, 0, 294, 21],
            [1162, 2, 313, 190, 0, 155, 138],
            [774, 1071, 218, 113, 0, 106, 57]
        ],
        animations: {
            0: {
                speed: 1,
                frames: [33]
            },
            1: {
                speed: 1,
                frames: [25]
            },
            2: {
                speed: 1,
                frames: [26]
            },
            3: {
                speed: 1,
                frames: [27]
            },
            5: {
                speed: 1,
                frames: [29, 29]
            },
            6: {
                speed: 1,
                frames: [34]
            },
            7: {
                speed: 1,
                frames: [30]
            },
            8: {
                speed: 1,
                frames: [31]
            },
            9: {
                speed: 1,
                frames: [32]
            },
            4: {
                speed: 1,
                frames: [28]
            },
            levelbuttonlocked: {
                speed: 1,
                frames: [2]
            },
            achievicon8: {
                speed: 1,
                frames: [142]
            },
            achievdesc0: {
                speed: 1,
                frames: [143]
            },
            newachievbgv: {
                speed: 1,
                frames: [19]
            },
            STATIC_TUBE_1_TYPE: {
                speed: 1,
                frames: [115]
            },
            achievicon5: {
                speed: 1,
                frames: [139]
            },
            bubbleblow: {
                speed: 1,
                frames: [126, 127, 128, 129, 130, 18]
            },
            bombexplosionv: {
                speed: 1,
                frames: [57, 58, 59, 60, 61, 18]
            },
            nextbtn: {
                speed: 1,
                frames: [17, 18, 18, 18, 18]
            },
            STATIC_BOX_TYPE: {
                speed: 1,
                frames: [43]
            },
            STATIC_TUBE_3_TYPE: {
                speed: 1,
                frames: [117]
            },
            lvlLabelStar0: {
                speed: 1,
                frames: [1]
            },
            achievdesc1: {
                speed: 1,
                frames: [144]
            },
            achievicon7: {
                speed: 1,
                frames: [141]
            },
            achievicon0: {
                speed: 1,
                frames: [134]
            },
            achievicon2: {
                speed: 1,
                frames: [136]
            },
            STATIC_BALK_1_TYPE: {
                speed: 1,
                frames: [35]
            },
            HARD_TRIANGLE_TYPE: {
                speed: 1,
                frames: [42]
            },
            achievicon3: {
                speed: 1,
                frames: [137]
            },
            BAD_2_TYPE: {
                speed: 1,
                frames: [131]
            },
            BAD_2_TYPE_CLICKED: {
                speed: 1,
                frames: [132]
            },
            STATIC_TUBE_2_TYPE: {
                speed: 1,
                frames: [116]
            },
            porubovcom: {
                speed: 1,
                frames: [24]
            },
            achievdesc7: {
                speed: 1,
                frames: [150]
            },
            playbtnup: {
                speed: 1,
                frames: [0]
            },
            lvlLabelStar3: {
                speed: 1,
                frames: [13]
            },
            HERO_3_TYPE_CLICKED: {
                speed: 1,
                frames: [124]
            },
            achievicon6: {
                speed: 1,
                frames: [140]
            },
            achievdesc8: {
                speed: 1,
                frames: [151]
            },
            DYNAMIC_BOX_TYPE_3: {
                speed: 1,
                frames: [47]
            },
            musicoffbtn: {
                speed: 1,
                frames: [5]
            },
            HERO_2_TYPE_CLICKED: {
                speed: 1,
                frames: [123]
            },
            achievicon1: {
                speed: 1,
                frames: [135]
            },
            achievicon4: {
                speed: 1,
                frames: [138]
            },
            DYNAMIC_BOX_TYPE_2: {
                speed: 1,
                frames: [46]
            },
            radugav: {
                speed: 1,
                frames: [21]
            },
            DYNAMIC_BOX_TYPE: {
                speed: 1,
                frames: [45]
            },
            restartbtn: {
                speed: 1,
                frames: [6]
            },
            achievclosed: {
                speed: 1,
                frames: [133]
            },
            achievdesc2: {
                speed: 1,
                frames: [145]
            },
            achievdesctap: {
                speed: 1,
                frames: [152]
            },
            DECOR_HELP_1_TYPE: {
                speed: 1,
                frames: [37]
            },
            STATIC_BALK_1_TYPE_2: {
                speed: 1,
                frames: [44, 44]
            },
            lvlLabelStar2: {
                speed: 1,
                frames: [12]
            },
            pauseface: {
                speed: 1,
                frames: [153]
            },
            tint2: {
                speed: 1,
                frames: [36]
            },
            achievlabelbg: {
                speed: 1,
                frames: [20]
            },
            BAD_1_TYPE_CLICKED: {
                speed: 1,
                frames: [125]
            },
            moregames2v: {
                speed: 1,
                frames: [16]
            },
            achievbtn: {
                speed: 1,
                frames: [7]
            },
            BONUS_STAR_TYPE: {
                speed: 1,
                frames: [49]
            },
            completestar: {
                speed: 1,
                frames: [15, 15]
            },
            pausezzz: {
                speed: 1,
                frames: [154]
            },
            achievdesc5: {
                speed: 1,
                frames: [148]
            },
            DYNAMIC_TRIANGLE_TYPE: {
                speed: 1,
                frames: [48, 48, 48, 48, 48]
            },
            BAD_1_TYPE: {
                speed: 1,
                frames: [121]
            },
            btnbaseup: {
                speed: 1,
                frames: [8]
            },
            musiconbtn: {
                speed: 1,
                frames: [4]
            },
            youlosttitle: {
                speed: 1,
                frames: [114]
            },
            HERO_3_TYPE: {
                speed: 1,
                frames: [120]
            },
            DECOR_HELP_2_TYPE: {
                speed: 1,
                frames: [38]
            },
            HERO_1_TYPE: {
                speed: 1,
                frames: [118]
            },
            DECOR_HELP_3_TYPE: {
                speed: 1,
                frames: [39]
            },
            HERO_1_TYPE_CLICKED: {
                speed: 1,
                frames: [122]
            },
            TELEPORT_TYPE: {
                speed: 1,
                frames: [105, 106, 107, 108, 109, 110, 111, 112, 113]
            },
            STATIC_CIRCLE_TYPE: {
                speed: 1,
                frames: [63]
            },
            quitbtn: {
                speed: 1,
                frames: [3]
            },
            parteffectv2: {
                speed: 1,
                frames: [86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 18]
            },
            creditsand: {
                speed: 1,
                frames: [23]
            },
            tintbg: {
                speed: 1,
                frames: [10]
            },
            pausebtn: {
                speed: 1,
                frames: [9]
            },
            achievdesc3: {
                speed: 1,
                frames: [146]
            },
            lvlLabelStar1: {
                speed: 1,
                frames: [11]
            },
            bombfitil: {
                speed: 1,
                frames: [51, 52, 53, 54, 55, 56]
            },
            discofish: {
                speed: 1,
                frames: [22]
            },
            achievdesc4: {
                speed: 1,
                frames: [147]
            },
            HARD_RECT_TYPE: {
                speed: 1,
                frames: [41]
            },
            BOMB_TYPE: {
                speed: 1,
                frames: [50]
            },
            parteffectv1: {
                speed: 1,
                frames: [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85]
            },
            achievdesc6: {
                speed: 1,
                frames: [149]
            },
            lvlcompletebgnew: {
                speed: 1,
                frames: [14]
            },
            HERO_2_TYPE: {
                speed: 1,
                frames: [119]
            },
            DYNAMIC_CIRCLE_TYPE: {
                speed: 1,
                frames: [62]
            },
            DECOR_HELP_4_TYPE: {
                speed: 1,
                frames: [40, 40, 40, 40]
            },
            DYNAMIC_RECT_TYPE: {
                speed: 1,
                frames: [44]
            }
        }
    },
    PART_STAR_TYPE = 1,
    PART_CLOUD_TYPE = 2,
    PART_NUM_TYPE = 3,
    PART_INSTRUCTION_TYPE = 4,
    PART_GLASS_TYPE = 5,
    PART_ACHIEV_TYPE = 6,
    MAX_PARTICLES_ON_SCREEN = 12;
! function(e) {
    function t(e, t, i) {
        this.initialize(e, t, i)
    }
    var i = t.prototype;
    i.initialize = function(e, t, i) {
        var n = new createjs.Sprite(zoeSS);
        n.snapToPixel = !0, n.baseBlock = this, this.vis = n, this.reset(e, t, i)
    }, i.reset = function(e, t, i) {
        this.type = e, this.vis.parent != t && removeFromParent(this.vis), createjs.Tween.removeTweens(this.vis), this.parent = t, this.vis.alpha = 1, this.vis.mouseEnabled = !1, this.speedX = 0, this.speedY = 0, this.moveTarget = null, this.speedA = 0, this.speedScale = .05, this.maxScale = 1.2, this.isPrerendered = !1, this.speedAlpha = .08, this.gravity = .6, this.isNum = !1, this.beforeHideTimer = .1, this.isInstruction = !1, this.isNeedDispose = !1, this.vis.spriteSheet = zoeSS, deleteCache(this.vis);
        var n = "numb0";
        e == PART_STAR_TYPE ? n = Math.random() > .7 ? "particle1v" : Math.random() > .5 ? "particle3v" : "particle2v" : e == PART_NUM_TYPE || e == PART_ACHIEV_TYPE ? this.isNum = !0 : e == PART_CLOUD_TYPE ? (this.gravity = 0, n = Math.random() > .5 ? "cloud1v" : "cloud2v") : e == PART_INSTRUCTION_TYPE ? this.isInstruction = !0 : e === PART_GLASS_TYPE && (n = Math.random() > .7 ? "particleglass1" : Math.random() > .5 ? "particleglass2" : "particleglass3"), this.vis.gotoAndStop(n), this.scale = i, this.updateVisionScale(), t.addChild(this.vis)
    }, i.setPos = function(e, t) {
        this.vis.x = e, this.vis.y = t
    }, i.setNum = function(e) {
        this.beforeHideTimer = 10, this.speedAlpha = .03, this.gravity = 0, this.vis.rotation = 0, this.vis.gotoAndStop("PART_" + e)
    }, i.setFrame = function(e, t) {
        this.gravity = 0, this.vis.rotation = 0, t ? this.vis.gotoAndPlay(e) : this.vis.gotoAndStop(e)
    }, i.tick = function() {
        if (!(this.isNeedDispose || (this.moveTarget ? (this.vis.x = this.moveTarget.x, this.vis.y = this.moveTarget.y) : (this.vis.x += this.speedX * dtScale, this.vis.y += this.speedY * dtScale, this.speedY += this.gravity * dtScale, this.vis.rotation += this.speedA * dtScale), this.beforeHideTimer -= dtScale, this.beforeHideTimer > 0))) {
            if (this.isPrerendered) return void(this.isNeedDispose = !0);
            if (this.isNum) this.vis.alpha -= this.speedAlpha * dtScale;
            else {
                if (this.isInstruction) return;
                this.vis.visible = !0, this.vis.scaleX += this.speedScale * dtScale, this.vis.scaleX > this.maxScale && (this.vis.alpha -= this.speedAlpha * dtScale), this.vis.scaleY = this.vis.scaleX
            }
            this.vis.alpha < .01 && (this.isNeedDispose = !0)
        }
    }, i.updateVisionScale = function() {
        this.vis.scaleX = this.vis.scaleY = this.scale
    }, i.dispose = function() {
        isArrayContains(allParts, this) && allParts.splice(allParts.indexOf(this, 0), 1), addToDisposedParts(this), this.vis.removeAllEventListeners(), this.vis.stop(), removeFromParent(this.vis)
    }, e.ParticleBase = t
}(window);
var allParts = [],
    disposedParts = [],
    partSin, partCos, partScale, allPartsLenght = 0,
    partLength = 0,
    currPart = null,
    disposeNeededParts = [];
! function() {
    Object.create = Object.create || function(e) {
        function t() {}
        return t.prototype = e, new t
    };
    var e;
    "undefined" == typeof exports ? (e = {}, "object" == typeof window && (window.cp = e)) : e = exports;
    var t, i, n = function(e, t) {
            if (!e) throw new Error("Assertion failed: " + t)
        },
        s = function(e, t) {
            !e && console && console.warn && (console.warn("ASSERTION FAILED: " + t), console.trace && console.trace())
        },
        a = function(e, t) {
            return t > e ? e : t
        },
        r = function(e, t) {
            return e > t ? e : t
        };
    "object" == typeof window && window.navigator.userAgent.indexOf("Firefox") > -1 ? (t = Math.min, i = Math.max) : (t = a, i = r);
    var o = function(e, t) {
            return t > e ? e + " " + t : t + " " + e
        },
        l = function(e, t) {
            for (var i = 0; i < e.length; i++)
                if (e[i] === t) return e[i] = e[e.length - 1], void e.length--
        },
        h = function(e, t, i) {
            var n = A(t, i),
                s = f(g(n, A(e, i)) / Y(n));
            return P(i, C(n, s))
        },
        c = function(e, t, i, n, s, a) {
            var r = i - s,
                o = n - a,
                l = f(S(r, o, e - s, t - a) / M(r, o));
            return new m(s + r * l, a + o * l)
        };
    e.momentForCircle = function(e, t, i, n) {
        return e * (.5 * (t * t + i * i) + Y(n))
    }, e.areaForCircle = function(e, t) {
        return Math.PI * Math.abs(e * e - t * t)
    }, e.momentForSegment = function(e, t, i) {
        var n = C(P(t, i), .5);
        return e * (H(i, t) / 12 + Y(n))
    }, e.areaForSegment = function(e, t, i) {
        return i * (Math.PI * i + 2 * k(e, t))
    }, e.momentForPoly = function(e, t, i) {
        for (var n = 0, s = 0, a = t.length, r = 0; a > r; r += 2) {
            var o = t[r] + i.x,
                l = t[r + 1] + i.y,
                h = t[(r + 2) % a] + i.x,
                c = t[(r + 3) % a] + i.y,
                u = w(h, c, o, l),
                d = S(o, l, o, l) + S(o, l, h, c) + S(h, c, h, c);
            n += u * d, s += u
        }
        return e * n / (6 * s)
    }, e.areaForPoly = function(e) {
        for (var t = 0, i = 0, n = e.length; n > i; i += 2) t += B(new m(e[i], e[i + 1]), new m(e[(i + 2) % n], e[(i + 3) % n]));
        return -t / 2
    }, e.centroidForPoly = function(e) {
        for (var t = 0, i = new m(0, 0), n = 0, s = e.length; s > n; n += 2) {
            var a = new m(e[n], e[n + 1]),
                r = new m(e[(n + 2) % s], e[(n + 3) % s]),
                o = B(a, r);
            t += o, i = P(i, C(P(a, r), o))
        }
        return C(i, 1 / (3 * t))
    }, e.recenterPoly = function(t) {
        for (var i = e.centroidForPoly(t), n = 0; n < t.length; n += 2) t[n] -= i.x, t[n + 1] -= i.y
    }, e.momentForBox = function(e, t, i) {
        return e * (t * t + i * i) / 12
    }, e.momentForBox2 = function(t, i) {
        var n = i.r - i.l,
            s = i.t - i.b,
            a = C([i.l + i.r, i.b + i.t], .5);
        return e.momentForBox(t, n, s) + t * Y(a)
    };
    var u = e.loopIndexes = function(e) {
            var t, i, n, s, a = 0,
                r = 0;
            t = n = e[0], i = s = e[1];
            for (var o = e.length >> 1, l = 1; o > l; l++) {
                var h = e[2 * l],
                    c = e[2 * l + 1];
                t > h || h == t && i > c ? (t = h, i = c, a = l) : (h > n || h == n && c > s) && (n = h, s = c, r = l)
            }
            return [a, r]
        },
        d = function(e, t, i) {
            var n = e[2 * t];
            e[2 * t] = e[2 * i], e[2 * i] = n, n = e[2 * t + 1], e[2 * t + 1] = e[2 * i + 1], e[2 * i + 1] = n
        },
        p = function(e, t, i, n, s, a) {
            if (0 === i) return 0;
            for (var r = 0, o = t, l = A(s, n), h = a * E(l), c = t, u = t + i - 1; u >= c;) {
                var p = new m(e[2 * c], e[2 * c + 1]),
                    _ = B(l, A(p, n));
                _ > h ? (_ > r && (r = _, o = c), c++) : (d(e, c, u), u--)
            }
            return o != t && d(e, t, o), c - t
        },
        _ = function(e, t, i, n, s, a, r, o) {
            if (0 > n) return 0;
            if (0 == n) return t[2 * o] = a.x, t[2 * o + 1] = a.y, 1;
            var l = p(t, i, n, s, a, e),
                h = new m(t[2 * i], t[2 * i + 1]),
                c = _(e, t, i + 1, l - 1, s, h, a, o),
                u = o + c++;
            t[2 * u] = a.x, t[2 * u + 1] = a.y;
            var d = p(t, i + l, n - l, a, r, e),
                v = new m(t[2 * (i + l)], t[2 * (i + l) + 1]);
            return c + _(e, t, i + l + 1, d - 1, a, v, r, o + c)
        };
    e.convexHull = function(e, t, i) {
        if (t)
            for (var n = 0; n < e.length; n++) t[n] = e[n];
        else t = e;
        var a = u(e),
            r = a[0],
            o = a[1];
        if (r == o) return t.length = 2, t;
        d(t, 0, r), d(t, 1, 0 == o ? r : o);
        var l = new m(t[0], t[1]),
            h = new m(t[2], t[3]),
            c = e.length >> 1,
            p = _(i, t, 2, c - 2, l, h, l, 1) + 1;
        return t.length = 2 * p, s(et(t), "Internal error: cpConvexHull() and cpPolyValidate() did not agree.Please report this error with as much info as you can."), t
    };
    var v = function(e, n, s) {
            return t(i(e, n), s)
        },
        f = function(e) {
            return i(0, t(e, 1))
        },
        m = e.Vect = function(e, t) {
            this.x = e, this.y = t
        };
    e.v = function(e, t) {
        return new m(e, t)
    };
    var T = e.vzero = new m(0, 0),
        g = e.v.dot = function(e, t) {
            return e.x * t.x + e.y * t.y
        },
        S = function(e, t, i, n) {
            return e * i + t * n
        },
        E = e.v.len = function(e) {
            return Math.sqrt(g(e, e))
        },
        y = e.v.len2 = function(e, t) {
            return Math.sqrt(e * e + t * t)
        },
        P = (e.v.eql = function(e, t) {
            return e.x === t.x && e.y === t.y
        }, e.v.add = function(e, t) {
            return new m(e.x + t.x, e.y + t.y)
        });
    m.prototype.add = function(e) {
        return this.x += e.x, this.y += e.y, this
    };
    var A = e.v.sub = function(e, t) {
        return new m(e.x - t.x, e.y - t.y)
    };
    m.prototype.sub = function(e) {
        return this.x -= e.x, this.y -= e.y, this
    };
    var b = e.v.neg = function(e) {
        return new m(-e.x, -e.y)
    };
    m.prototype.neg = function() {
        return this.x = -this.x, this.y = -this.y, this
    };
    var C = e.v.mult = function(e, t) {
        return new m(e.x * t, e.y * t)
    };
    m.prototype.mult = function(e) {
        return this.x *= e, this.y *= e, this
    };
    var B = e.v.cross = function(e, t) {
            return e.x * t.y - e.y * t.x
        },
        w = function(e, t, i, n) {
            return e * n - t * i
        },
        L = e.v.perp = function(e) {
            return new m(-e.y, e.x)
        },
        O = (e.v.pvrperp = function(e) {
            return new m(e.y, -e.x)
        }, e.v.project = function(e, t) {
            return C(t, g(e, t) / Y(t))
        });
    m.prototype.project = function(e) {
        return this.mult(g(this, e) / Y(e)), this
    };
    var I = e.v.rotate = function(e, t) {
        return new m(e.x * t.x - e.y * t.y, e.x * t.y + e.y * t.x)
    };
    m.prototype.rotate = function(e) {
        return this.x = this.x * e.x - this.y * e.y, this.y = this.x * e.y + this.y * e.x, this
    };
    var x = e.v.unrotate = function(e, t) {
            return new m(e.x * t.x + e.y * t.y, e.y * t.x - e.x * t.y)
        },
        Y = e.v.lengthsq = function(e) {
            return g(e, e)
        },
        M = e.v.lengthsq2 = function(e, t) {
            return e * e + t * t
        },
        R = e.v.lerp = function(e, t, i) {
            return P(C(e, 1 - i), C(t, i))
        },
        N = e.v.normalize = function(e) {
            return C(e, 1 / E(e))
        },
        D = e.v.normalize_safe = function(e) {
            return 0 === e.x && 0 === e.y ? T : N(e)
        },
        j = e.v.clamp = function(e, t) {
            return g(e, e) > t * t ? C(N(e), t) : e
        },
        k = (e.v.lerpconst = function(e, t, i) {
            return P(e, j(A(t, e), i))
        }, e.v.dist = function(e, t) {
            return E(A(e, t))
        }),
        H = e.v.distsq = function(e, t) {
            return Y(A(e, t))
        },
        F = (e.v.near = function(e, t, i) {
            return H(e, t) < i * i
        }, e.v.slerp = function(e, t, i) {
            var n = Math.acos(g(e, t));
            if (n) {
                var s = 1 / Math.sin(n);
                return P(C(e, Math.sin((1 - i) * n) * s), C(t, Math.sin(i * n) * s))
            }
            return e
        }),
        U = (e.v.slerpconst = function(e, i, n) {
            var s = Math.acos(g(e, i));
            return F(e, i, t(n, s) / s)
        }, e.v.forangle = function(e) {
            return new m(Math.cos(e), Math.sin(e))
        }, e.v.toangle = function(e) {
            return Math.atan2(e.y, e.x)
        }, e.v.str = function(e) {
            return "(" + e.x.toFixed(3) + ", " + e.y.toFixed(3) + ")"
        }, 0),
        G = e.BB = function(e, t, i, n) {
            this.l = e, this.b = t, this.r = i, this.t = n, U++
        };
    e.bb = function(e, t, i, n) {
        return new G(e, t, i, n)
    };
    var X = function(e, t) {
            return new G(e.x - t, e.y - t, e.x + t, e.y + t)
        },
        K = function(e, t, i, n, s) {
            return e.l <= n && t <= e.r && e.b <= s && i <= e.t
        },
        V = 0,
        W = (e.NO_GROUP = 0, e.ALL_LAYERS = -1);
    e.resetShapeIdCounter = function() {
        V = 0
    };
    var z = e.Shape = function(e) {
        this.body = e, this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0, this.hashid = V++, this.sensor = !1, this.e = 0, this.u = 0, this.surface_v = T, this.collision_type = 0, this.group = 0, this.layers = W, this.space = null, this.collisionCode = this.collisionCode
    };
    z.prototype.setElasticity = function(e) {
        this.e = e
    }, z.prototype.setFriction = function(e) {
        this.body.activate(), this.u = e
    }, z.prototype.setLayers = function(e) {
        this.body.activate(), this.layers = e
    }, z.prototype.setSensor = function(e) {
        this.body.activate(), this.sensor = e
    }, z.prototype.setCollisionType = function(e) {
        this.body.activate(), this.collision_type = e
    }, z.prototype.getBody = function() {
        return this.body
    }, z.prototype.active = function() {
        return this.body && -1 !== this.body.shapeList.indexOf(this)
    }, z.prototype.setBody = function(e) {
        n(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body."), this.body = e
    }, z.prototype.cacheBB = function() {
        return this.update(this.body.p, this.body.rot)
    }, z.prototype.update = function(e, t) {
        n(!isNaN(t.x), "Rotation is NaN"), n(!isNaN(e.x), "Position is NaN"), this.cacheData(e, t)
    }, z.prototype.pointQuery = function(e) {
        var t = this.nearestPointQuery(e);
        return t.d < 0 ? t : void 0
    }, z.prototype.getBB = function() {
        return new G(this.bb_l, this.bb_b, this.bb_r, this.bb_t)
    };
    var Q = function(e, t, i) {
            this.shape = e, this.p = t, this.d = i
        },
        J = function(e, t, i) {
            this.shape = e, this.t = t, this.n = i
        };
    J.prototype.hitPoint = function(e, t) {
        return R(e, t, this.t)
    }, J.prototype.hitDist = function(e, t) {
        return k(e, t) * this.t
    };
    var q = e.CircleShape = function(e, t, i) {
        this.c = this.tc = i, this.r = t, this.type = "circle", z.call(this, e)
    };
    q.prototype = Object.create(z.prototype), q.prototype.cacheData = function(e, t) {
        var i = this.tc = I(this.c, t).add(e),
            n = this.r;
        this.bb_l = i.x - n, this.bb_b = i.y - n, this.bb_r = i.x + n, this.bb_t = i.y + n
    }, q.prototype.nearestPointQuery = function(e) {
        var t = e.x - this.tc.x,
            i = e.y - this.tc.y,
            n = y(t, i),
            s = this.r,
            a = new m(this.tc.x + t * s / n, this.tc.y + i * s / n);
        return new Q(this, a, n - s)
    };
    var Z = function(e, t, i, n, s) {
        n = A(n, t), s = A(s, t);
        var a = g(n, n) - 2 * g(n, s) + g(s, s),
            r = -2 * g(n, n) + 2 * g(n, s),
            o = g(n, n) - i * i,
            l = r * r - 4 * a * o;
        if (l >= 0) {
            var h = (-r - Math.sqrt(l)) / (2 * a);
            if (h >= 0 && 1 >= h) return new J(e, h, N(R(n, s, h)))
        }
    };
    q.prototype.segmentQuery = function(e, t) {
        return Z(this, this.tc, this.r, e, t)
    };
    var $ = e.SegmentShape = function(e, t, i, n) {
        this.a = t, this.b = i, this.n = L(N(A(i, t))), this.ta = this.tb = this.tn = null, this.r = n, this.a_tangent = T, this.b_tangent = T, this.type = "segment", z.call(this, e)
    };
    $.prototype = Object.create(z.prototype), $.prototype.cacheData = function(e, t) {
        this.ta = P(e, I(this.a, t)), this.tb = P(e, I(this.b, t)), this.tn = I(this.n, t);
        var i, n, s, a;
        this.ta.x < this.tb.x ? (i = this.ta.x, n = this.tb.x) : (i = this.tb.x, n = this.ta.x), this.ta.y < this.tb.y ? (s = this.ta.y, a = this.tb.y) : (s = this.tb.y, a = this.ta.y);
        var r = this.r;
        this.bb_l = i - r, this.bb_b = s - r, this.bb_r = n + r, this.bb_t = a + r
    }, $.prototype.nearestPointQuery = function(e) {
        var t = h(e, this.ta, this.tb),
            i = e.x - t.x,
            n = e.y - t.y,
            s = y(i, n),
            a = this.r,
            r = s ? P(t, C(new m(i, n), a / s)) : t;
        return new Q(this, r, s - a)
    }, $.prototype.segmentQuery = function(e, t) {
        var i = this.tn,
            n = g(A(this.ta, e), i),
            s = this.r,
            a = n > 0 ? b(i) : i,
            r = A(C(a, s), e),
            o = P(this.ta, r),
            l = P(this.tb, r),
            h = A(t, e);
        if (B(h, o) * B(h, l) <= 0) {
            var c = n + (n > 0 ? -s : s),
                u = -c,
                d = g(h, i) - c;
            if (0 > u * d) return new J(this, u / (u - d), a)
        } else if (0 !== s) {
            var p = Z(this, this.ta, this.r, e, t),
                _ = Z(this, this.tb, this.r, e, t);
            return p ? _ && _.t < p.t ? _ : p : _
        }
    }, $.prototype.setNeighbors = function(e, t) {
        this.a_tangent = A(e, this.a), this.b_tangent = A(t, this.b)
    }, $.prototype.setEndpoints = function(e, t) {
        this.a = e, this.b = t, this.n = L(N(A(t, e)))
    };
    var et = function(e) {
            for (var t = e.length, i = 0; t > i; i += 2) {
                var n = e[i],
                    s = e[i + 1],
                    a = e[(i + 2) % t],
                    r = e[(i + 3) % t],
                    o = e[(i + 4) % t],
                    l = e[(i + 5) % t];
                if (w(a - n, r - s, o - a, l - r) > 0) return !1
            }
            return !0
        },
        tt = e.PolyShape = function(e, t, i) {
            this.setVerts(t, i), this.type = "poly", z.call(this, e)
        };
    tt.prototype = Object.create(z.prototype);
    var it = function(e, t) {
        this.n = e, this.d = t
    };
    it.prototype.compare = function(e) {
        return g(this.n, e) - this.d
    }, tt.prototype.setVerts = function(e, t) {
        n(e.length >= 4, "Polygons require some verts"), n("number" == typeof e[0], "Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])"), n(et(e), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");
        var i = e.length,
            s = i >> 1;
        this.verts = new Array(i), this.tVerts = new Array(i), this.planes = new Array(s), this.tPlanes = new Array(s);
        for (var a = 0; i > a; a += 2) {
            var r = e[a] + t.x,
                o = e[a + 1] + t.y,
                l = e[(a + 2) % i] + t.x,
                h = e[(a + 3) % i] + t.y,
                c = N(L(new m(l - r, h - o)));
            this.verts[a] = r, this.verts[a + 1] = o, this.planes[a >> 1] = new it(c, S(c.x, c.y, r, o)), this.tPlanes[a >> 1] = new it(new m(0, 0), 0)
        }
    };
    var nt = (e.BoxShape = function(e, t, i) {
        var n = t / 2,
            s = i / 2;
        return nt(e, new G(-n, -s, n, s))
    }, e.BoxShape2 = function(e, t) {
        var i = [t.l, t.b, t.l, t.t, t.r, t.t, t.r, t.b];
        return new tt(e, i, T)
    });
    tt.prototype.transformVerts = function(e, n) {
        for (var s = this.verts, a = this.tVerts, r = 1 / 0, o = -1 / 0, l = 1 / 0, h = -1 / 0, c = 0; c < s.length; c += 2) {
            var u = s[c],
                d = s[c + 1],
                p = e.x + u * n.x - d * n.y,
                _ = e.y + u * n.y + d * n.x;
            a[c] = p, a[c + 1] = _, r = t(r, p), o = i(o, p), l = t(l, _), h = i(h, _)
        }
        this.bb_l = r, this.bb_b = l, this.bb_r = o, this.bb_t = h
    }, tt.prototype.transformAxes = function(e, t) {
        for (var i = this.planes, n = this.tPlanes, s = 0; s < i.length; s++) {
            var a = I(i[s].n, t);
            n[s].n = a, n[s].d = g(e, a) + i[s].d
        }
    }, tt.prototype.cacheData = function(e, t) {
        this.transformAxes(e, t), this.transformVerts(e, t)
    }, tt.prototype.nearestPointQuery = function(e) {
        for (var t = this.tPlanes, i = this.tVerts, n = i[i.length - 2], s = i[i.length - 1], a = 1 / 0, r = T, o = !1, l = 0; l < t.length; l++) {
            t[l].compare(e) > 0 && (o = !0);
            var h = i[2 * l],
                u = i[2 * l + 1],
                d = c(e.x, e.y, n, s, h, u),
                p = k(e, d);
            a > p && (a = p, r = d), n = h, s = u
        }
        return new Q(this, r, o ? a : -a)
    }, tt.prototype.segmentQuery = function(e, t) {
        for (var i = this.tPlanes, n = this.tVerts, s = i.length, a = 2 * s, r = 0; s > r; r++) {
            var o = i[r].n,
                l = g(e, o);
            if (!(i[r].d > l)) {
                var h = g(t, o),
                    c = (i[r].d - l) / (h - l);
                if (!(0 > c || c > 1)) {
                    var u = R(e, t, c),
                        d = -B(o, u),
                        p = -w(o.x, o.y, n[2 * r], n[2 * r + 1]),
                        _ = -w(o.x, o.y, n[(2 * r + 2) % a], n[(2 * r + 3) % a]);
                    if (d >= p && _ >= d) return new J(this, c, o)
                }
            }
        }
    }, tt.prototype.valueOnAxis = function(e, i) {
        for (var n = this.tVerts, s = S(e.x, e.y, n[0], n[1]), a = 2; a < n.length; a += 2) s = t(s, S(e.x, e.y, n[a], n[a + 1]));
        return s - i
    }, tt.prototype.containsVert = function(e, t) {
        for (var i = this.tPlanes, n = 0; n < i.length; n++) {
            var s = i[n].n,
                a = S(s.x, s.y, e, t) - i[n].d;
            if (a > 0) return !1
        }
        return !0
    }, tt.prototype.containsVertPartial = function(e, t, i) {
        for (var n = this.tPlanes, s = 0; s < n.length; s++) {
            var a = n[s].n;
            if (!(g(a, i) < 0)) {
                var r = S(a.x, a.y, e, t) - n[s].d;
                if (r > 0) return !1
            }
        }
        return !0
    }, tt.prototype.getNumVerts = function() {
        return this.verts.length / 2
    }, tt.prototype.getVert = function(e) {
        return new m(this.verts[2 * e], this.verts[2 * e + 1])
    };
    var st = e.Body = function(e, t) {
        this.p = new m(0, 0), this.additGrav = 0, this.vx = this.vy = 0, this.f = new m(0, 0), this.w = 0, this.t = 0, this.v_limit = 1 / 0, this.w_limit = 1 / 0, this.v_biasx = this.v_biasy = 0, this.w_bias = 0, this.space = null, this.shapeList = [], this.arbiterList = null, this.constraintList = null, this.nodeRoot = null, this.nodeNext = null, this.nodeIdleTime = 0, this.setMass(e), this.setMoment(t), this.rot = new m(0, 0), this.setAngle(0)
    };
    if ("undefined" != typeof DEBUG && DEBUG) {
        var at = function(e, t) {
                n(e.x == e.x && e.y == e.y, t)
            },
            rt = function(e, t) {
                n(1 / 0 !== Math.abs(e.x) && 1 / 0 !== Math.abs(e.y), t)
            },
            ot = function(e, t) {
                at(e, t), rt(e, t)
            };
        st.prototype.sanityCheck = function() {
            n(this.m === this.m && this.m_inv === this.m_inv, "Body's mass is invalid."), n(this.i === this.i && this.i_inv === this.i_inv, "Body's moment is invalid."), ot(this.p, "Body's position is invalid."), ot(this.f, "Body's force is invalid."), n(this.vx === this.vx && 1 / 0 !== Math.abs(this.vx), "Body's velocity is invalid."), n(this.vy === this.vy && 1 / 0 !== Math.abs(this.vy), "Body's velocity is invalid."), n(this.a === this.a && 1 / 0 !== Math.abs(this.a), "Body's angle is invalid."), n(this.w === this.w && 1 / 0 !== Math.abs(this.w), "Body's angular velocity is invalid."), n(this.t === this.t && 1 / 0 !== Math.abs(this.t), "Body's torque is invalid."), ot(this.rot, "Body's rotation vector is invalid."), n(this.v_limit === this.v_limit, "Body's velocity limit is invalid."), n(this.w_limit === this.w_limit, "Body's angular velocity limit is invalid.")
        }
    } else st.prototype.sanityCheck = function() {};
    st.prototype.getPos = function() {
        return this.p
    }, st.prototype.getVel = function() {
        return new m(this.vx, this.vy)
    }, st.prototype.getAngVel = function() {
        return this.w
    }, st.prototype.isSleeping = function() {
        return null !== this.nodeRoot
    }, st.prototype.isStatic = function() {
        return 1 / 0 === this.nodeIdleTime
    }, st.prototype.isRogue = function() {
        return null === this.space
    }, st.prototype.setMass = function(e) {
        n(e > 0, "Mass must be positive and non-zero."), this.activate(), this.m = e, this.m_inv = 1 / e
    }, st.prototype.setMoment = function(e) {
        n(e > 0, "Moment of Inertia must be positive and non-zero."), this.activate(), this.i = e, this.i_inv = 1 / e
    }, st.prototype.addShape = function(e) {
        this.shapeList.push(e)
    }, st.prototype.removeShape = function(e) {
        l(this.shapeList, e)
    };
    var lt = function(e, t, i) {
        return e === i ? e.next(t) : (e.a === t ? e.next_a = lt(e.next_a, t, i) : e.next_b = lt(e.next_b, t, i), e)
    };
    st.prototype.removeConstraint = function(e) {
        this.constraintList = lt(this.constraintList, this, e)
    }, st.prototype.setPos = function(t) {
        this.activate(), this.sanityCheck(), t === T && (t = e.v(0, 0)), this.p = t
    }, st.prototype.setVel = function(e) {
        this.activate(), this.vx = e.x, this.vy = e.y
    }, st.prototype.setAngVel = function(e) {
        this.activate(), this.w = e
    }, st.prototype.setAngleInternal = function(e) {
        n(!isNaN(e), "Internal Error: Attempting to set body's angle to NaN"), this.a = e, this.rot.x = Math.cos(e), this.rot.y = Math.sin(e)
    }, st.prototype.setAngle = function(e) {
        this.activate(), this.sanityCheck(), this.setAngleInternal(e)
    }, st.prototype.velocity_func = function(e, t, i) {
        var n = this.vx * t + (e.x + this.f.x * this.m_inv) * i,
            s = this.vy * t + (e.y + this.additGrav + this.f.y * this.m_inv) * i,
            a = this.v_limit,
            r = n * n + s * s,
            o = r > a * a ? a / Math.sqrt(r) : 1;
        this.vx = n * o, this.vy = s * o;
        var l = this.w_limit;
        this.w = v(this.w * t + this.t * this.i_inv * i, -l, l), this.sanityCheck()
    }, st.prototype.position_func = function(e) {
        this.p.x += (this.vx + this.v_biasx) * e, this.p.y += (this.vy + this.v_biasy) * e, this.setAngleInternal(this.a + (this.w + this.w_bias) * e), this.v_biasx = this.v_biasy = 0, this.w_bias = 0, this.sanityCheck()
    }, st.prototype.resetForces = function() {
        this.activate(), this.f = new m(0, 0), this.t = 0
    }, st.prototype.applyForce = function(e, t) {
        this.activate(), this.f = P(this.f, e), this.t += B(t, e)
    }, st.prototype.applyImpulse = function(e, t) {
        this.activate(), ci(this, e.x, e.y, t)
    }, st.prototype.getVelAtPoint = function(e) {
        return P(new m(this.vx, this.vy), C(L(e), this.w))
    }, st.prototype.getVelAtWorldPoint = function(e) {
        return this.getVelAtPoint(A(e, this.p))
    }, st.prototype.getVelAtLocalPoint = function(e) {
        return this.getVelAtPoint(I(e, this.rot))
    }, st.prototype.eachShape = function(e) {
        for (var t = 0, i = this.shapeList.length; i > t; t++) e(this.shapeList[t])
    }, st.prototype.eachConstraint = function(e) {
        for (var t = this.constraintList; t;) {
            var i = t.next(this);
            e(t), t = i
        }
    }, st.prototype.eachArbiter = function(e) {
        for (var t = this.arbiterList; t;) {
            var i = t.next(this);
            t.swappedColl = this === t.body_b, e(t), t = i
        }
    }, st.prototype.local2World = function(e) {
        return P(this.p, I(e, this.rot))
    }, st.prototype.world2Local = function(e) {
        return x(A(e, this.p), this.rot)
    }, st.prototype.kineticEnergy = function() {
        var e = this.vx * this.vx + this.vy * this.vy,
            t = this.w * this.w;
        return (e ? e * this.m : 0) + (t ? t * this.i : 0)
    };
    var ht = e.SpatialIndex = function(e) {
        if (this.staticIndex = e, e) {
            if (e.dynamicIndex) throw new Error("This static index is already associated with a dynamic index.");
            e.dynamicIndex = this
        }
    };
    ht.prototype.collideStatic = function(e, t) {
        if (e.count > 0) {
            var i = e.query;
            this.each(function(e) {
                i(e, new G(e.bb_l, e.bb_b, e.bb_r, e.bb_t), t)
            })
        }
    };
    var ct = e.BBTree = function(e) {
        ht.call(this, e), this.velocityFunc = null, this.leaves = {}, this.count = 0, this.root = null, this.pooledNodes = null, this.pooledPairs = null, this.stamp = 0
    };
    ct.prototype = Object.create(ht.prototype);
    var ut = 0,
        dt = function(e, n, s) {
            this.obj = null, this.bb_l = t(n.bb_l, s.bb_l), this.bb_b = t(n.bb_b, s.bb_b), this.bb_r = i(n.bb_r, s.bb_r), this.bb_t = i(n.bb_t, s.bb_t), this.parent = null, this.setA(n), this.setB(s)
        };
    ct.prototype.makeNode = function(e, t) {
        var i = this.pooledNodes;
        return i ? (this.pooledNodes = i.parent, i.constructor(this, e, t), i) : (ut++, new dt(this, e, t))
    };
    var pt = 0,
        _t = function(e, t) {
            this.obj = t, e.getBB(t, this), this.parent = null, this.stamp = 1, this.pairs = null, pt++
        };
    ct.prototype.getBB = function(e, n) {
        var s = this.velocityFunc;
        if (s) {
            var a = .1,
                r = (e.bb_r - e.bb_l) * a,
                o = (e.bb_t - e.bb_b) * a,
                l = C(s(e), .1);
            n.bb_l = e.bb_l + t(-r, l.x), n.bb_b = e.bb_b + t(-o, l.y), n.bb_r = e.bb_r + i(r, l.x), n.bb_t = e.bb_t + i(o, l.y)
        } else n.bb_l = e.bb_l, n.bb_b = e.bb_b, n.bb_r = e.bb_r, n.bb_t = e.bb_t
    }, ct.prototype.getStamp = function() {
        var e = this.dynamicIndex;
        return e && e.stamp ? e.stamp : this.stamp
    }, ct.prototype.incrementStamp = function() {
        this.dynamicIndex && this.dynamicIndex.stamp ? this.dynamicIndex.stamp++ : this.stamp++
    };
    var vt = 0,
        ft = function(e, t, i, n) {
            this.prevA = null, this.leafA = e, this.nextA = t, this.prevB = null, this.leafB = i, this.nextB = n
        };
    ct.prototype.makePair = function(e, t, i, n) {
        var s = this.pooledPairs;
        return s ? (this.pooledPairs = s.prevA, s.prevA = null, s.leafA = e, s.nextA = t, s.prevB = null, s.leafB = i, s.nextB = n, s) : (vt++, new ft(e, t, i, n))
    }, ft.prototype.recycle = function(e) {
        this.prevA = e.pooledPairs, e.pooledPairs = this
    };
    var mt = function(e, t, i) {
        i && (i.leafA === t ? i.prevA = e : i.prevB = e), e ? e.leafA === t ? e.nextA = i : e.nextB = i : t.pairs = i
    };
    _t.prototype.clearPairs = function(e) {
        var t, i = this.pairs;
        for (this.pairs = null; i;) i.leafA === this ? (t = i.nextA, mt(i.prevB, i.leafB, i.nextB)) : (t = i.nextB, mt(i.prevA, i.leafA, i.nextA)), i.recycle(e), i = t
    };
    var Tt = function(e, t, i) {
        var n = e.pairs,
            s = t.pairs,
            a = i.makePair(e, n, t, s);
        e.pairs = t.pairs = a, n && (n.leafA === e ? n.prevA = a : n.prevB = a), s && (s.leafA === t ? s.prevA = a : s.prevB = a)
    };
    dt.prototype.recycle = function(e) {
        this.parent = e.pooledNodes, e.pooledNodes = this
    }, _t.prototype.recycle = function() {}, dt.prototype.setA = function(e) {
        this.A = e, e.parent = this
    }, dt.prototype.setB = function(e) {
        this.B = e, e.parent = this
    }, _t.prototype.isLeaf = !0, dt.prototype.isLeaf = !1, dt.prototype.otherChild = function(e) {
        return this.A == e ? this.B : this.A
    }, dt.prototype.replaceChild = function(e, n, a) {
        s(e == this.A || e == this.B, "Node is not a child of parent."), this.A == e ? (this.A.recycle(a), this.setA(n)) : (this.B.recycle(a), this.setB(n));
        for (var r = this; r; r = r.parent) {
            var o = r.A,
                l = r.B;
            r.bb_l = t(o.bb_l, l.bb_l), r.bb_b = t(o.bb_b, l.bb_b), r.bb_r = i(o.bb_r, l.bb_r), r.bb_t = i(o.bb_t, l.bb_t)
        }
    }, dt.prototype.bbArea = _t.prototype.bbArea = function() {
        return (this.bb_r - this.bb_l) * (this.bb_t - this.bb_b)
    };
    var gt = function(e, n) {
            return (i(e.bb_r, n.bb_r) - t(e.bb_l, n.bb_l)) * (i(e.bb_t, n.bb_t) - t(e.bb_b, n.bb_b))
        },
        St = function(e, t) {
            return Math.abs(e.bb_l + e.bb_r - t.bb_l - t.bb_r) + Math.abs(e.bb_b + e.bb_t - t.bb_b - t.bb_t)
        },
        Et = function(e, n, s) {
            if (null == e) return n;
            if (e.isLeaf) return s.makeNode(n, e);
            var a = e.B.bbArea() + gt(e.A, n),
                r = e.A.bbArea() + gt(e.B, n);
            return a === r && (a = St(e.A, n), r = St(e.B, n)), a > r ? e.setB(Et(e.B, n, s)) : e.setA(Et(e.A, n, s)), e.bb_l = t(e.bb_l, n.bb_l), e.bb_b = t(e.bb_b, n.bb_b), e.bb_r = i(e.bb_r, n.bb_r), e.bb_t = i(e.bb_t, n.bb_t), e
        };
    dt.prototype.intersectsBB = _t.prototype.intersectsBB = function(e) {
        return this.bb_l <= e.r && e.l <= this.bb_r && this.bb_b <= e.t && e.b <= this.bb_t
    };
    var yt = function(e, t, i) {
            e.intersectsBB(t) && (e.isLeaf ? i(e.obj) : (yt(e.A, t, i), yt(e.B, t, i)))
        },
        Pt = function(e, n, s) {
            var a = 1 / (s.x - n.x),
                r = e.bb_l == n.x ? -1 / 0 : (e.bb_l - n.x) * a,
                o = e.bb_r == n.x ? 1 / 0 : (e.bb_r - n.x) * a,
                l = t(r, o),
                h = i(r, o),
                c = 1 / (s.y - n.y),
                u = e.bb_b == n.y ? -1 / 0 : (e.bb_b - n.y) * c,
                d = e.bb_t == n.y ? 1 / 0 : (e.bb_t - n.y) * c,
                p = t(u, d),
                _ = i(u, d);
            if (h >= p && _ >= l) {
                var v = i(l, p),
                    f = t(h, _);
                if (f >= 0 && 1 >= v) return i(v, 0)
            }
            return 1 / 0
        },
        At = function(e, i, n, s, a) {
            if (e.isLeaf) return a(e.obj);
            var r = Pt(e.A, i, n),
                o = Pt(e.B, i, n);
            return o > r ? (s > r && (s = t(s, At(e.A, i, n, s, a))), s > o && (s = t(s, At(e.B, i, n, s, a)))) : (s > o && (s = t(s, At(e.B, i, n, s, a))), s > r && (s = t(s, At(e.A, i, n, s, a)))), s
        };
    ct.prototype.subtreeRecycle = function(e) {
        e.isLeaf && (this.subtreeRecycle(e.A), this.subtreeRecycle(e.B), e.recycle(this))
    };
    var bt = function(e, t, i) {
            if (t == e) return null;
            var n = t.parent;
            if (n == e) {
                var s = e.otherChild(t);
                return s.parent = e.parent, e.recycle(i), s
            }
            return n.parent.replaceChild(n, n.otherChild(t), i), e
        },
        Ct = function(e, t) {
            return e.bb_l <= t.bb_r && t.bb_l <= e.bb_r && e.bb_b <= t.bb_t && t.bb_b <= e.bb_t
        };
    _t.prototype.markLeafQuery = function(e, t, i, n) {
        Ct(e, this) && (t ? Tt(e, this, i) : (this.stamp < e.stamp && Tt(this, e, i), n && n(e.obj, this.obj)))
    }, dt.prototype.markLeafQuery = function(e, t, i, n) {
        Ct(e, this) && (this.A.markLeafQuery(e, t, i, n), this.B.markLeafQuery(e, t, i, n))
    }, _t.prototype.markSubtree = function(e, t, i) {
        if (this.stamp == e.getStamp()) {
            t && t.markLeafQuery(this, !1, e, i);
            for (var n = this; n.parent; n = n.parent) n == n.parent.A ? n.parent.B.markLeafQuery(this, !0, e, i) : n.parent.A.markLeafQuery(this, !1, e, i)
        } else
            for (var s = this.pairs; s;) this === s.leafB ? (i && i(s.leafA.obj, this.obj), s = s.nextB) : s = s.nextA
    }, dt.prototype.markSubtree = function(e, t, i) {
        this.A.markSubtree(e, t, i), this.B.markSubtree(e, t, i)
    }, _t.prototype.containsObj = function(e) {
        return this.bb_l <= e.bb_l && this.bb_r >= e.bb_r && this.bb_b <= e.bb_b && this.bb_t >= e.bb_t
    }, _t.prototype.update = function(e) {
        var t = e.root,
            i = this.obj;
        return this.containsObj(i) ? !1 : (e.getBB(this.obj, this), t = bt(t, this, e), e.root = Et(t, this, e), this.clearPairs(e), this.stamp = e.getStamp(), !0)
    }, _t.prototype.addPairs = function(e) {
        var t = e.dynamicIndex;
        if (t) {
            var i = t.root;
            i && i.markLeafQuery(this, !0, t, null)
        } else {
            var n = e.staticIndex.root;
            this.markSubtree(e, n, null)
        }
    }, ct.prototype.insert = function(e, t) {
        var i = new _t(this, e);
        this.leaves[t] = i, this.root = Et(this.root, i, this), this.count++, i.stamp = this.getStamp(), i.addPairs(this), this.incrementStamp()
    }, ct.prototype.remove = function(e, t) {
        var i = this.leaves[t];
        delete this.leaves[t], this.root = bt(this.root, i, this), this.count--, i.clearPairs(this), i.recycle(this)
    }, ct.prototype.contains = function(e, t) {
        return null != this.leaves[t]
    };
    var Bt = function() {};
    ct.prototype.reindexQuery = function(e) {
        if (this.root) {
            var t, i = this.leaves;
            for (t in i) i[t].update(this);
            var n = this.staticIndex,
                s = n && n.root;
            this.root.markSubtree(this, s, e), n && !s && this.collideStatic(this, n, e), this.incrementStamp()
        }
    }, ct.prototype.reindex = function() {
        this.reindexQuery(Bt)
    }, ct.prototype.reindexObject = function(e, t) {
        var i = this.leaves[t];
        i && (i.update(this) && i.addPairs(this), this.incrementStamp())
    }, ct.prototype.pointQuery = function(e, t) {
        this.query(new G(e.x, e.y, e.x, e.y), t)
    }, ct.prototype.segmentQuery = function(e, t, i, n) {
        this.root && At(this.root, e, t, i, n)
    }, ct.prototype.query = function(e, t) {
        this.root && yt(this.root, e, t)
    }, ct.prototype.count = function() {
        return this.count
    }, ct.prototype.each = function(e) {
        var t;
        for (t in this.leaves) e(this.leaves[t].obj)
    };
    var wt = function(e, n, s, a, r) {
            return (i(e.bb_r, a) - t(e.bb_l, n)) * (i(e.bb_t, r) - t(e.bb_b, s))
        },
        Lt = function(e, n, s, a) {
            if (1 == a) return n[s];
            if (2 == a) return e.makeNode(n[s], n[s + 1]);
            for (var r = n[s], o = r.bb_l, l = r.bb_b, h = r.bb_r, c = r.bb_t, u = s + a, d = s + 1; u > d; d++) r = n[d], o = t(o, r.bb_l), l = t(l, r.bb_b), h = i(h, r.bb_r), c = i(c, r.bb_t);
            var p = h - o > c - l,
                _ = new Array(2 * a);
            if (p)
                for (var d = s; u > d; d++) _[2 * d + 0] = n[d].bb_l, _[2 * d + 1] = n[d].bb_r;
            else
                for (var d = s; u > d; d++) _[2 * d + 0] = n[d].bb_b, _[2 * d + 1] = n[d].bb_t;
            _.sort(function(e, t) {
                return e - t
            });
            var v = .5 * (_[a - 1] + _[a]),
                f = o,
                m = l,
                T = h,
                g = c,
                S = o,
                E = l,
                y = h,
                P = c;
            p ? T = S = v : g = E = v;
            for (var A = u, b = s; A > b;) {
                var r = n[b];
                wt(r, S, E, y, P) < wt(r, f, m, T, g) ? (A--, n[b] = n[A], n[A] = r) : b++
            }
            if (A == a) {
                for (var r = null, d = s; u > d; d++) r = Et(r, n[d], e);
                return r
            }
            return NodeNew(e, Lt(e, n, s, A - s), Lt(e, n, A, u - A))
        };
    ct.prototype.optimize = function() {
        var e = new Array(this.count),
            t = 0;
        for (var i in this.leaves) e[t++] = this.nodes[i];
        tree.subtreeRecycle(root), this.root = Lt(tree, e, e.length)
    };
    var Ot = function(e, t) {
        !e.isLeaf && 10 >= t && (Ot(e.A, t + 1), Ot(e.B, t + 1));
        for (var i = "", n = 0; t > n; n++) i += " ";
        console.log(i + e.bb_b + " " + e.bb_t)
    };
    ct.prototype.log = function() {
        this.root && Ot(this.root, 0)
    };
    var It = e.CollisionHandler = function() {
        this.a = this.b = 0
    };
    It.prototype.begin = function() {
        return !0
    }, It.prototype.preSolve = function() {
        return !0
    }, It.prototype.postSolve = function() {}, It.prototype.separate = function() {};
    var xt = function(e, t) {
        this.e = 0, this.u = 0, this.surface_vr = T, this.a = e, this.body_a = e.body, this.b = t, this.body_b = t.body, this.thread_a_next = this.thread_a_prev = null, this.thread_b_next = this.thread_b_prev = null, this.contacts = null, this.stamp = 0, this.handler = null, this.swappedColl = !1, this.state = "first coll"
    };
    xt.prototype.getShapes = function() {
        return this.swappedColl ? [this.b, this.a] : [this.a, this.b]
    }, xt.prototype.totalImpulse = function() {
        for (var e = this.contacts, t = new m(0, 0), i = 0, n = e.length; n > i; i++) {
            var s = e[i];
            t.add(C(s.n, s.jnAcc))
        }
        return this.swappedColl ? t : t.neg()
    }, xt.prototype.totalImpulseWithFriction = function() {
        for (var e = this.contacts, t = new m(0, 0), i = 0, n = e.length; n > i; i++) {
            var s = e[i];
            t.add(new m(s.jnAcc, s.jtAcc).rotate(s.n))
        }
        return this.swappedColl ? t : t.neg()
    }, xt.prototype.totalKE = function() {
        for (var e = (1 - this.e) / (1 + this.e), t = 0, i = this.contacts, n = 0, s = i.length; s > n; n++) {
            var a = i[n],
                r = a.jnAcc,
                o = a.jtAcc;
            t += e * r * r / a.nMass + o * o / a.tMass
        }
        return t
    }, xt.prototype.ignore = function() {
        this.state = "ignore"
    }, xt.prototype.getA = function() {
        return this.swappedColl ? this.b : this.a
    }, xt.prototype.getB = function() {
        return this.swappedColl ? this.a : this.b
    }, xt.prototype.isFirstContact = function() {
        return "first coll" === this.state
    };
    var Yt = function(e, t, i) {
        this.point = e, this.normal = t, this.dist = i
    };
    xt.prototype.getContactPointSet = function() {
        var e, t = new Array(this.contacts.length);
        for (e = 0; e < t.length; e++) t[e] = new Yt(this.contacts[e].p, this.contacts[e].n, this.contacts[e].dist);
        return t
    }, xt.prototype.getNormal = function(e) {
        var t = this.contacts[e].n;
        return this.swappedColl ? b(t) : t
    }, xt.prototype.getPoint = function(e) {
        return this.contacts[e].p
    }, xt.prototype.getDepth = function(e) {
        return this.contacts[e].dist
    };
    var Mt = function(e, t, i, n) {
        i ? i.body_a === t ? i.thread_a_next = n : i.thread_b_next = n : t.arbiterList = n, n && (n.body_a === t ? n.thread_a_prev = i : n.thread_b_prev = i)
    };
    xt.prototype.unthread = function() {
        Mt(this, this.body_a, this.thread_a_prev, this.thread_a_next), Mt(this, this.body_b, this.thread_b_prev, this.thread_b_next), this.thread_a_prev = this.thread_a_next = null, this.thread_b_prev = this.thread_b_next = null
    }, xt.prototype.update = function(e, t, i, n) {
        if (this.contacts)
            for (var s = 0; s < this.contacts.length; s++)
                for (var a = this.contacts[s], r = 0; r < e.length; r++) {
                    var o = e[r];
                    o.hash === a.hash && (o.jnAcc = a.jnAcc, o.jtAcc = a.jtAcc)
                }
        this.contacts = e, this.handler = t, this.swappedColl = i.collision_type !== t.a, this.e = i.e * n.e, this.u = i.u * n.u, this.surface_vr = A(i.surface_v, n.surface_v), this.a = i, this.body_a = i.body, this.b = n, this.body_b = n.body, "cached" == this.state && (this.state = "first coll")
    }, xt.prototype.preStep = function(e, i, n) {
        for (var s = this.body_a, a = this.body_b, r = 0; r < this.contacts.length; r++) {
            var o = this.contacts[r];
            o.r1 = A(o.p, s.p), o.r2 = A(o.p, a.p), o.nMass = 1 / _i(s, a, o.r1, o.r2, o.n), o.tMass = 1 / _i(s, a, o.r1, o.r2, L(o.n)), o.bias = -n * t(0, o.dist + i) / e, o.jBias = 0, o.bounce = hi(s, a, o.r1, o.r2, o.n) * this.e
        }
    }, xt.prototype.applyCachedImpulse = function(e) {
        if (!this.isFirstContact())
            for (var t = this.body_a, i = this.body_b, n = 0; n < this.contacts.length; n++) {
                var s = this.contacts[n],
                    a = s.n.x,
                    r = s.n.y,
                    o = a * s.jnAcc - r * s.jtAcc,
                    l = a * s.jtAcc + r * s.jnAcc;
                ui(t, i, s.r1, s.r2, o * e, l * e)
            }
    };
    var Rt = 0,
        Nt = 0;
    xt.prototype.applyImpulse = function() {
        Rt++;
        for (var e = this.body_a, t = this.body_b, n = this.surface_vr, s = this.u, a = 0; a < this.contacts.length; a++) {
            Nt++;
            var r = this.contacts[a],
                o = r.nMass,
                l = r.n,
                h = r.r1,
                c = r.r2,
                u = t.vx - c.y * t.w - (e.vx - h.y * e.w),
                d = t.vy + c.x * t.w - (e.vy + h.x * e.w),
                p = l.x * (t.v_biasx - c.y * t.w_bias - e.v_biasx + h.y * e.w_bias) + l.y * (c.x * t.w_bias + t.v_biasy - h.x * e.w_bias - e.v_biasy),
                _ = S(u, d, l.x, l.y),
                f = S(u + n.x, d + n.y, -l.y, l.x),
                m = (r.bias - p) * o,
                T = r.jBias;
            r.jBias = i(T + m, 0);
            var g = -(r.bounce + _) * o,
                E = r.jnAcc;
            r.jnAcc = i(E + g, 0);
            var y = s * r.jnAcc,
                P = -f * r.tMass,
                A = r.jtAcc;
            r.jtAcc = v(A + P, -y, y);
            var b = l.x * (r.jBias - T),
                C = l.y * (r.jBias - T);
            di(e, -b, -C, h), di(t, b, C, c);
            var B = r.jnAcc - E,
                w = r.jtAcc - A;
            ui(e, t, h, c, l.x * B - l.y * w, l.x * w + l.y * B)
        }
    }, xt.prototype.callSeparate = function(e) {
        var t = e.lookupHandler(this.a.collision_type, this.b.collision_type);
        t.separate(this, e)
    }, xt.prototype.next = function(e) {
        return this.body_a == e ? this.thread_a_next : this.thread_b_next
    };
    var Dt = 0,
        jt = function(e, t, i, n) {
            this.p = e, this.n = t, this.dist = i, this.r1 = this.r2 = T, this.nMass = this.tMass = this.bounce = this.bias = 0, this.jnAcc = this.jtAcc = this.jBias = 0, this.hash = n, Dt++
        },
        kt = [],
        Ht = function(e, t, i, n) {
            var s = i + n,
                a = A(t, e),
                r = Y(a);
            if (!(r >= s * s)) {
                var o = Math.sqrt(r);
                return new jt(P(e, C(a, .5 + (i - .5 * s) / (o ? o : 1 / 0))), o ? C(a, 1 / o) : new m(1, 0), o - s, 0)
            }
        },
        Ft = function(e, t) {
            var i = Ht(e.tc, t.tc, e.r, t.r);
            return i ? [i] : kt
        },
        Ut = function(e, t) {
            var i = t.ta,
                n = t.tb,
                s = e.tc,
                a = A(n, i),
                r = f(g(a, A(s, i)) / Y(a)),
                o = P(i, C(a, r)),
                l = Ht(s, o, e.r, t.r);
            if (l) {
                var h = l.n;
                return 0 === r && g(h, t.a_tangent) < 0 || 1 === r && g(h, t.b_tangent) < 0 ? kt : [l]
            }
            return kt
        },
        Gt = 0,
        Xt = function(e, t) {
            var i = 0,
                n = e.valueOnAxis(t[0].n, t[0].d);
            if (n > 0) return -1;
            for (var s = 1; s < t.length; s++) {
                var a = e.valueOnAxis(t[s].n, t[s].d);
                if (a > 0) return -1;
                a > n && (n = a, i = s)
            }
            return Gt = n, i
        },
        Kt = function(e, t, i, n) {
            for (var s = [], a = e.tVerts, r = 0; r < a.length; r += 2) {
                var l = a[r],
                    h = a[r + 1];
                t.containsVertPartial(l, h, b(i)) && s.push(new jt(new m(l, h), i, n, o(e.hashid, r)))
            }
            for (var c = t.tVerts, r = 0; r < c.length; r += 2) {
                var l = c[r],
                    h = c[r + 1];
                e.containsVertPartial(l, h, i) && s.push(new jt(new m(l, h), i, n, o(t.hashid, r)))
            }
            return s
        },
        Vt = function(e, t, i, n) {
            for (var s = [], a = e.tVerts, r = 0; r < a.length; r += 2) {
                var l = a[r],
                    h = a[r + 1];
                t.containsVert(l, h) && s.push(new jt(new m(l, h), i, n, o(e.hashid, r >> 1)))
            }
            for (var c = t.tVerts, r = 0; r < c.length; r += 2) {
                var l = c[r],
                    h = c[r + 1];
                e.containsVert(l, h) && s.push(new jt(new m(l, h), i, n, o(t.hashid, r >> 1)))
            }
            return s.length ? s : Kt(e, t, i, n)
        },
        Wt = function(e, t) {
            var i = Xt(t, e.tPlanes);
            if (-1 == i) return kt;
            var n = Gt,
                s = Xt(e, t.tPlanes);
            if (-1 == s) return kt;
            var a = Gt;
            return n > a ? Vt(e, t, e.tPlanes[i].n, n) : Vt(e, t, b(t.tPlanes[s].n), a)
        },
        zt = function(e, i, n) {
            var s = g(i, e.ta) - e.r,
                a = g(i, e.tb) - e.r;
            return t(s, a) - n
        },
        Qt = function(e, t, i, n, s) {
            for (var a = B(t.tn, t.ta), r = B(t.tn, t.tb), l = C(t.tn, s), h = i.tVerts, c = 0; c < h.length; c += 2) {
                var u = h[c],
                    d = h[c + 1];
                if (S(u, d, l.x, l.y) < g(t.tn, t.ta) * s + t.r) {
                    var p = w(t.tn.x, t.tn.y, u, d);
                    a >= p && p >= r && e.push(new jt(new m(u, d), l, n, o(i.hashid, c)))
                }
            }
        },
        Jt = function(e, t) {
            var i = [],
                n = t.tPlanes,
                s = n.length,
                a = g(e.tn, e.ta),
                r = t.valueOnAxis(e.tn, a) - e.r,
                l = t.valueOnAxis(b(e.tn), -a) - e.r;
            if (l > 0 || r > 0) return kt;
            var h = 0,
                c = zt(e, n[0].n, n[0].d);
            if (c > 0) return kt;
            for (var u = 0; s > u; u++) {
                var d = zt(e, n[u].n, n[u].d);
                if (d > 0) return kt;
                d > c && (c = d, h = u)
            }
            var p = b(n[h].n),
                _ = P(e.ta, C(p, e.r)),
                v = P(e.tb, C(p, e.r));
            if (t.containsVert(_.x, _.y) && i.push(new jt(_, p, c, o(e.hashid, 0))), t.containsVert(v.x, v.y) && i.push(new jt(v, p, c, o(e.hashid, 1))), (r >= c || l >= c) && (r > l ? Qt(i, e, t, r, 1) : Qt(i, e, t, l, -1)), 0 === i.length) {
                var f, T = 2 * h,
                    S = t.tVerts,
                    E = new m(S[T], S[T + 1]);
                if (f = Ht(e.ta, E, e.r, 0, i)) return [f];
                if (f = Ht(e.tb, E, e.r, 0, i)) return [f];
                var y = 2 * s,
                    A = new m(S[(T + 2) % y], S[(T + 3) % y]);
                if (f = Ht(e.ta, A, e.r, 0, i)) return [f];
                if (f = Ht(e.tb, A, e.r, 0, i)) return [f]
            }
            return i
        },
        qt = function(e, t) {
            for (var i = t.tPlanes, n = 0, s = g(i[0].n, e.tc) - i[0].d - e.r, a = 0; a < i.length; a++) {
                var r = g(i[a].n, e.tc) - i[a].d - e.r;
                if (r > 0) return kt;
                r > s && (s = r, n = a)
            }
            var o = i[n].n,
                l = t.tVerts,
                h = l.length,
                c = n << 1,
                u = l[c],
                d = l[c + 1],
                p = l[(c + 2) % h],
                _ = l[(c + 3) % h],
                v = w(o.x, o.y, u, d),
                f = w(o.x, o.y, p, _),
                T = B(o, e.tc);
            if (f > T) {
                var S = Ht(e.tc, new m(p, _), e.r, 0, S);
                return S ? [S] : kt
            }
            if (v > T) return [new jt(A(e.tc, C(o, e.r + s / 2)), b(o), s, 0)];
            var S = Ht(e.tc, new m(u, d), e.r, 0, S);
            return S ? [S] : kt
        };
    q.prototype.collisionCode = 0, $.prototype.collisionCode = 1, tt.prototype.collisionCode = 2, q.prototype.collisionTable = [Ft, Ut, qt], $.prototype.collisionTable = [null, function() {
        return kt
    }, Jt], tt.prototype.collisionTable = [null, null, Wt];
    var Zt = e.collideShapes = function(e, t) {
            return n(e.collisionCode <= t.collisionCode, "Collided shapes must be sorted by type"), e.collisionTable[t.collisionCode](e, t)
        },
        $t = new It,
        ei = e.Space = function() {
            this.stamp = 0, this.curr_dt = 0, this.bodies = [], this.rousedBodies = [], this.sleepingComponents = [], this.staticShapes = new ct(null), this.activeShapes = new ct(this.staticShapes), this.arbiters = [], this.contactBuffersHead = null, this.cachedArbiters = {}, this.constraints = [], this.locked = 0, this.collisionHandlers = {}, this.defaultHandler = $t, this.postStepCallbacks = [], this.iterations = 10, this.gravity = T, this.damping = 1, this.idleSpeedThreshold = 0, this.sleepTimeThreshold = 1 / 0, this.collisionSlop = .1, this.collisionBias = Math.pow(.9, 60), this.collisionPersistence = 3, this.enableContactGraph = !1, this.staticBody = new st(1 / 0, 1 / 0), this.staticBody.nodeIdleTime = 1 / 0, this.collideShapes = this.makeCollideShapes()
        };
    ei.prototype.getCurrentTimeStep = function() {
        return this.curr_dt
    }, ei.prototype.setIterations = function(e) {
        this.iterations = e
    }, ei.prototype.isLocked = function() {
        return this.locked
    };
    var ti = function(e) {
        n(!e.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep()  or during a query. Put these calls into a post-step callback.")
    };
    ei.prototype.addCollisionHandler = function(e, t, i, n, s, a) {
        ti(this), this.removeCollisionHandler(e, t);
        var r = new It;
        r.a = e, r.b = t, i && (r.begin = i), n && (r.preSolve = n), s && (r.postSolve = s), a && (r.separate = a), this.collisionHandlers[o(e, t)] = r
    }, ei.prototype.removeCollisionHandler = function(e, t) {
        ti(this), delete this.collisionHandlers[o(e, t)]
    }, ei.prototype.setDefaultCollisionHandler = function(e, t, i, n) {
        ti(this);
        var s = new It;
        e && (s.begin = e), t && (s.preSolve = t), i && (s.postSolve = i), n && (s.separate = n), this.defaultHandler = s
    }, ei.prototype.lookupHandler = function(e, t) {
        return this.collisionHandlers[o(e, t)] || this.defaultHandler
    }, ei.prototype.addShape = function(e) {
        var t = e.body;
        return t.isStatic() ? this.addStaticShape(e) : (n(!e.space, "This shape is already added to a space and cannot be added to another."), ti(this), t.activate(), t.addShape(e), e.update(t.p, t.rot), this.activeShapes.insert(e, e.hashid), e.space = this, e)
    }, ei.prototype.addStaticShape = function(e) {
        n(!e.space, "This shape is already added to a space and cannot be added to another."), ti(this);
        var t = e.body;
        return t.addShape(e), e.update(t.p, t.rot), this.staticShapes.insert(e, e.hashid), e.space = this, e
    }, ei.prototype.addBody = function(e) {
        return n(!e.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated."), n(!e.space, "This body is already added to a space and cannot be added to another."), ti(this), this.bodies.push(e), e.space = this, e
    }, ei.prototype.addConstraint = function(e) {
        n(!e.space, "This shape is already added to a space and cannot be added to another."), ti(this);
        var t = e.a,
            i = e.b;
        return t.activate(), i.activate(), this.constraints.push(e), e.next_a = t.constraintList, t.constraintList = e, e.next_b = i.constraintList, i.constraintList = e, e.space = this, e
    }, ei.prototype.filterArbiters = function(e, t) {
        for (var i in this.cachedArbiters) {
            var n = this.cachedArbiters[i];
            (e === n.body_a && (t === n.a || null === t) || e === n.body_b && (t === n.b || null === t)) && (t && "cached" !== n.state && n.callSeparate(this), n.unthread(), l(this.arbiters, n), delete this.cachedArbiters[i])
        }
    }, ei.prototype.removeShape = function(e) {
        var t = e.body;
        t.isStatic() ? this.removeStaticShape(e) : (n(this.containsShape(e), "Cannot remove a shape that was not added to the space. (Removed twice maybe?)"), ti(this), t.activate(), t.removeShape(e), this.filterArbiters(t, e), this.activeShapes.remove(e, e.hashid), e.space = null)
    }, ei.prototype.removeStaticShape = function(e) {
        n(this.containsShape(e), "Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)"), ti(this);
        var t = e.body;
        t.isStatic() && t.activateStatic(e), t.removeShape(e), this.filterArbiters(t, e), this.staticShapes.remove(e, e.hashid), e.space = null
    }, ei.prototype.removeBody = function(e) {
        n(this.containsBody(e), "Cannot remove a body that was not added to the space. (Removed twice maybe?)"), ti(this), e.activate(), l(this.bodies, e), e.space = null
    }, ei.prototype.removeConstraint = function(e) {
        n(this.containsConstraint(e), "Cannot remove a constraint that was not added to the space. (Removed twice maybe?)"), ti(this), e.a.activate(), e.b.activate(), l(this.constraints, e), e.a.removeConstraint(e), e.b.removeConstraint(e), e.space = null
    }, ei.prototype.containsShape = function(e) {
        return e.space === this
    }, ei.prototype.containsBody = function(e) {
        return e.space == this
    }, ei.prototype.containsConstraint = function(e) {
        return e.space == this
    }, ei.prototype.uncacheArbiter = function(e) {
        delete this.cachedArbiters[o(e.a.hashid, e.b.hashid)], l(this.arbiters, e)
    }, ei.prototype.eachBody = function(e) {
        this.lock();
        for (var t = this.bodies, i = 0; i < t.length; i++) e(t[i]);
        for (var n = this.sleepingComponents, i = 0; i < n.length; i++)
            for (var s = n[i], a = s; a;) {
                var r = a.nodeNext;
                e(a), a = r
            }
        this.unlock(!0)
    }, ei.prototype.eachShape = function(e) {
        this.lock(), this.activeShapes.each(e), this.staticShapes.each(e), this.unlock(!0)
    }, ei.prototype.eachConstraint = function(e) {
        this.lock();
        for (var t = this.constraints, i = 0; i < t.length; i++) e(t[i]);
        this.unlock(!0)
    }, ei.prototype.reindexStatic = function() {
        n(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete."), this.staticShapes.each(function(e) {
            var t = e.body;
            e.update(t.p, t.rot)
        }), this.staticShapes.reindex()
    }, ei.prototype.reindexShape = function(e) {
        n(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
        var t = e.body;
        e.update(t.p, t.rot), this.activeShapes.reindexObject(e, e.hashid), this.staticShapes.reindexObject(e, e.hashid)
    }, ei.prototype.reindexShapesForBody = function(e) {
        for (var t = e.shapeList; t; t = t.next) this.reindexShape(t)
    }, ei.prototype.useSpatialHash = function(e, t) {
        throw new Error("Spatial Hash not implemented.")
    }, ei.prototype.activateBody = function(e) {
        if (n(!e.isRogue(), "Internal error: Attempting to activate a rogue body."), this.locked) - 1 === this.rousedBodies.indexOf(e) && this.rousedBodies.push(e);
        else {
            this.bodies.push(e);
            for (var t = 0; t < e.shapeList.length; t++) {
                var i = e.shapeList[t];
                this.staticShapes.remove(i, i.hashid), this.activeShapes.insert(i, i.hashid)
            }
            for (var s = e.arbiterList; s; s = s.next(e)) {
                var a = s.body_a;
                if (e === a || a.isStatic()) {
                    var r = s.a,
                        l = s.b;
                    this.cachedArbiters[o(r.hashid, l.hashid)] = s, s.stamp = this.stamp, s.handler = this.lookupHandler(r.collision_type, l.collision_type), this.arbiters.push(s)
                }
            }
            for (var h = e.constraintList; h; h = h.nodeNext) {
                var a = h.a;
                (e === a || a.isStatic()) && this.constraints.push(h)
            }
        }
    }, ei.prototype.deactivateBody = function(e) {
        n(!e.isRogue(), "Internal error: Attempting to deactivate a rogue body."), l(this.bodies, e);
        for (var t = 0; t < e.shapeList.length; t++) {
            var i = e.shapeList[t];
            this.activeShapes.remove(i, i.hashid), this.staticShapes.insert(i, i.hashid)
        }
        for (var s = e.arbiterList; s; s = s.next(e)) {
            var a = s.body_a;
            (e === a || a.isStatic()) && this.uncacheArbiter(s)
        }
        for (var r = e.constraintList; r; r = r.nodeNext) {
            var a = r.a;
            (e === a || a.isStatic()) && l(this.constraints, r)
        }
    };
    var ii = function(e) {
            return e ? e.nodeRoot : null
        },
        ni = function(e) {
            if (e && e.isSleeping(e)) {
                n(!e.isRogue(), "Internal Error: componentActivate() called on a rogue body.");
                for (var t = e.space, i = e; i;) {
                    var s = i.nodeNext;
                    i.nodeIdleTime = 0, i.nodeRoot = null, i.nodeNext = null, t.activateBody(i), i = s
                }
                l(t.sleepingComponents, e)
            }
        };
    st.prototype.activate = function() {
        this.isRogue() || (this.nodeIdleTime = 0, ni(ii(this)))
    }, st.prototype.activateStatic = function(e) {
        n(this.isStatic(), "Body.activateStatic() called on a non-static body.");
        for (var t = this.arbiterList; t; t = t.next(this)) e && e != t.a && e != t.b || (t.body_a == this ? t.body_b : t.body_a).activate()
    }, st.prototype.pushArbiter = function(e) {
        s(null === (e.body_a === this ? e.thread_a_next : e.thread_b_next), "Internal Error: Dangling contact graph pointers detected. (A)"), s(null === (e.body_a === this ? e.thread_a_prev : e.thread_b_prev), "Internal Error: Dangling contact graph pointers detected. (B)");
        var t = this.arbiterList;
        s(null === t || null === (t.body_a === this ? t.thread_a_prev : t.thread_b_prev), "Internal Error: Dangling contact graph pointers detected. (C)"), e.body_a === this ? e.thread_a_next = t : e.thread_b_next = t, t && (t.body_a === this ? t.thread_a_prev = e : t.thread_b_prev = e), this.arbiterList = e
    };
    var si = function(e, t) {
            t.nodeRoot = e, t !== e && (t.nodeNext = e.nodeNext, e.nodeNext = t)
        },
        ai = function(e, t) {
            if (!t.isRogue()) {
                var i = ii(t);
                if (null == i) {
                    si(e, t);
                    for (var n = t.arbiterList; n; n = n.next(t)) ai(e, t == n.body_a ? n.body_b : n.body_a);
                    for (var a = t.constraintList; a; a = a.next(t)) ai(e, t == a.a ? a.b : a.a)
                } else s(i === e, "Internal Error: Inconsistency detected in the contact graph.")
            }
        },
        ri = function(e, t) {
            for (var i = e; i; i = i.nodeNext)
                if (i.nodeIdleTime < t) return !0;
            return !1
        };
    ei.prototype.processComponents = function(e) {
        for (var t = 1 / 0 !== this.sleepTimeThreshold, i = this.bodies, n = 0; n < i.length; n++) {
            var a = i[n];
            s(null === a.nodeNext, "Internal Error: Dangling next pointer detected in contact graph."), s(null === a.nodeRoot, "Internal Error: Dangling root pointer detected in contact graph.")
        }
        if (t)
            for (var r = this.idleSpeedThreshold, o = r ? r * r : Y(this.gravity) * e * e, n = 0; n < i.length; n++) {
                var a = i[n],
                    l = o ? a.m * o : 0;
                a.nodeIdleTime = a.kineticEnergy() > l ? 0 : a.nodeIdleTime + e
            }
        for (var h = this.arbiters, n = 0, c = h.length; c > n; n++) {
            var u = h[n],
                d = u.body_a,
                p = u.body_b;
            t && ((p.isRogue() && !p.isStatic() || d.isSleeping()) && d.activate(), (d.isRogue() && !d.isStatic() || p.isSleeping()) && p.activate()), d.pushArbiter(u), p.pushArbiter(u)
        }
        if (t) {
            for (var _ = this.constraints, n = 0; n < _.length; n++) {
                var v = _[n],
                    d = v.a,
                    p = v.b;
                p.isRogue() && !p.isStatic() && d.activate(), d.isRogue() && !d.isStatic() && p.activate()
            }
            for (var n = 0; n < i.length;) {
                var a = i[n];
                if (null !== ii(a) || (ai(a, a), ri(a, this.sleepTimeThreshold))) n++, a.nodeRoot = null, a.nodeNext = null;
                else {
                    this.sleepingComponents.push(a);
                    for (var f = a; f; f = f.nodeNext) this.deactivateBody(f)
                }
            }
        }
    }, st.prototype.sleep = function() {
        this.sleepWithGroup(null)
    }, st.prototype.sleepWithGroup = function(e) {
        n(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");
        var t = this.space;
        if (n(t, "Cannot put a rogue body to sleep."), n(!t.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback."), n(null === e || e.isSleeping(), "Cannot use a non-sleeping body as a group identifier."), this.isSleeping()) return void n(ii(this) === ii(e), "The body is already sleeping and it's group cannot be reassigned.");
        for (var i = 0; i < this.shapeList.length; i++) this.shapeList[i].update(this.p, this.rot);
        if (t.deactivateBody(this), e) {
            var s = ii(e);
            this.nodeRoot = s, this.nodeNext = s.nodeNext, this.nodeIdleTime = 0, s.nodeNext = this
        } else this.nodeRoot = this, this.nodeNext = null, this.nodeIdleTime = 0, t.sleepingComponents.push(this);
        l(t.bodies, this)
    }, ei.prototype.activateShapesTouchingShape = function(e) {
        1 / 0 !== this.sleepTimeThreshold && this.shapeQuery(e, function(e) {
            e.body.activate()
        })
    }, ei.prototype.pointQuery = function(e, t, i, n) {
        var s = function(s) {
                (!s.group || i !== s.group) && t & s.layers && s.pointQuery(e) && n(s)
            },
            a = new G(e.x, e.y, e.x, e.y);
        this.lock(), this.activeShapes.query(a, s), this.staticShapes.query(a, s), this.unlock(!0)
    }, ei.prototype.pointQueryFirst = function(e, t, i) {
        var n = null;
        return this.pointQuery(e, t, i, function(e) {
            e.sensor || (n = e)
        }), n
    }, ei.prototype.nearestPointQuery = function(e, t, i, n, s) {
        var a = function(a) {
                if ((!a.group || n !== a.group) && i & a.layers) {
                    var r = a.nearestPointQuery(e);
                    r.d < t && s(a, r.d, r.p)
                }
            },
            r = X(e, t);
        this.lock(), this.activeShapes.query(r, a), this.staticShapes.query(r, a), this.unlock(!0)
    }, ei.prototype.nearestPointQueryNearest = function(e, t, i, n) {
        var s, a = function(a) {
                if ((!a.group || n !== a.group) && i & a.layers && !a.sensor) {
                    var r = a.nearestPointQuery(e);
                    r.d < t && (!s || r.d < s.d) && (s = r)
                }
            },
            r = X(e, t);
        return this.activeShapes.query(r, a), this.staticShapes.query(r, a), s
    }, ei.prototype.segmentQuery = function(e, t, i, n, s) {
        var a = function(a) {
            var r;
            return (!a.group || n !== a.group) && i & a.layers && (r = a.segmentQuery(e, t)) && s(a, r.t, r.n), 1
        };
        this.lock(), this.staticShapes.segmentQuery(e, t, 1, a), this.activeShapes.segmentQuery(e, t, 1, a), this.unlock(!0)
    }, ei.prototype.segmentQueryFirst = function(e, t, i, n) {
        var s = null,
            a = function(a) {
                var r;
                return (!a.group || n !== a.group) && i & a.layers && !a.sensor && (r = a.segmentQuery(e, t)) && (null === s || r.t < s.t) && (s = r), s ? s.t : 1
            };
        return this.staticShapes.segmentQuery(e, t, 1, a), this.activeShapes.segmentQuery(e, t, s ? s.t : 1, a), s
    }, ei.prototype.bbQuery = function(e, t, i, n) {
        var s = function(s) {
            (!s.group || i !== s.group) && t & s.layers && K(e, s.bb_l, s.bb_b, s.bb_r, s.bb_t) && n(s)
        };
        this.lock(), this.activeShapes.query(e, s), this.staticShapes.query(e, s), this.unlock(!0)
    }, ei.prototype.shapeQuery = function(e, t) {
        var i = e.body;
        i && e.update(i.p, i.rot);
        var n = new G(e.bb_l, e.bb_b, e.bb_r, e.bb_t),
            s = !1,
            a = function(i) {
                var n = e;
                if ((!n.group || n.group !== i.group) && n.layers & i.layers && n !== i) {
                    var a;
                    if (n.collisionCode <= i.collisionCode) a = Zt(n, i);
                    else {
                        a = Zt(i, n);
                        for (var r = 0; r < a.length; r++) a[r].n = b(a[r].n)
                    }
                    if (a.length && (s = !(n.sensor || i.sensor), t)) {
                        for (var o = new Array(a.length), r = 0; r < a.length; r++) o[r] = new Yt(a[r].p, a[r].n, a[r].dist);
                        t(i, o)
                    }
                }
            };
        return this.lock(), this.activeShapes.query(n, a), this.staticShapes.query(n, a), this.unlock(!0), s
    }, ei.prototype.addPostStepCallback = function(e) {
        s(this.locked, "Adding a post-step callback when the space is not locked is unnecessary. Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query."), this.postStepCallbacks.push(e)
    }, ei.prototype.runPostStepCallbacks = function() {
        for (var e = 0; e < this.postStepCallbacks.length; e++) this.postStepCallbacks[e]();
        this.postStepCallbacks = []
    }, ei.prototype.lock = function() {
        this.locked++
    }, ei.prototype.unlock = function(e) {
        if (this.locked--, n(this.locked >= 0, "Internal Error: Space lock underflow."), 0 === this.locked && e) {
            for (var t = this.rousedBodies, i = 0; i < t.length; i++) this.activateBody(t[i]);
            t.length = 0, this.runPostStepCallbacks()
        }
    }, ei.prototype.makeCollideShapes = function() {
        var e = this;
        return function(t, i) {
            var n = e;
            if (t.bb_l <= i.bb_r && i.bb_l <= t.bb_r && t.bb_b <= i.bb_t && i.bb_b <= t.bb_t && t.body !== i.body && (!t.group || t.group !== i.group) && t.layers & i.layers) {
                var s = n.lookupHandler(t.collision_type, i.collision_type),
                    a = t.sensor || i.sensor;
                if (!a || s !== $t) {
                    if (t.collisionCode > i.collisionCode) {
                        var r = t;
                        t = i, i = r
                    }
                    var l = Zt(t, i);
                    if (0 !== l.length) {
                        var h = o(t.hashid, i.hashid),
                            c = n.cachedArbiters[h];
                        c || (c = n.cachedArbiters[h] = new xt(t, i)), c.update(l, s, t, i), "first coll" != c.state || s.begin(c, n) || c.ignore(), "ignore" !== c.state && s.preSolve(c, n) && !a ? n.arbiters.push(c) : (c.contacts = null, "ignore" !== c.state && (c.state = "normal")), c.stamp = n.stamp
                    }
                }
            }
        }
    }, ei.prototype.arbiterSetFilter = function(e) {
        var t = this.stamp - e.stamp,
            i = e.body_a,
            n = e.body_b;
        return (i.isStatic() || i.isSleeping()) && (n.isStatic() || n.isSleeping()) ? !0 : (t >= 1 && "cached" != e.state && (e.callSeparate(this), e.state = "cached"), t >= this.collisionPersistence ? (e.contacts = null, !1) : !0)
    };
    var oi = function(e) {
        var t = e.body;
        e.update(t.p, t.rot)
    };
    ei.prototype.step = function(e) {
        if (0 !== e) {
            n(0 === T.x && 0 === T.y, "vzero is invalid"), this.stamp++;
            var t = this.curr_dt;
            this.curr_dt = e;
            var i, s, a, r = this.bodies,
                o = this.constraints,
                l = this.arbiters;
            for (i = 0; i < l.length; i++) {
                var h = l[i];
                h.state = "normal", h.body_a.isSleeping() || h.body_b.isSleeping() || h.unthread()
            }
            for (l.length = 0, this.lock(), i = 0; i < r.length; i++) r[i].position_func(e);
            this.activeShapes.each(oi), this.activeShapes.reindexQuery(this.collideShapes), this.unlock(!1), this.processComponents(e), this.lock();
            for (a in this.cachedArbiters) this.arbiterSetFilter(this.cachedArbiters[a]) || delete this.cachedArbiters[a];
            var c = this.collisionSlop,
                u = 1 - Math.pow(this.collisionBias, e);
            for (i = 0; i < l.length; i++) l[i].preStep(e, c, u);
            for (i = 0; i < o.length; i++) {
                var d = o[i];
                d.preSolve(this), d.preStep(e)
            }
            var p = Math.pow(this.damping, e),
                _ = this.gravity;
            for (i = 0; i < r.length; i++) r[i].velocity_func(_, p, e);
            var v = 0 === t ? 0 : e / t;
            for (i = 0; i < l.length; i++) l[i].applyCachedImpulse(v);
            for (i = 0; i < o.length; i++) o[i].applyCachedImpulse(v);
            for (i = 0; i < this.iterations; i++) {
                for (s = 0; s < l.length; s++) l[s].applyImpulse();
                for (s = 0; s < o.length; s++) o[s].applyImpulse()
            }
            for (i = 0; i < o.length; i++) o[i].postSolve(this);
            for (i = 0; i < l.length; i++) l[i].handler.postSolve(l[i], this);
            this.unlock(!0)
        }
    };
    var li = function(e, t, i, n) {
            var s = e.vx + -i.y * e.w,
                a = e.vy + i.x * e.w,
                r = t.vx + -n.y * t.w,
                o = t.vy + n.x * t.w;
            return new m(r - s, o - a)
        },
        hi = function(e, t, i, n, s) {
            var a = e.vx + -i.y * e.w,
                r = e.vy + i.x * e.w,
                o = t.vx + -n.y * t.w,
                l = t.vy + n.x * t.w;
            return S(o - a, l - r, s.x, s.y)
        },
        ci = function(e, t, i, n) {
            e.vx += t * e.m_inv, e.vy += i * e.m_inv, e.w += e.i_inv * (n.x * i - n.y * t)
        },
        ui = function(e, t, i, n, s, a) {
            ci(e, -s, -a, i), ci(t, s, a, n)
        },
        di = function(e, t, i, n) {
            e.v_biasx += t * e.m_inv, e.v_biasy += i * e.m_inv, e.w_bias += e.i_inv * w(n.x, n.y, t, i)
        },
        pi = function(e, t, i) {
            var n = B(t, i);
            return e.m_inv + e.i_inv * n * n
        },
        _i = function(e, t, i, n, a) {
            var r = pi(e, i, a) + pi(t, n, a);
            return s(0 !== r, "Unsolvable collision or constraint."), r
        },
        vi = function(e, t, i, n, a, r) {
            var o, l, h, c, u = e.m_inv + t.m_inv;
            o = u, l = 0, h = 0, c = u;
            var d = e.i_inv,
                p = i.x * i.x * d,
                _ = i.y * i.y * d,
                v = -i.x * i.y * d;
            o += _, l += v, h += v, c += p;
            var f = t.i_inv,
                m = n.x * n.x * f,
                T = n.y * n.y * f,
                g = -n.x * n.y * f;
            o += T, l += g, h += g, c += m;
            var S = o * c - l * h;
            s(0 !== S, "Unsolvable constraint.");
            var E = 1 / S;
            a.x = c * E, a.y = -l * E, r.x = -h * E, r.y = o * E
        },
        fi = function(e, t, i) {
            return new m(g(e, t), g(e, i))
        },
        mi = function(e, t) {
            return 1 - Math.pow(e, t)
        },
        Ti = e.Constraint = function(e, t) {
            this.a = e, this.b = t, this.space = null, this.next_a = null, this.next_b = null, this.maxForce = 1 / 0, this.errorBias = Math.pow(.9, 60), this.maxBias = 1 / 0
        };
    Ti.prototype.activateBodies = function() {
        this.a && this.a.activate(), this.b && this.b.activate()
    }, Ti.prototype.preStep = function() {}, Ti.prototype.applyCachedImpulse = function() {}, Ti.prototype.applyImpulse = function() {}, Ti.prototype.getImpulse = function() {
        return 0
    }, Ti.prototype.preSolve = function() {}, Ti.prototype.postSolve = function() {}, Ti.prototype.next = function(e) {
        return this.a === e ? this.next_a : this.next_b
    };
    var gi = e.PinJoint = function(e, t, i, n) {
        Ti.call(this, e, t), this.anchr1 = i, this.anchr2 = n;
        var a = e ? P(e.p, I(i, e.rot)) : i,
            r = t ? P(t.p, I(n, t.rot)) : n;
        this.dist = E(A(r, a)), s(this.dist > 0, "You created a 0 length pin joint. A pivot joint will be much more stable."), this.r1 = this.r2 = null, this.n = null, this.nMass = 0, this.jnAcc = this.jnMax = 0, this.bias = 0
    };
    gi.prototype = Object.create(Ti.prototype), gi.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b;
        this.r1 = I(this.anchr1, t.rot), this.r2 = I(this.anchr2, i.rot);
        var n = A(P(i.p, this.r2), P(t.p, this.r1)),
            s = E(n);
        this.n = C(n, 1 / (s ? s : 1 / 0)), this.nMass = 1 / _i(t, i, this.r1, this.r2, this.n);
        var a = this.maxBias;
        this.bias = v(-mi(this.errorBias, e) * (s - this.dist) / e, -a, a), this.jnMax = this.maxForce * e
    }, gi.prototype.applyCachedImpulse = function(e) {
        var t = C(this.n, this.jnAcc * e);
        ui(this.a, this.b, this.r1, this.r2, t.x, t.y)
    }, gi.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = this.n,
            n = hi(e, t, this.r1, this.r2, i),
            s = (this.bias - n) * this.nMass,
            a = this.jnAcc;
        this.jnAcc = v(a + s, -this.jnMax, this.jnMax), s = this.jnAcc - a, ui(e, t, this.r1, this.r2, i.x * s, i.y * s)
    }, gi.prototype.getImpulse = function() {
        return Math.abs(this.jnAcc)
    };
    var Si = e.SlideJoint = function(e, t, i, n, s, a) {
        Ti.call(this, e, t), this.anchr1 = i, this.anchr2 = n, this.min = s, this.max = a, this.r1 = this.r2 = this.n = null, this.nMass = 0, this.jnAcc = this.jnMax = 0, this.bias = 0
    };
    Si.prototype = Object.create(Ti.prototype), Si.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b;
        this.r1 = I(this.anchr1, t.rot), this.r2 = I(this.anchr2, i.rot);
        var n = A(P(i.p, this.r2), P(t.p, this.r1)),
            s = E(n),
            a = 0;
        s > this.max ? (a = s - this.max, this.n = D(n)) : s < this.min ? (a = this.min - s, this.n = b(D(n))) : (this.n = T, this.jnAcc = 0), this.nMass = 1 / _i(t, i, this.r1, this.r2, this.n);
        var r = this.maxBias;
        this.bias = v(-mi(this.errorBias, e) * a / e, -r, r), this.jnMax = this.maxForce * e
    }, Si.prototype.applyCachedImpulse = function(e) {
        var t = this.jnAcc * e;
        ui(this.a, this.b, this.r1, this.r2, this.n.x * t, this.n.y * t)
    }, Si.prototype.applyImpulse = function() {
        if (0 !== this.n.x || 0 !== this.n.y) {
            var e = this.a,
                t = this.b,
                i = this.n,
                n = this.r1,
                s = this.r2,
                a = li(e, t, n, s),
                r = g(a, i),
                o = (this.bias - r) * this.nMass,
                l = this.jnAcc;
            this.jnAcc = v(l + o, -this.jnMax, 0), o = this.jnAcc - l, ui(e, t, this.r1, this.r2, i.x * o, i.y * o)
        }
    }, Si.prototype.getImpulse = function() {
        return Math.abs(this.jnAcc)
    };
    var Ei = e.PivotJoint = function(e, t, i, n) {
        if (Ti.call(this, e, t), "undefined" == typeof n) {
            var s = i;
            i = e ? e.world2Local(s) : s, n = t ? t.world2Local(s) : s
        }
        this.anchr1 = i, this.anchr2 = n, this.r1 = this.r2 = T, this.k1 = new m(0, 0), this.k2 = new m(0, 0), this.jAcc = T, this.jMaxLen = 0, this.bias = T
    };
    Ei.prototype = Object.create(Ti.prototype), Ei.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b;
        this.r1 = I(this.anchr1, t.rot), this.r2 = I(this.anchr2, i.rot), vi(t, i, this.r1, this.r2, this.k1, this.k2), this.jMaxLen = this.maxForce * e;
        var n = A(P(i.p, this.r2), P(t.p, this.r1));
        this.bias = j(C(n, -mi(this.errorBias, e) / e), this.maxBias)
    }, Ei.prototype.applyCachedImpulse = function(e) {
        ui(this.a, this.b, this.r1, this.r2, this.jAcc.x * e, this.jAcc.y * e)
    }, Ei.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = this.r1,
            n = this.r2,
            s = li(e, t, i, n),
            a = fi(A(this.bias, s), this.k1, this.k2),
            r = this.jAcc;
        this.jAcc = j(P(this.jAcc, a), this.jMaxLen), ui(e, t, this.r1, this.r2, this.jAcc.x - r.x, this.jAcc.y - r.y)
    }, Ei.prototype.getImpulse = function() {
        return E(this.jAcc)
    };
    var yi = e.GrooveJoint = function(e, t, i, n, s) {
        Ti.call(this, e, t), this.grv_a = i, this.grv_b = n, this.grv_n = L(N(A(n, i))), this.anchr2 = s, this.grv_tn = null, this.clamp = 0, this.r1 = this.r2 = null, this.k1 = new m(0, 0), this.k2 = new m(0, 0), this.jAcc = T, this.jMaxLen = 0, this.bias = null
    };
    yi.prototype = Object.create(Ti.prototype), yi.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b,
            n = t.local2World(this.grv_a),
            s = t.local2World(this.grv_b),
            a = I(this.grv_n, t.rot),
            r = g(n, a);
        this.grv_tn = a, this.r2 = I(this.anchr2, i.rot);
        var o = B(P(i.p, this.r2), a);
        o <= B(n, a) ? (this.clamp = 1, this.r1 = A(n, t.p)) : o >= B(s, a) ? (this.clamp = -1, this.r1 = A(s, t.p)) : (this.clamp = 0, this.r1 = A(P(C(L(a), -o), C(a, r)), t.p)), vi(t, i, this.r1, this.r2, this.k1, this.k2), this.jMaxLen = this.maxForce * e;
        var l = A(P(i.p, this.r2), P(t.p, this.r1));
        this.bias = j(C(l, -mi(this.errorBias, e) / e), this.maxBias)
    }, yi.prototype.applyCachedImpulse = function(e) {
        ui(this.a, this.b, this.r1, this.r2, this.jAcc.x * e, this.jAcc.y * e)
    }, yi.prototype.grooveConstrain = function(e) {
        var t = this.grv_tn,
            i = this.clamp * B(e, t) > 0 ? e : O(e, t);
        return j(i, this.jMaxLen)
    }, yi.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = this.r1,
            n = this.r2,
            s = li(e, t, i, n),
            a = fi(A(this.bias, s), this.k1, this.k2),
            r = this.jAcc;
        this.jAcc = this.grooveConstrain(P(r, a)), ui(e, t, this.r1, this.r2, this.jAcc.x - r.x, this.jAcc.y - r.y)
    }, yi.prototype.getImpulse = function() {
        return E(this.jAcc)
    }, yi.prototype.setGrooveA = function(e) {
        this.grv_a = e, this.grv_n = L(N(A(this.grv_b, e))), this.activateBodies()
    }, yi.prototype.setGrooveB = function(e) {
        this.grv_b = e, this.grv_n = L(N(A(e, this.grv_a))), this.activateBodies()
    };
    var Pi = function(e, t) {
            return (e.restLength - t) * e.stiffness
        },
        Ai = e.DampedSpring = function(e, t, i, n, s, a, r) {
            Ti.call(this, e, t), this.anchr1 = i, this.anchr2 = n, this.restLength = s, this.stiffness = a, this.damping = r, this.springForceFunc = Pi, this.target_vrn = this.v_coef = 0, this.r1 = this.r2 = null, this.nMass = 0, this.n = null
        };
    Ai.prototype = Object.create(Ti.prototype), Ai.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b;
        this.r1 = I(this.anchr1, t.rot), this.r2 = I(this.anchr2, i.rot);
        var n = A(P(i.p, this.r2), P(t.p, this.r1)),
            a = E(n);
        this.n = C(n, 1 / (a ? a : 1 / 0));
        var r = _i(t, i, this.r1, this.r2, this.n);
        s(0 !== r, "Unsolvable this."), this.nMass = 1 / r, this.target_vrn = 0, this.v_coef = 1 - Math.exp(-this.damping * e * r);
        var o = this.springForceFunc(this, a);
        ui(t, i, this.r1, this.r2, this.n.x * o * e, this.n.y * o * e)
    }, Ai.prototype.applyCachedImpulse = function() {}, Ai.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = this.n,
            n = this.r1,
            s = this.r2,
            a = hi(e, t, n, s, i),
            r = (this.target_vrn - a) * this.v_coef;
        this.target_vrn = a + r, r *= this.nMass, ui(e, t, this.r1, this.r2, this.n.x * r, this.n.y * r)
    }, Ai.prototype.getImpulse = function() {
        return 0
    };
    var bi = function(e, t) {
            return (t - e.restAngle) * e.stiffness
        },
        Ci = e.DampedRotarySpring = function(e, t, i, n, s) {
            Ti.call(this, e, t), this.restAngle = i, this.stiffness = n, this.damping = s, this.springTorqueFunc = bi, this.target_wrn = 0, this.w_coef = 0, this.iSum = 0
        };
    Ci.prototype = Object.create(Ti.prototype), Ci.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b,
            n = t.i_inv + i.i_inv;
        s(0 !== n, "Unsolvable spring."), this.iSum = 1 / n, this.w_coef = 1 - Math.exp(-this.damping * e * n), this.target_wrn = 0;
        var a = this.springTorqueFunc(this, t.a - i.a) * e;
        t.w -= a * t.i_inv, i.w += a * i.i_inv
    }, Ci.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = e.w - t.w,
            n = (this.target_wrn - i) * this.w_coef;
        this.target_wrn = i + n;
        var s = n * this.iSum;
        e.w += s * e.i_inv, t.w -= s * t.i_inv
    };
    var Bi = e.RotaryLimitJoint = function(e, t, i, n) {
        Ti.call(this, e, t), this.min = i, this.max = n, this.jAcc = 0, this.iSum = this.bias = this.jMax = 0
    };
    Bi.prototype = Object.create(Ti.prototype), Bi.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b,
            n = i.a - t.a,
            s = 0;
        n > this.max ? s = this.max - n : n < this.min && (s = this.min - n), this.iSum = 1 / (1 / t.i + 1 / i.i);
        var a = this.maxBias;
        this.bias = v(-mi(this.errorBias, e) * s / e, -a, a), this.jMax = this.maxForce * e, this.bias || (this.jAcc = 0)
    }, Bi.prototype.applyCachedImpulse = function(e) {
        var t = this.a,
            i = this.b,
            n = this.jAcc * e;
        t.w -= n * t.i_inv, i.w += n * i.i_inv
    }, Bi.prototype.applyImpulse = function() {
        if (this.bias) {
            var e = this.a,
                t = this.b,
                i = t.w - e.w,
                n = -(this.bias + i) * this.iSum,
                s = this.jAcc;
            this.jAcc = this.bias < 0 ? v(s + n, 0, this.jMax) : v(s + n, -this.jMax, 0), n = this.jAcc - s, e.w -= n * e.i_inv, t.w += n * t.i_inv
        }
    }, Bi.prototype.getImpulse = function() {
        return Math.abs(joint.jAcc)
    };
    var wi = e.RatchetJoint = function(e, t, i, n) {
        Ti.call(this, e, t), this.angle = 0, this.phase = i, this.ratchet = n, this.angle = (t ? t.a : 0) - (e ? e.a : 0), this.iSum = this.bias = this.jAcc = this.jMax = 0
    };
    wi.prototype = Object.create(Ti.prototype), wi.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b,
            n = this.angle,
            s = this.phase,
            a = this.ratchet,
            r = i.a - t.a,
            o = n - r,
            l = 0;
        o * a > 0 ? l = o : this.angle = Math.floor((r - s) / a) * a + s, this.iSum = 1 / (t.i_inv + i.i_inv);
        var h = this.maxBias;
        this.bias = v(-mi(this.errorBias, e) * l / e, -h, h), this.jMax = this.maxForce * e, this.bias || (this.jAcc = 0)
    }, wi.prototype.applyCachedImpulse = function(e) {
        var t = this.a,
            i = this.b,
            n = this.jAcc * e;
        t.w -= n * t.i_inv, i.w += n * i.i_inv
    }, wi.prototype.applyImpulse = function() {
        if (this.bias) {
            var e = this.a,
                t = this.b,
                i = t.w - e.w,
                n = this.ratchet,
                s = -(this.bias + i) * this.iSum,
                a = this.jAcc;
            this.jAcc = v((a + s) * n, 0, this.jMax * Math.abs(n)) / n, s = this.jAcc - a, e.w -= s * e.i_inv, t.w += s * t.i_inv
        }
    }, wi.prototype.getImpulse = function(e) {
        return Math.abs(e.jAcc)
    };
    var Li = e.GearJoint = function(e, t, i, n) {
        Ti.call(this, e, t), this.phase = i, this.ratio = n, this.ratio_inv = 1 / n, this.jAcc = 0, this.iSum = this.bias = this.jMax = 0
    };
    Li.prototype = Object.create(Ti.prototype), Li.prototype.preStep = function(e) {
        var t = this.a,
            i = this.b;
        this.iSum = 1 / (t.i_inv * this.ratio_inv + this.ratio * i.i_inv);
        var n = this.maxBias;
        this.bias = v(-mi(this.errorBias, e) * (i.a * this.ratio - t.a - this.phase) / e, -n, n), this.jMax = this.maxForce * e
    }, Li.prototype.applyCachedImpulse = function(e) {
        var t = this.a,
            i = this.b,
            n = this.jAcc * e;
        t.w -= n * t.i_inv * this.ratio_inv, i.w += n * i.i_inv
    }, Li.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = t.w * this.ratio - e.w,
            n = (this.bias - i) * this.iSum,
            s = this.jAcc;
        this.jAcc = v(s + n, -this.jMax, this.jMax), n = this.jAcc - s, e.w -= n * e.i_inv * this.ratio_inv, t.w += n * t.i_inv
    }, Li.prototype.getImpulse = function() {
        return Math.abs(this.jAcc)
    }, Li.prototype.setRatio = function(e) {
        this.ratio = e, this.ratio_inv = 1 / e, this.activateBodies()
    };
    var Oi = e.SimpleMotor = function(e, t, i) {
        Ti.call(this, e, t), this.rate = i, this.jAcc = 0, this.iSum = this.jMax = 0
    };
    Oi.prototype = Object.create(Ti.prototype), Oi.prototype.preStep = function(e) {
        this.iSum = 1 / (this.a.i_inv + this.b.i_inv), this.jMax = this.maxForce * e
    }, Oi.prototype.applyCachedImpulse = function(e) {
        var t = this.a,
            i = this.b,
            n = this.jAcc * e;
        t.w -= n * t.i_inv, i.w += n * i.i_inv
    }, Oi.prototype.applyImpulse = function() {
        var e = this.a,
            t = this.b,
            i = t.w - e.w + this.rate,
            n = -i * this.iSum,
            s = this.jAcc;
        this.jAcc = v(s + n, -this.jMax, this.jMax), n = this.jAcc - s, e.w -= n * e.i_inv, t.w += n * t.i_inv
    }, Oi.prototype.getImpulse = function() {
        return Math.abs(this.jAcc)
    }
}();
var world, PHYS_SCALE = 1,
    RAD_TO_DEGREES = 180 / Math.PI,
    DEGREES_TO_RAD = Math.PI / 180,
    objA, objB, debugCanvas, debugDraw, space, v = cp.v,
    GRABABLE_MASK_BIT = 1 << 31,
    NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT,
    worldManifold, isCollideParticlesNeed = !0,
    collidedChar, collidedOther, collidedSensor, collidedBody, collidedHero, force, angle, fixDef, bodyDef, DEFAULT_RECT_SIZE = 90 / PHYS_SCALE,
    DEFAULT_BOX_SIZE = 52 / PHYS_SCALE,
    querySelectedBody, queryV = new v(0, 0),
    ChipMunkDebugDrawer = function() {
        this.space = new cp.Space;
        this.remainder = 0, this.fps = 0, this.mouse = v(0, 0), this.simulationTime = 0, this.drawTime = 0, this.scale = 1, this.width = minW, this.height = minH; {
            var e = this;
            this.canvas2point = function(t, i) {
                return v(t / e.scale, 480 - i / e.scale)
            }
        }
        this.point2canvas = function(t) {
            return v(t.x * e.scale, t.y * e.scale)
        }
    };
ChipMunkDebugDrawer.prototype.drawInfo = function() {
    var e = this.space,
        t = this.width - 20;
    this.ctx.textAlign = "start", this.ctx.textBaseline = "alphabetic", this.ctx.fillStyle = "black";
    var i = Math.floor(10 * this.fps) / 10;
    0 === e.activeShapes.count && (i = "--"), this.ctx.fillText("FPS: " + i, 10, 50, t), this.ctx.fillText("Step: " + e.stamp, 10, 80, t);
    var n = e.arbiters.length;
    this.maxArbiters = this.maxArbiters ? Math.max(this.maxArbiters, n) : n, this.ctx.fillText("Arbiters: " + n + " (Max: " + this.maxArbiters + ")", 10, 110, t);
    for (var s = 0, a = 0; n > a; a++) s += e.arbiters[a].contacts.length;
    this.maxContacts = this.maxContacts ? Math.max(this.maxContacts, s) : s, this.ctx.fillText("Contact points: " + s + " (Max: " + this.maxContacts + ")", 10, 140, t), this.ctx.fillText("Simulation time: " + this.simulationTime + " ms", 10, 170, t), this.ctx.fillText("Draw time: " + this.drawTime + " ms", 10, 200, t), this.message && this.ctx.fillText(this.message, 10, this.height - 50, t)
}, ChipMunkDebugDrawer.prototype.draw = function() {
    var e = this.ctx,
        t = this;
    t.scale = styleScaleFactor, e.strokeStyle = "black", e.clearRect(0, 0, debugCanvas.width, debugCanvas.height), this.ctx.font = "16px sans-serif", this.ctx.lineCap = "round", this.space.eachShape(function(i) {
        e.fillStyle = i.style(), i.draw(e, t.scale, t.point2canvas)
    }), this.space.eachConstraint(function(i) {
        i.draw && i.draw(e, t.scale, t.point2canvas)
    })
};
var drawSegment = function(e, t, i) {
        var n = this.ctx;
        n.beginPath();
        var s = this.point2canvas(e),
            a = this.point2canvas(t);
        n.moveTo(s.x, s.y), n.lineTo(a.x, a.y), n.lineWidth = 1, n.strokeStyle = i, n.stroke()
    },
    drawBB = function(e, t, i) {
        var n = this.ctx,
            s = this.point2canvas(v(e.l, e.t)),
            a = this.scale * (e.r - e.l),
            r = this.scale * (e.t - e.b);
        t && (n.fillStyle = t, n.fillRect(s.x, s.y, a, r)), i && (n.strokeStyle = i, n.strokeRect(s.x, s.y, a, r))
    },
    drawCircle = function(e, t, i, n, s) {
        var n = i(n);
        e.beginPath(), e.arc(n.x, n.y, t * s, 0, 2 * Math.PI, !1), e.fill(), e.stroke()
    },
    drawLine = function(e, t, i, n) {
        i = t(i), n = t(n), e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(n.x, n.y), e.stroke()
    },
    drawRect = function(e, t, i, n) {
        var s = t(i),
            a = cp.v.sub(t(cp.v.add(i, n)), s);
        e.fillRect(s.x, s.y, a.x, a.y)
    },
    springPoints = [v(0, 0), v(.2, 0), v(.25, 3), v(.3, -6), v(.35, 6), v(.4, -6), v(.45, 6), v(.5, -6), v(.55, 6), v(.6, -6), v(.65, 6), v(.7, -3), v(.75, 6), v(.8, 0), v(1, 0)],
    drawSpring = function(e, t, i, n, s) {
        n = i(n), s = i(s), e.beginPath(), e.moveTo(n.x, n.y);
        for (var a = v.sub(s, n), r = v.len(a), o = v.mult(a, 1 / r), l = 1; l < springPoints.length; l++) {
            var h = v.add(n, v.rotate(v(springPoints[l].x * r, springPoints[l].y * t), o));
            e.lineTo(h.x, h.y)
        }
        e.stroke()
    };
cp.PolyShape.prototype.draw = function(e, t, i) {
    e.beginPath();
    var n = this.tVerts,
        s = n.length,
        a = i(new cp.Vect(n[s - 2], n[s - 1]));
    e.moveTo(a.x, a.y);
    for (var r = 0; s > r; r += 2) {
        var o = i(new cp.Vect(n[r], n[r + 1]));
        e.lineTo(o.x, o.y)
    }
    e.fill(), e.stroke()
}, cp.SegmentShape.prototype.draw = function(e, t, i) {
    var n = e.lineWidth;
    e.lineWidth = Math.max(1, this.r * t * 2), drawLine(e, i, this.ta, this.tb), e.lineWidth = n
}, cp.CircleShape.prototype.draw = function(e, t, i) {
    drawCircle(e, t, i, this.tc, this.r), drawLine(e, i, this.tc, cp.v.mult(this.body.rot, this.r).add(this.tc))
}, cp.PinJoint.prototype.draw = function(e, t, i) {
    var n = this.a.local2World(this.anchr1),
        s = this.b.local2World(this.anchr2);
    e.lineWidth = 2, e.strokeStyle = "grey", drawLine(e, i, n, s)
}, cp.SlideJoint.prototype.draw = function(e, t, i) {
    var n = this.a.local2World(this.anchr1),
        s = this.b.local2World(this.anchr2),
        a = v.add(n, v.clamp(v.sub(s, n), this.min));
    e.lineWidth = 2, e.strokeStyle = "grey", drawLine(e, i, n, s), e.strokeStyle = "red", drawLine(e, i, n, a)
}, cp.PivotJoint.prototype.draw = function(e, t, i) {
    var n = this.a.local2World(this.anchr1),
        s = this.b.local2World(this.anchr2);
    e.strokeStyle = "grey", e.fillStyle = "grey", drawCircle(e, t, i, n, 2), drawCircle(e, t, i, s, 2)
}, cp.GrooveJoint.prototype.draw = function(e, t, i) {
    var n = this.a.local2World(this.grv_a),
        s = this.a.local2World(this.grv_b),
        a = this.b.local2World(this.anchr2);
    e.strokeStyle = "grey", drawLine(e, i, n, s), drawCircle(e, t, i, a, 3)
}, cp.DampedSpring.prototype.draw = function(e, t, i) {
    var n = this.a.local2World(this.anchr1),
        s = this.b.local2World(this.anchr2);
    e.strokeStyle = "grey", drawSpring(e, t, i, n, s)
};
for (var randColor = function() {
        return Math.floor(256 * Math.random())
    }, debugAlpha = .7, styles = [], i = 0; 100 > i; i++) styles.push("rgba(" + randColor() + ", " + randColor() + ", " + randColor() + "," + debugAlpha + ")");
cp.Shape.prototype.style = function() {
    var e;
    return this.sensor ? "rgba(255,255,255,0)" : (e = this.body, e.isSleeping() ? "rgba(50,50,50," + debugAlpha + ")" : e.nodeIdleTime > this.space.sleepTimeThreshold ? "rgba(170,170,170," + debugAlpha + ")" : styles[this.hashid % styles.length])
};
var MINIMUM_SPEED = 3,
    MAX_SPEED = 6,
    IS_NITRO = !1,
    DEFAULT_STATE = 0,
    COLLIDED_STATE = 1,
    ACTIVATOR_RADIUS = 25,
    MORE_EASY_MULT = 1,
    dx, dy, dist, isNeedActivate = !1;
! function(e) {
    function t(e, t, i, n, s) {
        var a = new createjs.Sprite(zoeSS);
        a.baseBlock = this, this.vis = a, a = new createjs.Sprite(zoeSS), a.baseBlock = this, this.additVision = a, this.reset(e, t, i, n, s)
    }
    var i = t.prototype;
    i.reset = function(t, i, n, s, a) {
        this.typeId = t, this.type = e[t], createjs.Tween.removeTweens(this.vis), removeFromParent(this.additVision), this.parent = i, this.vis.isOnTop = !1, this.vis.isOnBottom = !0, this.isLoadedToTube = !1, this.isFly = !1, this.isMovable = !1, this.teleportPartner = null, this.isReversed = !1, this.dir = 1, this.activForce = FAN_MAX_FORCE, this.activDistance = FAN_ACTIV_DISTANCE, this.distanceEndX = 0, this.distanceStartX = 0, this.isClicked = !1, this.isRemovable = !1, this.doorDistanceEnd = 0, this.isGlass = !1, this.isActivated = !1, this.isMechanic = !1, this.labelId = "", this.isRectMonster = !0, this.isNeedDispose = !1, this.teleportationStatus = -1, this.vis.alpha = 1, this.isHero = !1, this.vis.mouseEnabled = !1, this.physBody = null, this.scale = n, this.scaleY = s, this.rotation = 0, this.teleportAngle = 0, this.isEnemy = !1, this.additParams = a, this.startTeleport = null, this.aimTeleport = null, this.isAim = !1, this.isDanger = !1, this.isFirstCollided = !1, this.shape = null, this.defaultRotation = 0, this.animMargin = 30 * Math.random(), this.isNeutralEnemy = !1, this.currSpeed = 0, this.currentEaseId = "", this.visionWidth = 0, this.startMoveX = 0, this.startMarginX = 0, this.state = DEFAULT_STATE, this.charRadius = 0, this.collideTimer = 0, this.isTube = !1, this.isExploded = !1, this.lastColliderType = -1, this.vis.rotation = 0, this.isPusher = !1, this.isBad = !1, this.raduis = 0, this.isDied = !1, this.vel = null, this.isByPhysPosUpdate = !0, this.isNeedGravityActivate = !1, this.isGravityActivated = !1, this.vis.cursor = null, this.isBall = !1, this.isLand = !1, this.lastVelocity = 0, this.lastAngularVelocity = 0, this.isHelp = t.indexOf("HELP") > -1, this.isDecor = t.indexOf("DECOR") > -1, this.isDynamicDecor = this.isDecor ? this.isDynDecor() : !0, this.isPhysStatic = t.indexOf("PHYSICS") > -1, this.vis.visible = !this.isPhysStatic, this.type === LAND_TYPE && (this.isLand = !0), this.setVisionByType(), this.updateVisionScale(), !this.isDynamicDecor && isWithCache && (this.parent = allBgContainer), this.parent.addChild(this.vis), this.type === BOMB_TYPE && addToParent(this.additVision, this.parent), this.isHero && (this.calculateBoundingBox(), this.setupMouseEventListeners())
    }, i.isDynDecor = function() {
        return this.isHelp || this.type === DECOR_ARROW_TYPE
    }, i.setupMouseEventListeners = function() {
        this.type !== BAD_2_TYPE && (this.vis.cursor = "pointer", this.vis.addEventListener("mousedown", this.onMouseDown))
    }, i.onMouseDown = function(e) {
        var t = e.target.baseBlock;
        t.activateGravity()
    }, i.setVisionByType = function() {
        this.vis.gotoAndStop(this.typeId);
        var e = !1;
        if ((this.type === DYNAMIC_BOX_TYPE || this.type === DYNAMIC_RECT_TYPE || this.type === DYNAMIC_TRIANGLE_TYPE) && (e = !0), (this.type === HARD_BOX_TYPE || this.type === HARD_RECT_TYPE || this.type === LAND_TYPE || this.type === STATIC_BALK_1_TYPE || this.type === PUSHER_TYPE || this.type === ZOMBIE_TYPE) && (e = !0), this.type === STATIC_BOX_TYPE && ("INVIS" == this.getAdditParams(0) ? this.vis.visible = !1 : e = !0), this.type === BALL_TYPE ? (this.isBall = !0, this.isHero = !0, this.vis.play(), this.isByPhysPosUpdate = !0, addToArray(allBalls, this), addToArray(allHeroes, this)) : this.type === BOMB_TYPE ? (this.vis.cursor = "pointer", this.vis.mouseEnabled = !0, this.activDistance = parseInt(this.getAdditParams(0)), this.activForce = parseInt(this.getAdditParams(1)), addToArray(allBombs, this), this.additVision.gotoAndPlay("bombfitil"), this.parent.addChild(this.additVision)) : this.type === GLASS_BLOCK_TYPE || this.type === GLASS_BOX_TYPE || this.type === GLASS_TRIANGLE_TYPE ? this.isGlass = !0 : this.type === TELEGA_TYPE ? (this.readMovableConfig(1), this.isMovable = !0, this.visionWidth = 106, "1" !== this.getAdditParams(0) && (e = !0, this.isRemovable = !0)) : this.type === MOVABLE_BALK_TYPE ? (this.readMovableConfig(0), this.isMovable = !0, this.visionWidth = 216, this.vis.gotoAndStop("STATIC_BALK_1_TYPE")) : this.type === STATIC_BALK_1_TYPE ? this.getAdditParams(0).length > 0 && (this.isRemovable = !0) : this.type === FAN_TYPE ? (this.vis.cursor = "pointer", this.vis.mouseEnabled = !0, addToArray(allFans, this), this.isByPhysPosUpdate = !1) : this.type === PUSHER_TYPE ? (this.isPusher = !0, this.isHero = !0, setAnimationSpeed(this.vis, .8), this.vis.play(), addToArray(allPushers, this), addToArray(allHeroes, this)) : this.type === ZOMBIE_TYPE ? (this.isHero = !0, this.isBad = !0, setAnimationSpeed(this.vis, .8), this.vis.play(), addToArray(allHeroes, this), addToArray(allZombies, this)) : this.type === DANGER_KUST_TYPE ? this.vis.gotoAndStop("BONUS_DANGER_KUST_TYPE") : this.type === CONVEYOR_TYPE ? (this.vis.cursor = "pointer", this.vis.mouseEnabled = !0, this.isByPhysPosUpdate = !1, addToArray(allConveyors, this), this.readMovableConfig(0), -1 === this.dir && this.vis.gotoAndStop("CONVEYOR_TYPE_REVERSE"), "ACTIV" === this.getAdditParams(3) && this.toggleConveyor()) : this.type === DYNAMIC_CIRCLE_TYPE ? this.isBall = !0 : this.type === HERO_1_TYPE || this.type === HERO_2_TYPE || this.type === HERO_3_TYPE ? (this.isPusher = !0, this.isHero = !0, addToArray(allPushers, this), addToArray(allHeroes, this), this.vis.cursor = "pointer", this.vis.mouseEnabled = !0, "CLICKED" == this.getAdditParams(0) ? this.isNeedGravityActivate = !0 : (this.visionWidth = 110, this.getAdditParams(0) && (this.readMovableConfig(0), this.isMovable = !0))) : this.type === STATIC_TUBE_1_TYPE || this.type === STATIC_TUBE_2_TYPE || this.type === STATIC_TUBE_3_TYPE ? (this.isTube = !0, addToArray(allTubes, this)) : (this.type === BAD_1_TYPE || this.type === BAD_2_TYPE) && (this.isBad = !0, this.isHero = !0, addToArray(allHeroes, this), this.type === BAD_1_TYPE && (this.vis.cursor = "pointer", this.vis.mouseEnabled = !0), "CLICKED" == this.getAdditParams(0) ? this.isNeedGravityActivate = !0 : (this.visionWidth = 110, this.getAdditParams(0) && (this.readMovableConfig(0), this.isMovable = !0))), this.isRemovable && (this.vis.cursor = "pointer", this.vis.mouseEnabled = !0, currentRemovablesNum++), this.type === AIM_TYPE && (this.isAim = !0, this.visionWidth = 65, this.additVision.gotoAndStop("AIM_BACK"), this.parent.addChildAt(this.additVision, 0), "REV" == this.getAdditParams(0) && (this.isReversed = !0), this.getAdditParams(1) && (this.readMovableConfig(2), this.isMovable = !0, this.vis.gotoAndStop("AIM_TYPE_MOVABLE"))), this.type === DANGER_TYPE && (this.isDanger = !0, this.isDynamicDecor = !1), this.type === TELEPORT_TYPE) {
            this.vis.play(), this.isByPhysPosUpdate = !1, this.isTeleport = !0, this.rotation = 3 + 5 * Math.random(), this.labelId = this.getAdditParams(0), addToArray(allTeleports, this), 39 === currentLevel && (this.vis.visible = !1);
            for (var t = allTeleports.length - 1; t >= 0; --t) {
                var i = allTeleports[t];
                i.labelId === this.labelId && (i.teleportPartner = this, this.teleportPartner = i)
            }
        }
        this.type === FAN_TYPE && ("REV" == this.getAdditParams(0) && (this.isReversed = !0, this.dir = -1), this.getAdditParams(1) && (this.activDistance = parseInt(this.getAdditParams(1))), this.getAdditParams(2) && (this.activForce = parseInt(this.getAdditParams(2)))), e && this.getAdditParams(0).length > 0 && (this.vis.gotoAndStop(this.typeId + "_" + this.getAdditParams(0)), this.type === ZOMBIE_TYPE && this.vis.play()), this.vis.paused || (this.vis.currentAnimationFrame = Math.floor(20 * Math.random()))
    }, i.readMovableConfig = function(e) {
        this.dir = "R" === this.getAdditParams(0) ? 1 : -1;
        var t = parseInt(this.getAdditParams(1 + e));
        this.startMarginX = t >= 1e3 ? 1e3 - t : t, this.currSpeed = parseInt(this.getAdditParams(2 + e)) / 10, this.currentEaseId = this.getAdditParams(3 + e)
    }, i.getAdditParams = function(e) {
        return this.additParams[0].split("_").length > e ? this.additParams[0].split("_")[e] : null
    }, i.setupActivLabel = function() {
        this.labelId = this.getAdditParams(0)
    }, i.bombClick = function() {
        if (!(isLevelCompleted || isLevelFailed || isGamePaused)) {
            var e = this;
            e.isExploded || (createExplosion(e), removeFromParent(this.additVision), e.vis.removeAllEventListeners(), e.vis.mouseEnabled = !1, e.vis.scaleX = e.vis.scaleY = e.scale = 3, e.vis.gotoAndPlay("bombexplosionv"), addToParent(e.vis, this.parent), e.isByPhysPosUpdate = !1, this.disposePhysBody(), e.isExploded = !0, playSound("explodeSound"))
        }
    }, i.calculateBoundingBox = function() {
        var e = 1;
        this.isEnemy && (e = .7);
        var t = this.vis._animation;
        t && t.frames && t.frames.length > 0 && (this.bounds = zoeSS.getFrameBounds(t.frames[0]), this.bounds.width *= this.scaleY * e, this.bounds.height *= this.scaleY * e, this.bounds.x *= this.scaleY * e, this.bounds.y *= this.scaleY * e, this.vis.setBoundingBox(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height))
    }, i.setPosition = function(e, t, i) {
        var n = e,
            s = t;
        this.isMovable && (this.distanceEndX = 280 * this.scale - this.scaleY * this.visionWidth, this.distanceStartX = e - this.distanceEndX / 2, this.distanceEndX = e + this.distanceEndX / 2, n = Math.min(this.distanceEndX, Math.max(this.distanceStartX, e + this.startMarginX))), this.vis.x = this.additVision.x = n, this.vis.y = this.additVision.y = s, this.vis.rotation = this.additVision.rotation = i, this.defaultRotation = i, this.isMovable && this.setupMovableTweens()
    }, i.setupMovableTweens = function() {
        var e = this.distanceEndX - this.distanceStartX,
            t = createjs.Ease.none;
        "EO" === this.currentEaseId ? t = createjs.Ease.elasticOut : "EIO" === this.currentEaseId ? t = createjs.Ease.elasticInOut : "SIO" === this.currentEaseId ? t = createjs.Ease.sineInOut : "SI" === this.currentEaseId ? t = createjs.Ease.sineIn : "SO" === this.currentEaseId && (t = createjs.Ease.sineOut), createjs.Tween.removeTweens(this.vis);
        var i = -5,
            n = -i;
        this.type === MOVABLE_BALK_TYPE ? i = n = this.vis.rotation : this.vis.rotation = i, this.vis.x = this.distanceStartX;
        var s = 15 * e / this.currSpeed,
            a = createjs.Tween.get(this.vis, {
                override: !0,
                loop: !0
            }).to({
                x: this.distanceEndX,
                rotation: n
            }, s, t).to({
                x: this.distanceStartX,
                rotation: i
            }, s, t);
        a.setPosition(s * this.startMarginX / 100)
    }, i.initPhysics = function() {
        if (!this.isDecor && this.type !== ACTIVATOR_TYPE && this.type !== TELEPORT_TYPE) {
            var e, t = this.vis.x / PHYS_SCALE,
                i = this.vis.y / PHYS_SCALE,
                n = this.vis.rotation * DEGREES_TO_RAD;
            e = this.isPhysStatic || this.type === DYNAMIC_BOX_TYPE || this.type === DANGER_TYPE || this.type === MONSTER_TYPE && this.isRectMonster || this.type === GLASS_BLOCK_TYPE || this.type === GLASS_BOX_TYPE || this.type === DOOR_TYPE || this.type === DYNAMIC_RECT_TYPE || this.type === HARD_RECT_TYPE || this.type === HARD_BOX_TYPE || this.type === STATIC_BALK_1_TYPE || this.type === PUSHER_TYPE || this.type === STATIC_BOX_TYPE || this.type === ZOMBIE_TYPE || this.type === STATIC_TUBE_1_TYPE || this.type === STATIC_TUBE_2_TYPE || this.type === STATIC_TUBE_3_TYPE ? createRectPhysics(t, i, this.scale, this.scaleY, this.type, n) : this.type === DYNAMIC_TRIANGLE_TYPE || this.type === GLASS_TRIANGLE_TYPE || this.type === HARD_TRIANGLE_TYPE ? createTrianglePhysics(t, i, this.scale, this.scaleY, this.type, n) : this.type === TELEGA_TYPE || this.type === AIM_TYPE || this.type === MOVABLE_BALK_TYPE ? createKinematicPhysics(t, i, this.scale, this.scaleY, this.type, n, this) : this.type === LAND_TYPE ? createSegmentPhysics(t, i, this.scale, this.scaleY, this.type, n, this) : this.type === CONVEYOR_TYPE ? createConveyorPhysics(t, i, this.scale, this.scaleY, this.type, n, this) : createCircleShape(t, i, this.scaleY * this.getRadiusByType() / PHYS_SCALE, this.type, n, this), e && (e.userdata = this, this.physBody = e)
        }
    }, i.getRadiusByType = function() {
        switch (this.type) {
            case BALL_TYPE:
                return 32;
            case AIM_TYPE:
                return 19;
            case HERO_DOC_TYPE:
                return 31;
            case HERO_WOMAN_TYPE:
                return 31;
            case TELEPORT_TYPE:
                return 25;
            case BOMB_TYPE:
                return 39;
            case MONSTER_TYPE:
                return 31;
            case DYNAMIC_CIRCLE_TYPE:
                return 29;
            case FAN_TYPE:
                return 25;
            case PUSHER_TYPE:
                return 32;
            case DANGER_KUST_TYPE:
                return 27;
            case STATIC_CIRCLE_TYPE:
                return 42;
            case HERO_1_TYPE:
            case HERO_2_TYPE:
            case HERO_3_TYPE:
            case BAD_1_TYPE:
            case BAD_2_TYPE:
                return 53
        }
        return 30
    }, i.setFrame = function(e, t) {
        t ? this.vis.gotoAndPlay(e) : this.vis.gotoAndStop(e)
    }, i.setVisionState = function() {}, i.onInflateEnd = function() {
        this.isFly = !1
    }, i.tick = function() {
        if (this.isNeedDispose) return void addToArray(toDisposeChars, this);
        if (!isGamePaused && (!this.isDecor || this.isDynamicDecor)) {
            if (this.physBody && !this.isPhysStatic && this.isByPhysPosUpdate ? this.isMovable ? (this.physBody.activate(), this.physBody.p.x = this.vis.x) : (this.vis.x = this.additVision.x = this.physBody.p.x, this.vis.y = this.additVision.y = this.physBody.p.y, this.vis.rotation = this.additVision.rotation = Math.atan2(this.physBody.rot.y, this.physBody.rot.x) * RAD_TO_DEGREES) : (this.additVision.x = this.vis.x, this.additVision.y = this.vis.y, this.additVision.rotation = this.vis.rotation, this.additVision.scaleX = this.vis.scaleX, this.additVision.scaleY = this.vis.scaleY), this.type === BOMB_TYPE ? (this.teleportationStatus < 0 && (this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 60, this.vis.scaleY = this.scale - Math.cos((counter + this.animMargin) / 5) / 60), this.isExploded && this.vis.currentAnimationFrame >= 3 && (this.isNeedDispose = !0)) : this.isHelp && (this.vis.scaleX = this.vis.scaleY = this.scale + Math.cos((counter + this.animMargin) / 12) / 20), this.updateTeleportation(), this.isHero && (!this.isMovable && (this.vis.x < -140 || this.vis.x > minW + 140 || this.vis.y > viewportH + 70 || this.vis.y < -600) && this.dieByWorldOut(), this.isNeedGravityActivate && !this.isGravityActivated && this.physBody && (this.isNeedGravityActivate = !1, this.isGravityActivated = !0, this.physBody.activate(), this.vis.mouseEnabled = !1, this.physBody.additGrav = 0, this.isMovable = !1, createjs.Tween.removeTweens(this.vis), this.vis.gotoAndStop(this.typeId + "_CLICKED")), this.isByPhysPosUpdate && (this.vis.scaleX = this.scaleY + Math.cos((counter + this.animMargin) / 5) / 60, this.vis.scaleY = this.scaleY - Math.cos((counter + this.animMargin) / 5) / 60, !this.isBad)))
                for (var e, t, i, n = 0; allTubesLen > n; n++) e = allTubes[n], (e.type === STATIC_TUBE_1_TYPE && this.type === HERO_1_TYPE || e.type === STATIC_TUBE_2_TYPE && this.type === HERO_2_TYPE || e.type === STATIC_TUBE_3_TYPE && this.type === HERO_3_TYPE) && (t = e.vis.x - this.vis.x, i = e.vis.y - 240 * e.scale - this.vis.y, Math.abs(t) < 74 && Math.abs(i) < 70 * this.scaleY && this.loadToTube(e));
            if (this.type === TELEPORT_TYPE)
                for (var n = allChars.length - 1; n >= 0; n--) {
                    var s = allChars[n];
                    Math.abs(s.vis.x - this.vis.x) < 80 && Math.abs(s.vis.y - this.vis.y) < 80 ? s.teleportTo(this) : s.teleportationStatus < 0 && s.teleportContactEnd(this)
                } else this.isPusher && isDragging && selectedChar === this && (strenghtArrow.x = selectedChar.vis.x, strenghtArrow.y = selectedChar.vis.y)
        }
    }, i.loadToTube = function(e) {
        this.isGravityActivated || (this.vis.gotoAndStop(this.typeId + "_CLICKED"), createBubblePopPart(this.vis.x, this.vis.y, this)), this.isLoadedToTube = !0, this.isByPhysPosUpdate = !1, this.movePhysicsBodyOutOfField(), this.physBody.p.y = 0;
        createjs.Tween.get(this.vis, {
            override: !0
        }).to({
            x: e.vis.x,
            y: e.vis.y - 290 * e.scale
        }, 3 * Math.abs(this.vis.x - e.vis.x)).call(function() {
            playSound("tubeLoading")
        }).to({
            scaleX: .8,
            scaleY: .8,
            y: e.vis.y - 170 * e.scale
        }, 700).set({
            visible: !1
        }), createjs.Tween.get(this.vis).to({
            rotation: 0
        }, 250), checkWin()
    }, i.movePhysicsBodyOutOfField = function() {
        this.physBody.p.x = 200 * -allChars.indexOf(this) - 1e3
    }, i.updateTeleportation = function() {
        if (this.physBody)
            if (0 === this.teleportationStatus) {
                this.isByPhysPosUpdate = !1, this.teleportationStatus = 1, this.movePhysicsBodyOutOfField(), this.physBody.p.y = 0, this.teleportAngle = Math.atan2(this.physBody.vy, this.physBody.vx);
                var e = this;
                playSound("portalAppearSound"), createjs.Tween.get(this.vis, {
                    override: !0
                }).to({
                    rotation: 900,
                    scaleX: .05,
                    scaleY: .05,
                    x: this.startTeleport.vis.x,
                    y: this.startTeleport.vis.y
                }, 600).to({
                    x: this.aimTeleport.vis.x,
                    y: this.aimTeleport.vis.y
                }, 0).call(function() {
                    playSound("portalDisappearSound")
                }).to({
                    rotation: 0,
                    scaleX: this.scaleY,
                    scaleY: this.scaleY
                }, 600).call(function() {
                    e.teleportationStatus = 2
                })
            } else 2 == this.teleportationStatus && (this.physBody.p.x = this.aimTeleport.vis.x / PHYS_SCALE, this.physBody.p.y = this.aimTeleport.vis.y / PHYS_SCALE, this.physBody.w = 0, this.physBody.setAngle(0), this.physBody.setVel(v(TELEPORT_OUT_STRENGHT * Math.cos(this.teleportAngle), TELEPORT_OUT_STRENGHT * Math.sin(this.teleportAngle))), this.teleportationStatus = -1, this.isByPhysPosUpdate = !0)
    }, i.updateVisionScale = function() {
        this.vis.scaleX = this.scale, this.vis.scaleY = this.scaleY, this.isMovable && (this.vis.scaleX = this.vis.scaleY = this.scaleY), this.isReversed && (this.vis.scaleX *= -1), this.additVision.scaleX = this.vis.scaleX, this.additVision.scaleY = this.vis.scaleY
    }, i.dispose = function() {
        removeFromArray(allChars, this), this.isBall && removeFromArray(allBalls, this), this.isPusher && removeFromArray(allPushers, this), this.isBad && removeFromArray(allZombies, this), this.lastColliderType = -1, addToDisposed(this), this.vis.removeAllEventListeners(), this.disposePhysBody(), this.shape = null, this.vis.stop(), removeFromParent(this.vis), removeFromParent(this.additVision)
    }, i.collideWithOtherDynamic = function() {
        this.teleportationStatus > -1 || (this.isByPhysPosUpdate = !0)
    }, i.toggleFly = function() {}, i.heroRejoicing = function() {
        this.vis.gotoAndPlay(this.typeId)
    }, i.aimCollected = function() {
        createPrerenderedPart(this.vis.x, this.vis.y, 1.4, "parteffectv3", .71, this.vis, .8)
    }, i.teleportTo = function(e) {
        this.aimTeleport || (this.startTeleport = e, this.aimTeleport = e.teleportPartner, this.teleportationStatus = 0)
    }, i.teleportContactEnd = function(e) {
        this.aimTeleport === e && (this.startTeleport = null, this.aimTeleport = null)
    }, i.die = function(e, t, i) {
        if (!(isLevelCompleted || isLevelFailed || this.isDied)) {
            var n = doNothing;
            this.isPusher && (removeFromArray(allPushers, this), allPushers.length < 1 && (isLevelFailed = !0, n = showRestartWin, hideGameInterface()), playCaptainDownSound()), this.isBad && (removeFromArray(allZombies, this), allZombies.length < 1 && !isLevelCompleted && !isLevelFailed && (trace("level complete!"), showLevelCompleteWin())), i && (i.type === BONUS_DANGER_KUST_TYPE ? createPrerenderedPart(e, t + 1, 1.2, "parteffectv3", 1.3, null, .9) : createPrerenderedPart(e, t + 4, 1.3, "parteffectv4", .9, null, .9, i.vis.rotation)), this.isDied = !0, this.isByPhysPosUpdate = !1, createjs.Tween.get(this.vis, {
                override: !0
            }).to({
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                rotation: 900,
                x: e ? e : this.vis.x,
                y: t ? t : this.vis.y
            }, 300).wait(200).call(n), this.physBody && this.movePhysicsBodyOutOfField()
        }
    }, i.dieByWorldOut = function() {
        isLevelCompleted || isLevelFailed || (this.isPusher ? (isLevelFailed = !0, this.isDied = !0, this.isFly = !1, this.isByPhysPosUpdate = !1, hideGameInterface(), createjs.Tween.get(this.vis).wait(400).call(showRestartWin), this.physBody && this.movePhysicsBodyOutOfField(), playCaptainDownSound()) : this.isNeedDispose = !0)
    }, i.collideWithDyn = function() {
        this.isFirstCollided || (this.isFirstCollided = !0, this.isByPhysPosUpdate = !0)
    }, i.breakGlass = function() {
        !this.vis.visible || 15 > levelStartTimer || this.physBody && (this.disposePhysBody(), this.vis.visible = !1, this.type === GLASS_BLOCK_TYPE ? createGlassRectExplode(this.vis.x, this.vis.y, this.scale, this.vis.rotation) : createPartExplode(this.vis.x, this.vis.y, 3, PART_GLASS_TYPE, null, 3), playSound("glassBrakeSound"))
    }, i.activateBtn = function() {
        if (!this.isActivated) {
            this.isActivated = !0, this.vis.currentAnimationFrame = 1;
            for (var e, t = 0; t < allChars.length; t++) e = allChars[t], e.isMechanic && !e.isActivated && e.labelId === this.labelId && e.activateMechanic();
            playSound("clickSound")
        }
    }, i.deActivateBtn = function() {
        if (this.isActivated) {
            this.isActivated = !1, this.vis.currentAnimationFrame = 0;
            for (var e, t = 0; t < allChars.length; t++) e = allChars[t], e.isMechanic && e.isActivated && e.labelId === this.labelId && e.deActivateMechanic();
            playSound("clickSound")
        }
    }, i.activateMechanic = function() {
        this.isActivated = !0
    }, i.deActivateMechanic = function() {
        this.isActivated = !1
    }, i.toggleFan = function() {
        if (this.isActivated = !this.isActivated, this.isActivated) this.vis.gotoAndPlay("FAN_TYPE_ON"), awakeAllBodies(), playWindSound();
        else {
            this.vis.gotoAndStop("FAN_TYPE");
            for (var e = 0, t = allFans.length - 1; t >= 0; --t) allFans[t].isActivated && e++;
            1 > e && stopWindSound()
        }
    }, i.removeFromField = function() {
        this.disposePhysBody(), this.isByPhysPosUpdate = !1, currentRemovablesNum--;
        var e = this;
        createjs.Tween.get(this.vis).to({
            alpha: 0,
            scaleX: 0,
            scaleY: 0
        }, 250).call(function() {
            e.isNeedDispose = !0
        }), playRemoveObjectSound()
    }, i.disposePhysBody = function() {
        this.physBody && toDisposePhysicsBodies.push(this.physBody), this.physBody = null
    }, i.toggleConveyor = function() {
        this.isActivated ? (this.vis.stop(), this.physBody && (this.physBody.shapeList[0].surface_v.x = 0)) : (this.vis.play(), this.physBody && (this.physBody.shapeList[0].surface_v.x = -this.currSpeed * this.dir)), this.isActivated = !this.isActivated, awakeAllBodies()
    }, i.activateGravity = function() {
        this.isGravityActivated || (createBubblePopPart(this.vis.x, this.vis.y, this), playSound("bubblePop")), this.isNeedGravityActivate = !0
    }, e.CharBase = t
}(window);
var allChars = [],
    allBalls = [],
    allHeroes = [],
    allTubes = [],
    allZombies = [],
    allConveyors = [],
    disposedChars = [],
    allBombs = [],
    allMonsters = [],
    allActivators = [],
    allTeleports = [],
    allFans = [],
    allPushers = [],
    blockContainer, currentLevel = 0,
    isLevelCompleted = !1,
    isLevelFailed = !1,
    isInflateReason = !1,
    selectedChar, totalFriends = 0,
    totalBonuses = 0,
    collectedBonuses = 0,
    totalScore = 0,
    currentLevelScore = 0,
    currentTimeScore = 0,
    scoreToAdd = 0,
    strenghtArrow, levelRestartsCounter = 0,
    levelsWithoutRestartsCounter = 0,
    diamondsCounter = 0,
    bonusesCounter = 0,
    totalEnemies = 0,
    isLevelRestarted = !1,
    levelStartTimer = 0,
    BIG_DISTANCE = 1e8,
    mouseStartDx = 0,
    mouseStartDy = 0,
    lastMousePosX = 0,
    lastMousePosY = 0,
    isStretchSoundNeeded = !1,
    isDragging = !1,
    pushAngle = 0,
    pushStrenght = 0,
    STRENGHT_ARROW_FRAMES_NUM = 14,
    lastopenedlvl = 0,
    levelstates = [],
    LEVELS_NUM = 40,
    ZERO_STAR = 0,
    ONE_STAR = 1,
    TWO_STAR = 2,
    THREE_STAR = 3,
    ACHIEVS_NUM = 9,
    NOT_ACHIEVED = 0,
    ACHIEVED = 1,
    allachievs = [],
    GREAT_START_ACHIEV = 0,
    HALF_GAME_ACHIEV = 1,
    GAME_COMPLETE_ACHIEV = 2,
    MEGA_STAR_ACHIEV = 3,
    BOMBERMAN_ACHIEV = 4,
    MOVABLE_ACHIEV = 5,
    TELEPORT_ACHIEV = 6,
    BAD_CHAR_ACHIEV = 7,
    TEN_BONUS_ACHIEV = 8,
    isStorageSupported = !1,
    allInstructions = [],
    allBonuses = [],
    disposedBonuses = [],
    currentBon, toDisposeBonuses = [],
    HIDE_STATE = 0,
    SHOW_STATE = 1;
! function(e) {
    function t(e, t, i, n, s) {
        var a = new createjs.Sprite(zoeSS);
        a.mouseEnabled = !1, a.baseBlock = this, this.vis = a, this.reset(e, t, i, n, s)
    }
    var i = t.prototype;
    i.reset = function(t, i, n, s, a) {
        this.typeId = t, this.type = e[t], createjs.Tween.removeTweens(this.vis), this.vis.rotation = 0, this.tweenMaxSteps = 0, this.isNeedCollect = !1, this.additParams = a, this.parent = i, this.vis.isOnTop = !1, this.vis.isOnBottom = !0, this.vis.alpha = 1, this.isGhost = !1, this.isCanBeDestroyed = !1, this.isCollected = !1, this.animMargin = 30 * Math.random(), this.scaleX = n, this.scaleY = s, this.moveTarget = null, this.isActivated = !1, this.state = HIDE_STATE, this.hideWaitTime = 0, this.showWaitTime = 0, this.waitTimer = 0, this.dx = 0, this.dy = 0, this.speed = 0, this.distanceSq = 0, this.hero = null, this.dir = 1, this.isMustKill = !1, this.isDanger = !1, this.distanceEndX = 0, this.distanceStartX = 0, this.sensorRadiusSq = 1e4, this.collectRadiusSq = 400, this.setVisionByType(), this.updateVisionScale(), i.addChild(this.vis), this.isGhost || this.isDanger || totalBonuses++
    }, i.setPos = function(e, t, i) {
        this.vis.x = e, this.vis.y = t, this.isGhost && 0 === this.distanceStartX && (this.distanceEndX = 140 * this.scaleX - 52 * this.scaleY, this.distanceStartX = e - this.distanceEndX / 2, this.distanceEndX = e + this.distanceEndX / 2), i && (this.vis.rotation = i)
    }, i.updateVisionScale = function() {
        this.vis.scaleX = this.scaleX, this.vis.scaleY = this.scaleY, this.isGhost && (this.vis.scaleX = this.scaleY)
    }, i.getAdditParams = function(e) {
        return this.additParams[0].split("_")[e]
    }, i.setVisionByType = function() {
        this.vis.gotoAndStop(this.typeId), this.type === BONUS_DIAMOND_TYPE && (this.vis.play(), this.vis._animation.speed = 1.5), this.vis.paused || (this.vis.currentAnimationFrame = Math.floor(20 * Math.random())), this.type === BONUS_GHOST_TYPE ? (this.isGhost = !0, this.vis.play(), this.speed = parseInt(this.getAdditParams(0)) / 10, this.vis._animation.speed = .7, this.sensorRadiusSq = 625) : this.type === BONUS_DANGER_KUST_TYPE ? (this.isDanger = !0, this.sensorRadiusSq = 2025, this.vis.play()) : this.type === BONUS_HOLE_TYPE ? (this.isDanger = !0, this.sensorRadiusSq = 1600) : this.type === BONUS_KAKTUS_TYPE ? (this.isDanger = !0, this.sensorRadiusSq = 2025) : this.type === BONUS_DANGER_ACTIV_TYPE && (this.vis.gotoAndStop("BONUS_DANGER_ACTIVATING"), setNextAnimation(this.vis, "BONUS_DANGER_FULL_ACTIVATED"), this.vis.gotoAndStop("BONUS_DANGER_DISABLING"), setNextAnimation(this.vis, "BONUS_DANGER_ACTIV_TYPE"), this.vis.gotoAndStop("BONUS_DANGER_ACTIV_TYPE"), this.isDanger = !0, this.sensorRadiusSq = 2025, this.showWaitTime = this.getAdditParams(0), this.hideWaitTime = this.getAdditParams(1), this.waitTimer = this.getAdditParams(2))
    }, i.tick = function() {
        if (!this.isCanBeDestroyed && !isGamePaused) {
            var e = 0;
            if (this.isGhost) return void this.updateGhost();
            if (this.isDanger)
                for (e = allHeroesLen - 1; e >= 0; e--) this.hero = allHeroes[e], this.hero.isDied || (this.dx = Math.abs(this.hero.vis.x - this.vis.x), this.dy = Math.abs(this.hero.vis.y - this.vis.y), this.type === BONUS_DANGER_KUST_TYPE && this.dx < 50 && this.dy < 30 ? this.hero.die(this.vis.x, this.vis.y, this) : (this.type === BONUS_HOLE_TYPE || this.type === BONUS_KAKTUS_TYPE) && (this.isMustKill = !1, this.vis.rotation < -80 && this.vis.rotation > -100 || this.vis.rotation > 80 && this.vis.rotation < 100 ? this.dx < 33 && this.dy < 65 && (this.isMustKill = !0) : this.dx < 65 && this.dy < 30 && (this.isMustKill = !0), this.isMustKill && this.hero.die(this.vis.x, this.vis.y, this)));
            else if (this.vis.scaleX = this.scaleX + Math.cos((counter + this.animMargin) / 10) / 12, this.vis.scaleY = this.vis.scaleX, this.moveTarget) this.speed += .5, this.dx = this.moveTarget.vis.x - this.vis.x, this.dy = this.moveTarget.vis.y - this.vis.y, this.distanceSq = this.dx * this.dx + this.dy * this.dy, this.vis.x += this.dx / 3 * this.speed, this.vis.y += this.dy / 3 * this.speed, this.distanceSq < this.collectRadiusSq && (this.isCanBeDestroyed = !0, createPrerenderedPart(this.moveTarget.vis.x, this.moveTarget.vis.y, 2, "parteffectv1", .9, this.moveTarget.vis), addScore(this.getScoreByType()), this.checkBonusAchievByType(), this.moveTarget = null, playBonusPickSound());
            else
                for (e = 0; allHeroesLen > e; e++) this.hero = allHeroes[e], this.dx = this.hero.vis.x - this.vis.x, this.dy = this.hero.vis.y - this.vis.y, this.distanceSq = this.dx * this.dx + this.dy * this.dy, this.distanceSq < this.sensorRadiusSq && (this.moveTarget = this.hero, this.isCollected || (this.isCollected = !0, bonusesCounter++, collectedBonuses++))
        }
    }, i.updateDangerActiv = function() {
        this.waitTimer -= dtScale, this.waitTimer < 0 && (HIDE_STATE === this.state ? (this.vis.gotoAndPlay("BONUS_DANGER_ACTIVATING"), this.state = SHOW_STATE, this.waitTimer = this.showWaitTime, playSound("peacksSound")) : (this.vis.gotoAndPlay("BONUS_DANGER_DISABLING"), this.state = HIDE_STATE, this.waitTimer = this.hideWaitTime))
    }, i.updateGhost = function() {
        this.vis.x += this.speed * this.dir * dtScale, this.vis.x > this.distanceEndX && (this.dir = -1), this.vis.x < this.distanceStartX && (this.dir = 1);
        for (var e = 0; allBallsLen > e; e++) this.hero = allBalls[e], this.dx = this.hero.vis.x - this.vis.x, this.dy = this.hero.vis.y - this.vis.y, this.distanceSq = this.dx * this.dx + this.dy * this.dy, this.distanceSq < this.sensorRadiusSq && this.hero.die()
    }, i.checkBonusAchievByType = function() {
        for (var e = !0, t = 0; t < allBonuses.length; t++) allBonuses[t].isCanBeDestroyed || (e = !1)
    }, i.getScoreByType = function() {
        switch (this.type) {
            case BONUS_STAR_TYPE:
                return 2e3;
            case BONUS_DIAMOND_TYPE:
                return 150;
            case BONUS_MONEY_TYPE:
                return 100;
            default:
                return 50
        }
    }, i.dispose = function() {
        removeFromArray(allBonuses, this), addToDisposedBonuses(this), this.vis.removeAllEventListeners(), this.vis.stop(), this.parent.removeChild(this.vis)
    }, i.startCollectAnim = function() {}, e.BonusBase = t
}(window);
var isAudioSupported = !1,
    isMute = !1,
    creatureVoiceRandomizer, captainDownRandomizer, stretchSoundRandomizer, zombieFallRandomizer, captainStartSoundRandomizer, zombieSawDeathRandomizer, zombiePeakDeathRandomizer, scoresSound, windSound, bonusSoundNum = 0,
    achievSoundNum = 0,
    isWasTouch = !1,
    bgMusic, zombieHitTimer = -1,
    levelStartSoundNum = 0,
    ballHitTimer = -1,
    stretchSound, isMusicWasMuted = !1,
    pauseBtnV, playMenuBtn, creditsBtn, logoImg, levelSelectContainer, interfaceRestartBtn, isGamePaused, levelLabel, menuEase, edgeSheets = [],
    blinkWin, menuContainer, mainMenuMuteBtn, mainMenuMoreGames, mainMenuAchievBtn, MUTED_FRAME = "musicoffbtn",
    UNMUTED_FRAME = "musiconbtn",
    selectMenuBackBtn, selectMenuNextBtn, selectMenuPreviousBtn, allLevelBtns = [],
    levelsScreen1, levelsScreen2, levelsBtnCreateParams = {
        left: {
            val: 78,
            min: 0,
            max: 200
        },
        spaceX: {
            val: 121,
            min: 0,
            max: 200
        },
        top: {
            val: 85,
            min: 0,
            max: 200
        },
        scale: {
            val: .94,
            min: 0,
            max: 3
        },
        spaceY: {
            val: 139,
            min: 0,
            max: 200
        },
        txtScale: {
            val: .87,
            min: 0,
            max: 3
        },
        openedLevels: {
            val: openedLevels,
            min: 0,
            max: LEVELS_NUM
        }
    },
    LEVELS_ON_PAGE = 20,
    levelCompleteContainer, completeMoreGames, completeWinNextBtn, completeRestartBtn, completeQuitBtn, star1, star2, star3, completeLevelLabel, completeTotalScore, currentLevelStarsNum = 0,
    scoreTweenLength = 0,
    levelPauseContainer, pauseContinueBtn, pauseMuteBtn, pauseMoreGamesBtn, pauseRestartBtn, pauseQuitBtn, achievContainer, raduga, achievDesc, achievsReadyToShow = [],
    achGalleryMenuBackBtn, achGalleryContainer, achievGalleryDesc, achievGalleryLabelBg, allAchievsLabels = [],
    achievsBtnCreateParams = {
        left: {
            val: 151,
            min: 0,
            max: 200
        },
        spaceX: {
            val: 169,
            min: 0,
            max: 200
        },
        top: {
            val: 91,
            min: 0,
            max: 200
        },
        scale: {
            val: 1.1,
            min: 0,
            max: 3
        },
        spaceY: {
            val: 156,
            min: 0,
            max: 200
        }
    },
    creditsContainer, creditsDiscofish, creditsAnd, creditsPorubov, gameCompleteContainer, collectedStarsTxt, isGameCompleteScreenShow = !1,
    hitPoint, rotatedDecors = [],
    comixCont, comixFrame1, comixFrame2, comixFrame3, comixNextBtn, comixBg, comixIndex = 0,
    restartContainer, restartTitle, restartMoreGames, restartQuitBtn, restartAgainBtn, stage, exportRoot, canvas, rect, container, rotationContainer, particleContainer, winWidth, winHeight, scaleFactor = 1,
    styleScaleFactor = 1,
    minW = 640,
    minH = 712,
    ow = minW,
    oh = minH,
    maxW = minW,
    maxH = 1200,
    desctopMaxW = maxW,
    desctopMaxH = 1e3,
    viewportW = minW,
    viewportH = minH,
    stageLeft, stageTop, isHighDPI = !1,
    isWasPaused = null,
    topVisionLine, zoomFactor, timer, isPreventScroll = !0,
    MyGame = {},
    images, files;
MyGame.init = function() {
    try {
        canvas = document.getElementById("canvas"), images = images || {}, files = files || {}, stage = new createjs.Stage("canvas"), isLevelEditor && isNeedDebugGui && initDebugGui(), container = new createjs.Container, container.isRoot = !0, container.width = ow, container.height = oh, stage.addChild(container), detectBrowser(), blockContainer = new createjs.Container, splashContainer = new createjs.Container, splashContainer.width = ow, splashContainer.height = oh, particleContainer = new createjs.Container, rotationContainer = new createjs.Container, rotationContainer.width = ow, rotationContainer.height = oh, initResizeManager(), createjs.Touch.enable(stage, !0), isDesktop() && stage.enableMouseOver(20), stage.mouseMoveOutside = !0, isDefaultAndroid() && (isLowGfx = !0);
        var e = getURLParameter("hd");
        e && (isLowGfx = 1 != parseFloat(e)), initLoaders(), stage.update();
        var t = document.getElementById("loader");
        t && t.parentNode && t.parentNode.removeChild(t), onGameResize(), loadSponsorLogo()
    } catch (i) {
        trace(i.name + ":" + i.message)
    }
};
var loaderBar, bar, loaderWidth, preloaderSponsorCont, barHeight = 20,
    gameQuever, preloadQuever, preloaderSpinner, fpsText, helperLabel, zoeSS, interfaceSS, bgSS, preloaderChar, preloaderLine, isPreloaderReady = !1,
    TIMELINE_FILLER_SIZE = 541,
    moreGamesConfig = {
        action: sponsorClick
    },
    isAllFilesLoaded = !1,
    splashContainer, mainBg, isNeedCacheSizeUpdate = !1,
    counter = 0,
    animTicker = 0,
    toDisposePhysicsBodies = [],
    toDisposeChars = [],
    clickedChars = [],
    dtScale = 1,
    lastDelta = 0,
    FPS = 30,
    GAME_FPS = 30,
    defaultDelta = 1e3 / GAME_FPS,
    DEFAULT_WORLD_STEP = 1 / GAME_FPS,
    allBallsLen = 0,
    lastTime = 0,
    data, step = 0,
    allHeroesLen = 0,
    allTubesLen = 0,
    currentChar;
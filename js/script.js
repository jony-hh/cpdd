    const loading = {
    init() {
    document.querySelector(".loading").classList.add("loading_over");
},
    hidden() {
    gsap.timeline()
    .to(".loading_icon", {
    'width': '200vmax',
    'height': '200vmax',
    duration: 0.8,
    ease: 'power1.out',
    onComplete: () => {
    document.querySelector(".loading").classList.add("loading_hidden");
}
})
    .to(".loading", {
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out',
    onStart: () => {
    cards.show();
    audio.init();
}
}, "<0.2");
}
};
    const cards = {
    current_card: 'portrait',
    next_card: '',
    if_changing: false,
    show() {
    gsap.timeline()
    .to('.maintitle path', {
    'stroke-dashoffset': 0,
    duration: 1.8,
    ease: 'power4.out',
})
    .to('.portrait', {
    rotateY: '0deg',
    duration: 0.8,
    ease: 'power4.out',
}, "<")
    .to('.selectbox', {
    'transform': 'scaleX(1)',
    duration: 0.8,
    ease: 'power4.out',
}, "<");
},
    change_card(next) {
    if (this.if_changing || this.current_card == next)
    return 0;
    this.if_changing = true;
    this.next_card = next;
    document.querySelector(`.selectbox_selection_${next}`)
    .classList.add("selectbox_selection_selected");
    document.querySelector(`.selectbox_selection_${this.current_card}`)
    .classList.remove("selectbox_selection_selected");
    cards[this.current_card].hidden();
},
    check() {
    gsap.timeline()
    .to(`.${this.current_card}`, {
    rotateY: '90deg',
    duration: 0.3,
    ease: 'linear',
    onComplete: () => {
    cards[this.next_card].show();
}
})
    .to(`.${this.next_card}`, {
    rotateY: '0deg',
    duration: 0.3,
    ease: 'power1.out',
    onStart: () => {
    document.querySelector(`.${this.current_card}`)
    .style.visibility = 'hidden';
    this.current_card = this.next_card;
    document.querySelector(`.${this.next_card}`)
    .style.visibility = 'visible';
},
});
},
    portrait: {
    player: 0,
    prop_index: 0,
    props: [],
    faces: [],
    contents: [
    'cp滴滴滴滴滴滴滴滴，牵牵我的手，摸摸我的脸；我会给你惊喜哦~',
    '我这个月的工资只够买一支玫瑰，但我还是迫不及die给你买了',
    '喝奶茶吗？我有QQ咩咩好喝到噗叽噗叽茶！',
    '我有酒，还有故事，你有麦当劳吮指原味鸡吗？',
    '高跟鞋走路不方便，可不能委屈了我的小公主',
    '看我给你买的礼物，超级可爱的小熊熊欸~',
    '我用我老家房子抵押的钱，给你买了一个戒指',
    '这个粉色的麦克风特别适合你，我们一起去嗨歌吧~',
    '我这里有我洗澡的照片，你不想欣赏欣赏吗？',
    ],
    if_in: false,
    if_draged: false,
    if_dragable: false,
    limit_distance: 0,
    target_ele: {},
    init() {
    for (let i = 1; i <= 9; i++) {
    let face = new Image();
    face.src = `imgs/faces/face ${i}.jpg`;
    this.faces.push(face);
};
    for (let i = 1; i <= 9; i++) {
    let prop = new Image();
    prop.src = `imgs/props/prop ${i}.png`;
    this.props.push(prop);
};
    if (!if_pmd) {
    window.addEventListener("mousedown", () => {
    if (this.if_in) { this.if_dragable = true; };
});
    window.addEventListener("mouseup", () => {
    if (!this.if_draged && this.if_dragable) {
    gsap.to(this.target_ele, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power1.out"
});
}
    this.if_dragable = false;
});
    window.addEventListener("mousemove", () => {
    if (this.if_dragable) {
    this.move(event.clientX, event.clientY);
};
});
}
    else {
    window.addEventListener("touchstart", () => {
    if (this.if_in) { this.if_dragable = true; };
});
    window.addEventListener("touchend", () => {
    if (!this.if_draged && this.if_dragable) {
    gsap.to(this.target_ele, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power1.out"
});
}
    this.if_dragable = false;
    this.if_in = false;
});
    window.addEventListener("touchmove", () => {
    if (this.if_dragable) {
    this.move(event.touches[0].pageX, event.touches[0].pageY);
};
});
};
    this.creat_face();
},
    creat_face() {
    this.if_draged = false;
    let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "portrait_head_face");
    image.setAttribute("transform", "matrix(0.3077 0 0 0.3077 0 0)");
    image.setAttribute("width", 350);
    image.setAttribute("height", 350);
    image.setAttribute("href", this.faces[parseInt(Math.random() * 9)].src);
    if (!if_pmd) {
    g.onmouseenter = () => { this.if_in = true; };
    g.onmouseleave = () => { this.if_in = false; };
}
    else {
    image.ontouchstart = () => { this.if_in = true; };
}
    this.max_width = Math.max(innerWidth, innerHeight);
    this.limit_distance = Math.random() * this.max_width / 4 + this.max_width / 4;
    this.target_ele = g;
    g.appendChild(image);
    document.querySelector(".portrait_head svg").appendChild(g);
},
    move(x, y) {
    let distance = Math.pow(y - innerHeight / 2, 2) + Math.pow(x - innerWidth / 2, 2);
    distance = Math.sqrt(distance);
    let move_x = (x - innerWidth / 2) / this.limit_distance * 5;
    let move_y = (y - innerHeight / 2) / this.limit_distance * 5;
    gsap.to(this.target_ele, {
    x: `${move_x}px`,
    y: `${move_y}px`,
    duration: 0
});
    if (distance > this.limit_distance) {
    let ele = this.target_ele;
    this.if_draged = true;
    this.if_dragable = false;
    this.if_in = false;
    this.target_ele.onmouseenter = '';
    this.target_ele.onmouseleave = '';
    this.target_ele.ontouchstart = '';
    gsap.to(this.target_ele, {
    x: `${x - innerWidth / 2}px`,
    y: `${y - innerHeight / 2}px`,
    rotate: `${Math.random() * 90 - 45}deg`,
    opacity: 0,
    duration: 0.3,
    ease: 'power4.out',
    onComplete: () => {
    document.querySelector(".portrait_head svg").removeChild(ele);
}
});
    this.creat_face();
};
},
    change() {
    this.prop_index = (this.prop_index + 1) % this.props.length;
    if (this.player) this.player.kill()
    this.player = gsap.timeline()
    .to(".portrait_body_arm", {
    rotate: `60deg`,
    duration: 0.8,
    ease: 'power4.out'
})
    .to(".portrait_body_shoulder", {
    rotate: `5deg`,
    duration: 1,
    ease: 'power4.out',
}, "<")
    .to(".portrait_body_arm", {
    rotate: `0deg`,
    duration: 0.5,
    ease: 'power4.out',
    onStart: () => {
    document.querySelector(".portrait_body_arm_prop")
    .setAttribute("xlink:href", this.props[this.prop_index].src);
    document.querySelector(".portrait_chatbox_content")
    .innerText = this.contents[this.prop_index];
},
}, "<0.5")
    .to(".portrait_body_shoulder", {
    rotate: `0deg`,
    duration: 0.8,
    ease: 'power4.out'
}, "<")
    .to(".portrait_chatbox", {
    scale: '1.1',
    rotate: '0deg',
    duration: 0.2,
    ease: 'power4.out',
}, "<")
    .to(".portrait_chatbox", {
    scale: '1',
    rotate: '-5deg',
    duration: 0.2,
    ease: 'power4.out',
}, "<0.1")
},
    show() {
    gsap.to(".portrait_chatbox", {
    scale: 1,
    rotate: '-5deg',
    duration: 0.5,
    ease: 'power4.out',
    onComplete: () => {
    cards.if_changing = false;
}
});
},
    hidden() {
    cards.check();
    gsap.to(".portrait_chatbox", {
    scale: 0,
    rotate: '30deg',
    duration: 0.3,
    ease: 'power4.out',
});
},
},
    about: {
    show() {
    gsap.to(".about_title, .about_subtitle, .about_content", {
    transform: 'translateY(0%)',
    opacity: 1,
    duration: 0.3,
    ease: 'power1.out',
    stagger: 0.05,
    onComplete: () => {
    cards.if_changing = false;
}
});
},
    hidden() {
    cards.check();
    gsap.to(".about_title, .about_subtitle, .about_content", {
    transform: 'translateY(10%)',
    opacity: 0,
    duration: 0.3,
    ease: 'power1.out',
    stagger: 0.05,
});
},
},
    pictures: {
    current_picture: 0,
    ele_index: 0,
    if_changeing: false,
    imgs: [],
    eles: [...document.querySelectorAll(".pictures_picturebox div")],
    translate_datas: [
    ["0%", "100%", "200%"],
    ["0%", "100%", "-100%"],
    ["0", "-200%", "-100%"],
    ],
    init() {
    for (let i = 1; i <= 7; i++) {
    let img = new Image();
    img.src = `imgs/pictures/picture (${i}).jpg`;
    this.imgs.push(img);
};
},
    change_picture(distance) {
    if (!this.if_changeing) {
    this.if_changeing = true;
    setTimeout(() => {
    this.if_changeing = false;
}, 500)
    this.current_picture = (this.current_picture - distance + this.imgs.length) % this.imgs.length;
    this.ele_index = (this.ele_index + distance + 3) % 3;
    this.eles.forEach((ele, i) => {
    let nums = parseInt(ele.getAttribute('nums'));
    if (nums == 2 && distance == 1) {
    ele.setAttribute("nums", 0);
    ele.style.transition = "0s";
}
    else if (nums == 0 && distance == -1) {
    ele.setAttribute("nums", 2);
    ele.style.transition = "0s";
}
    else {
    ele.setAttribute("nums", nums + distance);
    ele.style.transition = "0.5s ease";
};
    if (nums == 0 && distance == 1)
    ele.querySelector("img").src = this.imgs[this.current_picture].src;
    if (nums == 2 && distance == -1)
    ele.querySelector("img").src = this.imgs[this.current_picture].src;
    ele.style.transform = `translateX(${this.translate_datas[i][this.ele_index]})`;
});
}
},
    show() {
    gsap.to(".pictures_button_left, .pictures_button_right", {
    transform: 'translateX(0%)',
    opacity: 1,
    duration: 0.8,
    ease: 'power4.out',
    onComplete: () => {
    cards.if_changing = false;
}
});
},
    hidden() {
    cards.check();
    gsap.timeline()
    .to(".pictures_button_left", {
    transform: 'translateX(100%)',
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out',
})
    .to(".pictures_button_right", {
    transform: 'translateX(-100%)',
    opacity: 0,
    duration: 0.8,
    ease: 'power4.out',
}, "<")
},
},
    contact: {
    show() {
    gsap.to(".contact_title, .contact_information, .contact_codes", {
    transform: 'translateY(0%)',
    opacity: 1,
    duration: 0.5,
    ease: 'power1.out',
    stagger: 0.1,
    onComplete: () => {
    cards.if_changing = false;
}
});
},
    hidden() {
    cards.check();
    gsap.to(".contact_title, .contact_information, .contact_codes", {
    transform: 'translateY(10%)',
    opacity: 0,
    duration: 0.5,
    ease: 'power1.out',
    stagger: 0.1,
});
},
},
}
    const background = {
    container: document.querySelector(".background"),
    init() {
    for (let i = 0; i < 20; i++) {
    let ele = document.createElement("img");
    ele.src = "imgs/icons/icon heart.svg";
    this.container.appendChild(ele);
    this.move(ele);
};
},
    move(ele) {
    let y_distance = Math.random() * 100 + innerHeight;
    ele.style.transform = `scale(${Math.random() + 0.5})`;
    ele.style.left = `${Math.random() * innerWidth}px`;
    ele.style.top = `${y_distance}px`;
    gsap.to(ele, {
    top: '-10rem',
    duration: Math.random() * 5 + 3,
    ease: 'linear',
    onComplete: () => {
    this.move(ele);
}
});
}
};
    const audio = {
    if_playing: true,
    gainNode: {},
    vol: 1,
    tone: 1,
    init() {
    const audioContext = new AudioContext();
    fetch('./audio/BG.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
    const playAudio = () => {
    const source = audioContext.createBufferSource();
    this.gainNode = audioContext.createGain();
    source.buffer = audioBuffer;
    source.playbackRate.value = this.tone;
    source.connect(this.gainNode);
    this.gainNode.connect(audioContext.destination);
    this.gainNode.gain.value = this.vol;
    source.start();
    source.onended = () => {
    this.tone += 0.1;
    if (this.tone >= 3) this.tone = 1;
    playAudio();
};
};
    playAudio();
}).catch(e => console.error(e));
},
    change_playstate() {
    if (this.if_playing) this.vol = 0;
    else this.vol = 1;
    this.gainNode.gain.value = this.vol;
    this.if_playing = !this.if_playing;
    document.querySelector(".musictip").classList.toggle("musictip_off");
}
};
    let if_pmd = false;
    window.addEventListener("load", () => {
    if (navigator.userAgent.indexOf("iPhone") != -1 ||
    navigator.userAgent.indexOf("iPad") != -1 ||
    navigator.userAgent.indexOf("iPod") != -1 ||
    navigator.userAgent.indexOf("Android") != -1
    ) { if_pmd = true; }
    loading.init();
    cards.portrait.init();
    cards.pictures.init();
    background.init();
});

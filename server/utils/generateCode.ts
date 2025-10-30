// Used by visit-session/[id]/create

export const generateToken = (
    _config: {
        characters?: string;
        length?: number;
    } = {}
) => {
    const { characters, length } = Object.assign(
        {
            characters: "0123456789",
            length: 4,
        },
        _config
    );

    let r: string = "";
    for (let i = 0; i < length; i++) {
        const index = ~~(Math.random() * length);
        r += characters[index];
    }

    return r;
};

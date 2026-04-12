var TrackType;
(function (TrackType) {
    TrackType["Vocals"] = "VOCALS";
    TrackType["Guitar"] = "GUITAR";
    TrackType["Bass"] = "BASS";
    TrackType["Drums"] = "DRUMS";
    TrackType["Synth"] = "SYNTH";
})(TrackType || (TrackType = {}));
function toSampleRate(n) {
    return n;
}
function createTrack(name, type) {
    const newTrack = {
        id: crypto.randomUUID(),
        name,
        type,
        sampleRate: toSampleRate(44100),
        signalChain: [0.8, 0.9, 0.0],
        createdAt: Date.now(),
        isMuted: false
    };
    return newTrack;
}
function processMixerEvent(event, track) {
    if (track.id !== event.trackId) {
        return track;
    }
    switch (event.kind) {
        case "mute":
            return { ...track, isMuted: event.muted };
        case "solo":
            return { ...track, isMuted: false };
        case "volume":
            return { ...track, signalChain: [track.signalChain[0], event.newOutputGain, track.signalChain[2]] };
        case "effect":
            return {
                ...track,
                tags: [...(track.tags ?? []), event.effectName]
            };
        default:
            const _ = event;
            return _;
    }
}
function describeTrackType(t) {
    switch (t) {
        case TrackType.Bass:
            return "Bass — low-frequency foundation of the track";
        case TrackType.Drums:
            return "Drums — rhythm and percussive elements";
        case TrackType.Guitar:
            return "Guitar — harmonic and melodic string instrument";
        case TrackType.Synth:
            return "Synthesizer — electronic sound generation";
        case TrackType.Vocals:
            return "Vocals — human voice performance";
        default:
            const _n = t;
            return _n;
    }
}
function createRecordedTrack(name, type, filePath, durationMs) {
    return {
        ...createTrack(name, type),
        filePath,
        durationMs
    };
}
function createLiveTrack(name, type, inputDevice, latencyMs) {
    return {
        ...createTrack(name, type),
        inputDevice,
        latencyMs
    };
}
const track = createTrack("Lead Vocal", TrackType.Vocals);
console.log(track);
console.log(processMixerEvent({ kind: "mute", trackId: track.id, muted: true }, track));
console.log(processMixerEvent({ kind: "volume", trackId: track.id, newOutputGain: 0.5 }, track));
console.log(describeTrackType(TrackType.Synth));
const recorded = createRecordedTrack("Song", TrackType.Drums, "/audio/song.wav", 180000);
const live = createLiveTrack("Mic", TrackType.Drums, "Focusrite USB", 12);
console.log(recorded);
console.log(live);
export {};
//# sourceMappingURL=index.js.map
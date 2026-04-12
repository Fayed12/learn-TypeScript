// =================================================================================

// project 18 ====> music Studio Mixer

// =================================================================================

enum TrackType { Vocals = "VOCALS", Guitar = "GUITAR", Bass = "BASS", Drums = "DRUMS", Synth = "SYNTH" }

type SampleRate = number & { readonly __brand: "SampleRate" };

function toSampleRate(n: 44100 | 48000 | 96000): SampleRate {
    return n as SampleRate
}

type SignalChain = [inputGain: number, outputGain: number, pan: number];

interface Track {
    readonly id: string;
    name: string;
    type: TrackType;
    sampleRate: SampleRate;
    signalChain: SignalChain;
    readonly createdAt: number;
    isMuted: boolean;
}

interface RecordedTrack extends Track { filePath: string; durationMs: number; }

interface LiveTrack extends Track { inputDevice: string; latencyMs: number; }

type MixerEvent =
    | { kind: "mute"; trackId: string; muted: boolean }
    | { kind: "solo"; trackId: string }
    | { kind: "volume"; trackId: string; newOutputGain: number }
    | { kind: "effect"; trackId: string; effectName: string; params: readonly number[] };

interface Track { tags?: readonly string[]; }

function createTrack(name: string, type: TrackType): Track {
    const newTrack: Track = {
        id: crypto.randomUUID(),
        name,
        type,
        sampleRate: toSampleRate(44100),
        signalChain: [0.8, 0.9, 0.0],
        createdAt: Date.now(),
        isMuted: false
    }

    return newTrack
}

function processMixerEvent(event: MixerEvent, track: Track): Track {
    if (track.id !== event.trackId) {
        return track
    }
    switch (event.kind) {
        case "mute":
            return { ...track, isMuted: event.muted }

        case "solo":
            return { ...track, isMuted: false }

        case "volume":
            return { ...track, signalChain: [track.signalChain[0], event.newOutputGain, track.signalChain[2]] }

        case "effect":
            return {
                ...track,
                tags: [...(track.tags ?? []), event.effectName]
            }

        default:
            const _: never = event
            return _
    }
}

function describeTrackType(t: TrackType): string {
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
            const _n: never = t;
            return _n;
    }
}

function createRecordedTrack(name: string, type: TrackType, filePath: string, durationMs: number): RecordedTrack {
    return {
        ...createTrack(name, type),
        filePath,
        durationMs
    }
}

function createLiveTrack(name: string, type: TrackType, inputDevice: string, latencyMs: number): LiveTrack {
    return {
        ...createTrack(name, type),
        inputDevice,
        latencyMs
    };
}

// test output

const track = createTrack("Lead Vocal", TrackType.Vocals)
console.log(track)
// → { id: "c3d4-...", name: "Lead Vocal", signalChain: [0.8, 0.9, 0.0], isMuted: false }

console.log(processMixerEvent({ kind: "mute", trackId: track.id, muted: true }, track))
// → { ...track, isMuted: true }

console.log(processMixerEvent({ kind: "volume", trackId: track.id, newOutputGain: 0.5 }, track))
// → { ...track, signalChain: [0.8, 0.5, 0.0] }

console.log(describeTrackType(TrackType.Synth))
// → "Synthesizer — electronic sound generation"

const recorded = createRecordedTrack("Song", TrackType.Drums, "/audio/song.wav", 180000);
const live = createLiveTrack("Mic", TrackType.Drums, "Focusrite USB", 12);

console.log(recorded)

console.log(live)
import {client} from "@/api/client.js";
import store from "@/store/index.js";

class AudioService {



  getNotesSegment() {
            // return client.get(`/video/notes_segment/f817b2ce-17db-4dcc-84bb-2f042e93dffc`,
            //     { headers: {Authorization: `Bearer ${store.getters.getAccessToken}`}})
            //     .then(response => response.data)

    return new Promise((resolve, reject) => {
      resolve(
  [
          {
            note: 'C4',
            frequency: 261.63,
            start: 0.93,
            end: 1.06
          },
          {
            note: 'D4',
            frequency: 293.66,
            start: 1.07,
            end: 1.24
          },
          {
            note: 'E4',
            frequency: 329.63,
            start: 1.25,
            end: 1.57
          },
          {
            note: 'CM',
            frequency: 125.68,
            start: 15.28,
            end: 18.47
          },
          {
              "note": "C4",
              "frequency": 261.63,
              "start": 1.58,
              "end": 1.76
          },
          {
              "note": "E4",
              "frequency": 329.63,
              "start": 1.77,
              "end": 1.85
          },
          {
              "note": "F4",
              "frequency": 349.23,
              "start": 1.86,
              "end": 3.02
          },
          {
              "note": "E4",
              "frequency": 329.63,
              "start": 3.03,
              "end": 3.18
          },
          {
              "note": "D4",
              "frequency": 293.66,
              "start": 3.19,
              "end": 4.1
          },
          {
              "note": "B3",
              "frequency": 246.94,
              "start": 4.22,
              "end": 4.33
          },
          {
              "note": "C4",
              "frequency": 261.63,
              "start": 4.34,
              "end": 4.91
          },
          {
              "note": "D4",
              "frequency": 293.66,
              "start": 4.92,
              "end": 5.26
          },
          {
              "note": "E4",
              "frequency": 329.63,
              "start": 5.27,
              "end": 6.44
          },
          {
              "note": "D4",
              "frequency": 293.66,
              "start": 6.45,
              "end": 6.68
          },
          {
              "note": "C4",
              "frequency": 261.63,
              "start": 6.69,
              "end": 7.74
          }
        ]
      );
    });
  }

  getNotesSegment2() {
        return new Promise((resolve, reject) => {
            resolve(
          [
                  {
                      "note": "A♯3",
                      "frequency": 233.08,
                      "start": 0.34,
                      "end": 0.42
                  },
                  {
                      "note": "C4",
                      "frequency": 261.63,
                      "start": 0.43,
                      "end": 0.66
                  },
                  {
                      "note": "C♯4",
                      "frequency": 277.18,
                      "start": 0.67,
                      "end": 0.75
                  },
                  {
                      "note": "D♯4",
                      "frequency": 311.13,
                      "start": 0.76,
                      "end": 0.91
                  },
                  {
                      "note": "D4",
                      "frequency": 293.66,
                      "start": 0.92,
                      "end": 1.23
                  },
                  {
                      "note": "B3",
                      "frequency": 246.94,
                      "start": 1.24,
                      "end": 1.52
                  },
                  {
                      "note": "E4",
                      "frequency": 329.63,
                      "start": 1.55,
                      "end": 2.97
                  },
                  {
                      "note": "D♯4",
                      "frequency": 311.13,
                      "start": 2.98,
                      "end": 3.09
                  },
                  {
                      "note": "D4",
                      "frequency": 293.66,
                      "start": 3.1,
                      "end": 3.5
                  },
                  {
                      "note": "C4",
                      "frequency": 261.63,
                      "start": 3.51,
                      "end": 3.61
                  },
                  {
                      "note": "A♯3",
                      "frequency": 233.08,
                      "start": 4.34,
                      "end": 4.84
                  },
                  {
                      "note": "C4",
                      "frequency": 261.63,
                      "start": 4.85,
                      "end": 5.26
                  },
                  {
                      "note": "D4",
                      "frequency": 293.66,
                      "start": 5.34,
                      "end": 5.57
                  },
                  {
                      "note": "C♯4",
                      "frequency": 277.18,
                      "start": 5.58,
                      "end": 5.79
                  },
                  {
                      "note": "D4",
                      "frequency": 293.66,
                      "start": 5.98,
                      "end": 7.22
                  },
                  {
                      "note": "C4",
                      "frequency": 261.63,
                      "start": 7.23,
                      "end": 7.56
                  },
                  {
                      "note": "A♯3",
                      "frequency": 233.08,
                      "start": 7.57,
                      "end": 8.36
                  },
                  {
                      "note": "A3",
                      "frequency": 220.0,
                      "start": 8.37,
                      "end": 8.54
                  }
                ]
            );
        });
    }

}

export default new AudioService();
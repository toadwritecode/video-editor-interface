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
              "note": "G4",
              "frequency": 392,
              "start": 1.15,
              "end": 1.81
          },
          {
              "note": "F4",
              "frequency": 349.23,
              "start": 1.82,
              "end": 2.6
          },
          {
              "note": "E4",
              "frequency": 329.63,
              "start": 2.61,
              "end": 3.34
          },
          {
              "note": "D4",
              "frequency": 293.66,
              "start": 3.35,
              "end": 3.75
          },
          {
              "note": "C4",
              "frequency": 261.63,
              "start": 3.76,
              "end": 4.64
          },
          {
              "note": "F♯4",
              "frequency": 369.99,
              "start": 4.94,
              "end": 5.18
          },
          {
              "note": "F4",
              "frequency": 349.23,
              "start": 5.19,
              "end": 5.54
          },
          {
              "note": "E4",
              "frequency": 329.63,
              "start": 5.55,
              "end": 5.82
          },
          {
              "note": "D4",
              "frequency": 293.66,
              "start": 5.83,
              "end": 6.26
          },
          {
              "note": "B3",
              "frequency": 246.94,
              "start": 6.27,
              "end": 7.23
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
                  "note": "A4",
                  "frequency": 440,
                  "start": 1.08,
                  "end": 1.76
              },
              {
                  "note": "F4",
                  "frequency": 349.23,
                  "start": 1.77,
                  "end": 2.51
              },
              {
                  "note": "E4",
                  "frequency": 329.63,
                  "start": 2.52,
                  "end": 3.24
              },
              {
                  "note": "D4",
                  "frequency": 293.66,
                  "start": 3.25,
                  "end": 3.6
              },
              {
                  "note": "C4",
                  "frequency": 261.63,
                  "start": 3.61,
                  "end": 4.33
              },
              {
                  "note": "A4",
                  "frequency": 440,
                  "start": 4.79,
                  "end": 5.08
              },
              {
                  "note": "F4",
                  "frequency": 349.23,
                  "start": 5.09,
                  "end": 5.5
              },
              {
                  "note": "E4",
                  "frequency": 329.63,
                  "start": 5.51,
                  "end": 5.8
              },
              {
                  "note": "D4",
                  "frequency": 293.66,
                  "start": 5.81,
                  "end": 6.19
              },
              {
                  "note": "C4",
                  "frequency": 261.63,
                  "start": 6.2,
                  "end": 6.72
              }
                ]
            );
        });
    }

}

export default new AudioService();
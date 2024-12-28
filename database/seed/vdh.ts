import type { SignVdh } from "~/lib/types"
import { signsVdhTable } from "../schema"
import type { DB } from "../seed"

export const seed = async (db: DB) => {
  for (const sign of signs) {
    await db.insert(signsVdhTable).values({
      id: crypto.randomUUID(),
      nr: sign.nr,
      name: sign.name,
      description: sign.description,
      type: sign.type,
      // combination: sign.combination,
      isSenior: sign.isSenior,
      inFront: sign.inFront
    })
  }
}

const signs: Array<SignVdh> = [
  {
    nr: "S",
    name: "Start",
    type: "B",
    description:
      "Nachdem der WR den Parcours freigegeben hat, überquert das Team die Startlinie im Tempo normal. Das Team muss vorher keine neue Grundstellung einnehmen, sondern kann sofort nach der Vorbereitung starten."
  },
  {
    nr: "F",
    name: "Finish",
    type: "B",
    description:
      "Die Bewertung der Übungen endet nach Überschreiten der Ziellinie. Danach darf der Hund ausgiebig belohnt werden durch Streicheln, Spielen und auch mit Leckerlis und Spielzeug."
  },
  {
    nr: "Z-0a",
    type: "A",
    name: "Hund rechtsherum Halt",
    isSenior: true,
    description:
      "Der HF gibt dem Hund das Signal, sich aus dem Vorsitzen rechtsherum um den HF zu bewegen. Wenn der Hund links vom HF angekommen ist, setzt der Hund sich in die Grundstellung. Während der Hund die Übung ausführt, darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "Z-0b",
    type: "A",
    name: "Hund linksherum Halt",
    description:
      "Der HF gibt dem Hund das Signal, sich aus dem Vorsitzen linksherum zum HF zu bewegen. Wenn der Hund links vom HF angekommen ist, setzt der Hund sich in die Grundstellung. Während der Hund die Übung ausführt, darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "Z-0c",
    type: "B",
    name: "Hund rechtsherum vorwärts",
    isSenior: true,
    description:
      "Der HF gibt dem Hund das Signal, sich aus dem Vorsitzen rechtsherum um den HF zu bewegen. Wenn der Hund links vom HF angekommen ist, gehen beide, ohne dass der Hund sich setzt, vorwärts weiter. Während der Hund die Übung ausführt, darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "Z-0d",
    type: "B",
    name: "Hund linksherum vorwärts",
    description:
      "Der HF gibt dem Hund das Signal, sich aus dem Vorsitzen linksherum zum HF zu bewegen. Wenn der Hund links vom HF angekommen ist, gehen beide, ohne dass der Hund sich setzt, vorwärts weiter. Während der Hund die Übung ausführt, darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "B-001",
    type: "A",
    name: "Halt",
    isSenior: true,
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der Hund kann sich von selber setzen oder vom HF per Hör- und/oder Sichtzeichen dazu aufgefordert werden."
  },
  {
    nr: "B-002",
    type: "A",
    name: "Halt - Platz",
    isSenior: true,
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung Der HF fordert den Hund dann per Hör- und/oder Sichtzeichen auf, sich hinzulegen."
  },
  {
    nr: "B-003",
    type: "A",
    name: "Halt - Platz - Sitz",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF fordert den Hund per Hör- und/oder Sichtzeichen auf, sich hinzulegen. Dann signalisiert der HF dem Hund, sich wieder in Sitz zu erheben."
  },
  {
    nr: "B-004",
    type: "A",
    name: "Halt - Um Hund herum",
    isSenior: true,
    description:
      'Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF kann dem Hund ein "Bleib"- bzw. "Warte"-Signal geben. Der HF geht vorwärts um den sitzenden Hund herum wieder zurück in die Grundstellung. Der Hund darf dabei seine Sitzposition nicht verändern. Der HF hält in der Grundstellung kurz an.'
  },
  {
    nr: "B-005",
    type: "A",
    name: "Halt - Platz - Um Hund herum",
    isSenior: true,
    description:
      'Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF signalisiert dem Hund, sich hinzulegen. Der HF kann dem Hund ein "Bleib-" bzw. "Warte"-Signal geben und geht vorwärts um den liegenden Hund herum und stellt sich wieder neben ihn. Der Hund darf dabei seine Platzposition nicht verändern. Der HF hält in der Fußposition kurz an.'
  },
  {
    nr: "B-006",
    type: "B",
    name: "Nach rechts",
    isSenior: true,
    inFront: true,
    description:
      "Hund und HF biegen vor dem Schild nach rechts ab und gehen ohne anzuhalten bei Fuß weiter."
  },
  {
    nr: "B-007",
    type: "B",
    name: "Nach links",
    isSenior: true,
    inFront: true,
    description:
      "Hund und HF biegen vor dem Schild nach links ab und gehen ohne anzuhalten bei Fuß weiter."
  },
  {
    nr: "B-008",
    type: "B",
    name: "Rechts kehrt",
    isSenior: true,
    inFront: true,
    description:
      "Hund und HF machen vor dem Schild eine enge 180°-Wendung nach rechts und gehen ohne anzuhalten bei Fuß weiter. Dabei ist ein kleiner Bogen erlaubt."
  },
  {
    nr: "B-009",
    type: "B",
    name: "Links kehrt",
    inFront: true,
    description:
      "Hund und HF machen vor dem Schild eine enge 180°-Wendung nach links und gehen ohne anzuhalten bei Fuß weiter.Dabei ist ein kleiner Bogen erlaubt."
  },
  {
    nr: "B-010",
    type: "B",
    name: "Kehrtwendung - Mensch nach links, Hund nach rechts",
    isSenior: true,
    inFront: true,
    description:
      "Der HF macht vor dem Schild eine enge 180°-Wendung nach links. Der Hund bleibt dabei nicht auf der linken Seite des HF, sondern geht rechts um den sich nach linksdrehenden HF herum, erreicht wieder die Fußposition und bewegt sich bei Fuß mit dem HF in die neue Richtung."
  },
  {
    nr: "B-011",
    type: "B",
    name: "270° rechts",
    inFront: true,
    description:
      "Das Team macht vor dem Schild eine 270° Wendung nach rechts. Der HF soll die Drehung auf der Stelle ausführen. Eine leichte Vorwärtsbewegung der Füße ist erlaubt. Der Hund bleibt in der Fußposition. Die Laufrichtung zur nächsten Station ist nach Vollendung der Wendung somit, gesehen von der ursprünglichen Position des HF aus, nach links."
  },
  {
    nr: "B-012",
    type: "B",
    name: "270° links",
    inFront: true,
    description:
      "Das Team macht vor dem Schild eine 270° Wendung nach links. Der HF soll die Drehung auf der Stelle ausführen. Eine leichte Vorwärtsbewegung der Füße ist erlaubt. Der Hund bleibt in der Fußposition. Die Laufrichtung zur nächsten Station ist nach Vollendung der Wendung somit, gesehen von der ursprünglichen Position des HF aus, nach rechts"
  },
  {
    nr: "B-013",
    type: "B",
    name: "360° rechts",
    isSenior: true,
    inFront: true,
    description:
      "Das Team leitet im Arbeitsbereich eine 360°-Wendung nach rechts ein. Der HF soll die Drehung auf der Stelle ausführen. Eine leichte Vorwärtsbewegung der Füße ist erlaubt. Der Hund bleibt in der Fußposition. Gesehen von der ursprünglichen Position des HF ändert sich die Laufrichtung nach Vollendung der Wendung nicht"
  },
  {
    nr: "B-014",
    type: "A oder B",
    name: "360° rechts",
    isSenior: true,
    inFront: true,
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen.\nDiesem Schild wird zwingend ein Zusatzschild aus den Schildern a-d zugefügt."
  },
  {
    nr: "B-015",
    type: "B",
    name: "Tempo langsam",
    isSenior: true,
    description:
      'Im Arbeitsbereich leitet das Team die Verringerung seiner Geschwindigkeit ein. Der Unterschied zum "Normaltempo" muss sowohl beim Mensch als auch beim Hund deutlich erkennbar sein. Das Tempo muss so lange beibehalten werden bis der Hund sein Tempo ändern muss oder durch eine Übung zum Stillstand kommen muss. Es kann aber auch die letzte Übung des Parcours sein. In diesem Fall endet die Übung, wenn das Team die Ziellinie überquert.'
  },
  {
    nr: "B-016",
    type: "B",
    name: "Tempo schnell",
    isSenior: true,
    description:
      'Im Arbeitsbereich leitet das Team die Erhöhung seiner Geschwindigkeit ein. Der Unterschied zum "Normaltempo" muss sowohl beim Mensch als auch beim Hund deutlich erkennbar sein. Das Team sollte so schnell sein, dass der Hund zumindest traben muss. Das Tempo muss so lange beibehalten werden bis der Hund sein Tempo ändern muss oder durch eine Übung zum Stillstand kommen muss. Es kann aber auch die letzte Übung des Parcours sein. In diesem Fall endet die Übung, wenn das Team die Ziellinie überquert.'
  },
  {
    nr: "B-017",
    type: "B",
    name: "Tempo normal",
    isSenior: true,
    description:
      "Im Arbeitsbereich leitet das Team die normale Geschwindigkeit ein, das für Hund und HF angenehm ist."
  },
  {
    nr: "B-018",
    type: "B",
    name: "Spirale rechts - Hund außen",
    isSenior: true,
    description:
      'Drei Pylonen werden in einem Abstand von 1,50 m auf einer gedachten Geraden aufgestellt. Die Richtungsangabe "rechts" bedeutet, dass der HF die Pylonen im Uhrzeigersinn (also rechtsherum) umkreist und der Hund dabei bei Fuß läuft (außen). Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt und ist lesbar aus der Richtung, aus der sich das Team nähert. Hund und HF gehen links vom Schild an der ersten Pylone vorbei auf die dritte Pylone zu. Sie gehen um sie herum zurück zur ersten Pylone, gehen um diese herum auf die zweite Pylone zu und um sie herum zur ersten Pylone, um diese noch einmal zu umkreisen. Jede der Spiralen bezieht somit die erste Pylone ein. In welche Richtung sich das Team aus der Spirale heraus bewegt, hängt von der Position des nächsten Schildes ab.'
  },
  {
    nr: "B-019",
    type: "B",
    name: "Spirale links - Hund innen",
    isSenior: true,
    description:
      'Drei Pylonen werden in einem Abstand von 1,50 m auf einer gedachten Geraden aufgestellt. Die Richtungsangabe "links" bedeutet, dass der HF die Pylonen gegen den Uhrzeigersinn (also links herum) umkreist und der Hund dabei bei Fuß laufen (innen). Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt und ist lesbar aus der Richtung, aus der sich das Team nähert. Hund und HF gehen rechts vom Schild an der ersten Pylone vorbei auf die dritte Pylone zu. Sie gehen um sie herum zurück zur ersten Pylone, gehen um diese herum auf die zweite Pylone zu und um sie herum zur ersten Pylone, um diese noch einmal zu umkreisen. Jede der Spiralen bezieht somit die erste Pylone ein. In welche Richtung sich das Team aus der Spirale heraus bewegt, hängt von der Position des nächsten Schildes ab.'
  },
  {
    nr: "B-020",
    type: "B",
    name: "Slalom einfach",
    isSenior: true,
    description:
      "Vier Pylonen werden in einem Abstand von 1,50 m auf einer gedachten Geraden aufgestellt. Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt. Der Eingang in den Slalom befindet sich zwischen der ersten und der zweiten Pylone, wobei sich die erste Pylone zur Linken des Teams befindet. Hund und HF gehen rechts vom Schild gemeinsam im Slalom um die Pylonen. In welche Richtung sich das Team aus dem Slalom heraus bewegt, hängt von der Position des nächsten Schildes ab."
  },
  {
    nr: "B-021",
    type: "B",
    name: "Slalom hin und zurück",
    isSenior: true,
    description:
      "Vier Pylonen werden in einem Abstand von 1,50 m auf einer gedachten Geraden aufgestellt. Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt. Der Eingang in den Slalom befindet sich zwischen der ersten und der zweiten Pylone zur Linken des Teams. Hund und HF gehen gemeinsam rechts vom Schild im Slalom um die Pylonen, umkreisen die letzte Pylone und gehen im Slalom zurück zum Ausgangspunkt. In welche Richtung sich das Team aus dem Slalom heraus bewegt, hängt von der Position des nächsten Schildes ab."
  },
  {
    nr: "B-022",
    type: "B",
    name: "Figur 8 ohne Ablenkung",
    isSenior: true,
    description:
      'Für diese Übung werden vier leere Schüsseln mit Abdeckung benötigt. Die vier Schüsseln werden so aufgestellt, dass sie die Eckpunkte einer gedachten Raute bilden. Die zwei Schüsseln an den "Endpunkten" der langen Geraden der Raute stehen 3 m auseinander, die anderen beiden Schüsseln an den "Seitenpunkten" der kürzeren Gerade etwa 1,50 m voneinander entfernt. Das Übungsschild steht auf der linken Seite und kennzeichnet den Eingang in die Figur 8. Das Team beginnt die Figur rechts vom Schild und es muss dann das Zentrum der Figur 3 x durchlaufen. Die „Acht“ wird komplett, durch die lange Seite, ohne anzuhalten absolviert. In welche Richtung sich das Team aus der Figur 8 heraus bewegt, hängt von der Position des nächsten Schildes ab.'
  },
  {
    nr: "B-023",
    type: "A",
    name: "Halt - Hund umrundet HF - Halt",
    isSenior: true,
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der Hund geht vorwärts um den HF herum und setzt sich wieder in Grundstellung. Der HF darf dabei seine Grundstellung nicht verändern."
  },
  {
    nr: "B-024",
    type: "A",
    name: "Halt - 1 Schritt vorwärts",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Dann gehen Hund und HF zusammen in Fußposition 1 Schritt nach vorne, halten an und der Hund setzt sich."
  },
  {
    nr: "B-025",
    type: "A oder B",
    name: "Vorsitz - 1 Schritt rückwärts",
    isSenior: true,
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Wenn der Hund in der Vorsitzposition ist, macht der HF einen Schritt rückwärts und hält an. Der Hund macht diese Bewegung mit, indem er sich vorwärts auf den HF zu bewegt und sich ein zweites Mal, wenn der HF anhält, in die Vorsitzposition setzt. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a-d zugefügt. Die Übung wird mit dem Zusatzschild gemeinsam bewertet."
  },
  {
    nr: "B-026",
    type: "B",
    name: "Kreisspirale - Hund außen",
    isSenior: true,
    description:
      "Die Pylonen werden in einem Abstand von 1,50 auf einer gedachten Geraden aufgestellt. Die Richtungsangabe „rechts“ bedeutet, dass der HF die Pylonen im Uhrzeigersinn (rechtsherum) umkreist und der Hund dabei bei Fuß läuft (außen). Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt und ist lesbar aus der Richtung, aus der sich das Team nähert. Das Team geht links am Schild vorbei und umkreist die erste Pylone, geht zur zweiten Pylone und umkreist diese um dann zur letzten Pylone zu gehen und diese ebenfalls zu umkreisen. In welche Richtung sich das Team danach weiterbewegt, hängt von der Position des nächsten Schildes ab."
  },
  {
    nr: "B-027",
    type: "B",
    name: "Kreisspirale - Hund innen",
    description:
      "Die Pylonen werden in einem Abstand von 1,50 auf einer gedachten Geraden aufgestellt. Die Richtungsangabe „links“ bedeutet, dass der HF die Pylonen gegen den Uhrzeigersinn (linksherum) umkreist und der Hund dabei bei Fuß läuft (innen). Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt und ist lesbar aus der Richtung, aus der sich das Team nähert. Das Team geht rechts am Schild vorbei und umkreist die erste Pylone, geht zur zweiten Pylone und umkreist diese um dann zur letzten Pylone zu gehen und diese ebenfalls zu umkreisen. In welche Richtung sich das Team danach weiterbewegt, hängt von der Position des nächsten Schildes ab."
  },
  {
    nr: "B-028",
    type: "B",
    name: "Loop rechts",
    isSenior: true,
    inFront: true,
    description:
      "Das Team macht vor dem Schild eine 210° Wendung nach rechts. Der HF soll die Drehung auf der Stelle ausführen. Eine leichte Vorwärtsbewegung der Füße ist erlaubt. Der Hund bleibt in der Fußposition. Die Laufrichtung zur nächsten Station ist nach Vollendung der Wendung somit, gesehen von der ursprünglichen Position des HF aus, nach links."
  },
  {
    nr: "B-029",
    type: "B",
    name: "Loop links",
    inFront: true,
    description:
      "Das Team macht vor dem Schild eine 210° Wendung nach links. Der HF soll die Drehung auf der Stelle ausführen. Eine leichte Vorwärtsbewegung der Füße ist erlaubt. Der Hund bleibt in der Fußposition. Die Laufrichtung zur nächsten Station ist nach Vollendung der Wendung somit, gesehen von der ursprünglichen Position des HF aus, nach rechts."
  },
  {
    nr: "B-030",
    type: "A",
    name: "Sitz - Bogen nach rechts - Sitz",
    isSenior: true,
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in Grundstellung. Hund und HF gehen in einem Bogen 3 Schritte nach rechts und der Hund setzt sich beim 2. Halt wieder in die Grundstellung."
  },
  {
    nr: "B-031",
    type: "A",
    name: "Sitz - Bogen nach links - Sitz",
    isSenior: true,
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in Grundstellung. Hund und HF gehen in einem Bogen 3 Schritte nach links und der Hund setzt sich beim 2. Halt wieder in die Grundstellung."
  },
  {
    nr: "B-032",
    type: "A",
    name: "Vorsitz - 1 Schritt rückwärts Platz",
    isSenior: true,
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Wenn der Hund in der Vorsitzposition ist, macht der HF einen Schritt rückwärts und hält an. Der Hund macht diese Bewegung mit, indem er sich vorwärts auf den HF zu bewegt und sich, wenn der HF anhält, hinlegt. Während des Vorsitzens, der Ausführung der Platzübung sowie des Zusatzschildes darf der HF seine Füße nicht bewegen. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a – d zugefügt. Die Übung wird mit dem Zusatzschild gemeinsam bewertet."
  },
  {
    nr: "1-101",
    type: "B",
    name: "360° links",
    description:
      "Das Team leitet im Arbeitsbereich eine 360°-Wendung nach links. Der HF soll die Drehung auf der Stelle ausführen. Eine leichte Vorwärtsbewegung der Füße ist erlaubt. Der Hund bleibt in der Fußposition. Gesehen von der ursprünglichen Position des HF ändert sich die Laufrichtung nach Vollendung der Wendung nicht."
  },
  {
    nr: "1-102",
    type: "B",
    name: "In Bewegung - Schritt zur Seite - rechts",
    isSenior: true,
    inFront: true,
    description:
      "Vor dem Schild leitet der HF mit dem rechten Fuß einen Schritt nach rechts zur Seite ein (kein Diagonalschritt). Der linke Fuß wird vom HF dann ebenfalls nach rechts und vorwärts gesetzt. Der Hund soll der Bewegung des linken Fußes ohne Zögern folgen. Diese Übung gilt als Richtungsänderung und muss vor dem Schild ausgeführt werden. Anschließend geht das Team rechts am Schild vorbei."
  },
  {
    nr: "1-103",
    type: "B",
    name: "Halt - 90° Drehung rechts - vorwärts",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF setzt mit den Füßen einen 90° Winkel nach rechts (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-104",
    type: "B",
    name: "Halt - 90° Drehung links - vorwärts",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF setzt mit den Füßen einen 90° Winkel nach links (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-105",
    type: "A",
    name: "Halt - 90° Drehung rechts - Halt",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF setzt mit den Füßen mit dem ersten Schritt einen 90° Winkel nach rechts (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition. Mit dem zweiten Schritt schließt der HF die Füße und der Hund setzt sich in Grundstellung."
  },
  {
    nr: "1-106",
    type: "A",
    name: "Halt - 90° Drehung links - Halt",
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF setzt mit den Füßen mit dem ersten Schritt einen 90° Winkel nach links (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition. Mit dem zweiten Schritt schließt der HF die Füße und der Hund setzt sich in Grundstellung."
  },
  {
    nr: "1-107",
    type: "A",
    name: "Sitz – 1 Schritt vorwärts Steh – 2 Schritte vorwärts Sitz – 3 Schritte vorwärts Platz",
    isSenior: true,
    description:
      "Der HF hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Dann signalisiert der HF dem Hund, bei Fuß zu gehen (kein Abruf), macht einen Schritt vorwärts, der HF hält an und der Hund steht an der Seite des HF. Als nächstes macht er zwei Schritte und hält an, der Hund setzt sich in Grundstellung. Danach macht er drei Schritte und hält an, Der Hund legt sich an die Seite des HF. Bei allen Vorwärtsbewegungen geht der Hund in Fußposition mit."
  },
  {
    nr: "1-108",
    type: "A oder B",
    name: "Vorsitz – 1 Schritt rückwärts Vorsteh – 2 Schritte rückwärts Vorsitz – 3 Schritte rückwärts Vorplatz",
    isSenior: true,
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Wenn der Hund in der Vorsitzposition ist, macht der HF einen Schritt rückwärts und hält an. Anschließend geht er zwei Schritte zurück und hält an, danach drei Schritte, bevor er anhält. Der Hund macht diese Bewegungen mit, indem er sich vorwärts auf den HF zu bewegt (kein Abruf) und sich, wenn der HF nach dem 1 Rückwärtsschritt anhält, ins Vorsteh begibt, beim 2mal Anhalten ins Vorsitz und beim 3mal Anhalten ins Vorplatz legt. Während des Vorsitz, Vorsteh, oder Vorplatz und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a- d zugefügt. Die Übung wird mit dem Zusatzschild gemeinsam bewertet."
  },
  {
    nr: "1-109",
    type: "A",
    name: "Anhalten - Platz",
    isSenior: true,
    description:
      "Das Team hält im Arbeitsbereich an und der Hund legt sich neben seinem HF. Der Hund darf sich nicht erst setzen. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt. Der Hund legt sich an die Seite des HF. Dabei darf der HF seine Position verändern. Wenn der Hund liegt, stellt sich der HF wieder neben den liegenden Hund."
  },
  {
    nr: "1-110",
    type: "B",
    name: "Halt - Schnell vorwärts aus Sitz",
    isSenior: true,
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in die Grundstellung. Der HF signalisiert dem Hund, bei Fuß zu gehen und setzt sich sofort in schnellem Tempo in Bewegung. Das Tempo muss so lange beibehalten werden bis der Hund sein Tempo ändern muss oder durch eine Übung zum Stillstand kommen muss. Es kann aber auch die letzte Übung des Parcours sein. In diesem Fall endet die Übung, wenn das Team die Ziellinie überquert."
  },
  {
    nr: "1-111",
    type: "B",
    name: "Slalom einfach mit Ablenkung",
    isSenior: true,
    description:
      "2 Pylonen und 2 Schalen werden in einem Abstand von 1,50 m auf einer gedachten Geraden aufgestellt. Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt. Die zwei mittleren Pylonen werden durch Schalen mit Futter und Spielzeug ersetzt. Das Futter muss gut zu riechen sein, gleichzeitig müssen Futter und Spielzeug jedoch so abgesichert werden, dass Hunde, die bei dieser Übung die Fußposition verlassen, daran gehindert werden, sich selbst zu belohnen. Der Eingang in den Slalom befindet sich zwischen der ersten Pylone und der ersten Verleitung zur Linken des Teams. Hund und HF gehen gemeinsam rechts vom Schild im Slalom um die Pylonen und Verleitungen. In welche Richtung sich das Team aus dem Slalom heraus bewegt, hängt von der Position des nächsten Schildes ab."
  },
  {
    nr: "1-112",
    type: "B",
    name: "180° Drehung rechts",
    isSenior: true,
    inFront: true,
    description:
      "Vor dem Schild dreht sich der HF auf der Stelle um 180° nach rechts (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-113",
    type: "B",
    name: "180° Drehung links",
    inFront: true,
    description:
      "Vor dem Schild dreht sich der HF auf der Stelle um 180° nach links (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-114",
    type: "A oder B",
    name: "Vorsitz – Schritt zur Seite – rechts",
    inFront: true,
    description:
      "Vor dem Schild fordert der HF den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Sowie der Hund die Vorsitzposition eingenommen hat, macht der HF einen deutlichen Schritt zur Seite nach rechts. Der Hund macht diese Bewegung unverzüglich mit und setzt sich dann wieder in den Vorsitz. Anschließend geht das Team rechts am Schild vorbei. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a-d zugefügt. Die Übung wird mit dem Zusatzschild gemeinsam bewertet."
  },
  {
    nr: "1-115",
    type: "A oder B",
    name: "Vorsitz – Schritt zur Seite – links",
    inFront: true,
    description:
      "Vor dem Schild fordert der HF den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Sowie der Hund die Vorsitzposition eingenommen hat, macht der HF einen deutlichen Schritt zur Seite nach links. Der Hund macht diese Bewegung unverzüglich mit und setzt sich dann wieder in den Vorsitz. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a-d zugefügt."
  },
  {
    nr: "1-116",
    type: "B",
    name: "Doppelkehrt - Mensch nach links, Hund nach rechts (zweimal)",
    isSenior: true,
    description:
      "Im Arbeitsbereich macht der HF eine Kehrtwendung von 180° nach links. Der Hund bleibt dabei nicht auf der linken Seite des HF, sondern geht rechts um den sich nach linksdrehenden HF herum, wenn der Hund die Fußposition wieder erreicht hat, wird die Übung nochmals wiederholt, so dass HF und Hund sich um 360° gedreht haben. Die Richtung in der es weiter geht ändert sich nicht. Die Drehung erfolgt auf der Stelle ohne Zwischenschritt."
  },
  {
    nr: "1-117",
    type: "B",
    name: "Figur 8 mit Ablenkung",
    isSenior: true,
    description:
      'Für diese Übung werden vier Schüsseln mit Futter und Spielzeug benötigt. Das Futter muss gut zu riechen sein, gleichzeitig müssen Futter und Spielzeug jedoch so abgesichert werden, dass Hunde, die bei dieser Übung die Fußposition verlassen, daran gehindert werden, sich selbst zu belohnen. Die vier Schüsseln werden so aufgestellt, dass sie die Eckpunkte einer gedachten Raute bilden. Die zwei Schüsseln an den "Endpunkten" der langen Geraden der Raute stehen 3 m auseinander, die anderen beiden Schüsseln an den "Seitenpunkten" der kürzeren Gerade etwa 1,50 m voneinander entfernt. Das Übungsschild steht auf der linken Seite und kennzeichnet den Eingang in die Figur 8. Das Team beginnt die Figur rechts vom Schild und muss dann das Zentrum der Figur 3 x durchlaufen. Die „Acht“ wird komplett ohne anzuhalten absolviert. In welche Richtung sich das Team aus der Figur 8 heraus bewegt, hängt von der Position des nächsten Schildes ab.'
  },
  {
    nr: "1-118",
    type: "A",
    name: "Anhalten Steh",
    isSenior: true,
    description:
      "Der HF hält im Arbeitsbereich an und steht neben seinem Hund. Der Hund darf sich nicht erst setzen. Der Hund stellt sich an die Seite des HF. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt."
  },
  {
    nr: "1-119",
    type: "B",
    name: "Steh – 90° Drehung rechts – vorwärts",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund stellt sich neben den HF in die Fußposition. Der HF setzt mit den Füßen einen 90° Winkel nach rechts (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-120",
    type: "B",
    name: "Steh – 90° Drehung links – vorwärts",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund stellt sich neben den HF in die Fußposition. Der HF setzt mit den Füßen einen 90° Winkel nach links (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-121",
    type: "B",
    name: "180° Drehung rechts, 180° Drehung links",
    description:
      "Im Arbeitsbereich macht der HF eine Drehung von 180° nach rechts (max. 4 Fußbewegungen), 2 Zwischenschritte und dann eine Drehung von 180° nach links. Der Hund bleibt in der Fußposition."
  },
  {
    nr: "1-122",
    type: "B",
    name: "180° Drehung links, 180° Drehung rechts",
    description:
      "Im Arbeitsbereich macht der HF eine Drehung von 180° nach links (max. 4 Fußbewegungen), 2 Zwischenschritte und dann eine Drehung von 180° nach rechts. Der Hund bleibt in der Fußposition"
  },
  {
    nr: "1-123",
    type: "B",
    name: "Wechsel hinter Hundeführer in Bewegung",
    description:
      "Aus der Bewegung heraus macht der Hund einen Seitenwechsel hinter dem HF. Die Fußseite wird dabei gewechselt. Der Hund darf keinen großen Bogen laufen."
  },
  {
    nr: "1-124",
    type: "A",
    name: "Sitz - Wechsel hinter Hundeführer - Sitz",
    description:
      "Der HF hält an und der Hund setzt sich in Grundstellung neben den HF. Der Hund macht einen Seitenwechsel hinter dem HF und setzt sich auf die andere Seite neben den HF. Die Fußseite wird dabei gewechselt."
  },
  {
    nr: "1-125",
    type: "A",
    name: "Sitz - Wechsel vor Hundeführer - Sitz",
    description:
      "Der HF hält an und der Hund setzt sich in Grundstellung neben den HF. Der Hund macht einen bogenförmigen Seitenwechsel vor dem HF, dann eine Drehung von außen nach innen und setzt sich neben den HF in Fußposition. Die Fußseite wird dabei gewechselt."
  },
  {
    nr: "2-201",
    type: "A",
    name: "Halt - 90° Drehung rechts - 1 Schritt - Halt",
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF setzt mit den Füßen einen 90° Winkel nach rechts (aus dem Stand nur eine Fußbewegung, die Füße berühren sich) danach macht er mit dem anderen Fuß einen Schritt in diese Richtung und hält an. Der Hund bleibt in der Fußposition und setzt sich in Grundstellung."
  },
  {
    nr: "2-202",
    type: "A",
    name: "Halt - 90° Drehung links - 1 Schritt - Halt",
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF setzt mit den Füßen einen 90° Winkel nach links (aus dem Stand nur eine Fußbewegung, die Füße berühren sich) danach macht er mit dem anderen Fuß einen Schritt in diese Richtung und hält an. Der Hund bleibt in der Fußposition und setzt sich in Grundstellung."
  },
  {
    nr: "2-203",
    type: "A",
    name: "Halt - 180° Drehung rechts - Halt",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach rechts (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition und setzt sich beim zweiten Halt wieder in die Grundstellung."
  },
  {
    nr: "2-204",
    type: "A",
    name: "Halt - 180° Drehung links - Halt",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in die Grundstellung. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach links (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition und setzt sich beim zweiten Halt wieder in Grundstellung."
  },
  {
    nr: "2-205",
    type: "B",
    name: "Halt – 180° Drehung rechts - vorwärts",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in die Grundstellung. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach rechts (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "2-206",
    type: "B",
    name: "Halt – 180° Drehung links - vorwärts",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in die Grundstellung. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach links (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "2-207",
    type: "A",
    name: "Halt - Schritt zur Seite – rechts - Halt",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund setzt sich in die Grundstellung. Der HF macht mit dem rechten Fuß einen Schritt zur Seite nach rechts, zieht den linken Fuß nach und hält an. Auch ein Kreuzschritt nach rechts ist möglich. Gleichzeitig signalisiert der HF dem Hund, bei Fuß zu gehen. Idealerweise verlässt der Hund die Fußposition nicht, geht seitwärts bei Fuß und setzt sich nach dem Anhalten sofort wieder in die Grundstellung. Anschließend geht das Team rechts am Schild vorbei."
  },
  {
    nr: "2-208",
    type: "B",
    name: "Hund umrundet HF in Bewegung",
    isSenior: true,
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Umrunden des HF auf."
  },
  {
    nr: "2-209",
    type: "A",
    name: "Halt - Steh",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF gibt dem Hund ein Signal, sich hinzustellen."
  },
  {
    nr: "2-210",
    type: "A",
    name: "Halt – Steh – Sitz",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF gibt dem Hund ein Signal, sich hinzustellen. Danach gibt er das Signal zum Sitz."
  },
  {
    nr: "2-211",
    type: "A",
    name: "Halt - Weggehen",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF signalisiert dem Hund zu bleiben und geht zum nächsten Schild.",
    combination: [
      "2-213",
      "2-214",
      "2-215",
      "2-216",
      "Z-0a",
      "Z-0b",
      "Z-0c",
      "Z-0d",
      "3-309",
      "3-308",
      "3-319",
      "3-320",
      "3-321",
      "3-322"
    ]
  },
  {
    nr: "2-212",
    type: "A",
    name: "Anhalten – Platz – Weggehen",
    description:
      "Der HF hält im Arbeitsbereich an und steht neben seinem Hund. Der Hund darf sich nicht erst setzen. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt. Der Hund legt sich an die Seite des HF. Dabei darf der HF seine Position verändern. Dann gibt der HF dem Hund ein Signal zum Bleiben und geht zum nächsten Schild.",
    combination: [
      "2-213",
      "2-214",
      "2-215",
      "2-216",
      "Z-0a",
      "Z-0b",
      "Z-0c",
      "Z-0d",
      "3-302",
      "3-308",
      "3-319",
      "3-320"
    ]
  },
  {
    nr: "2-213",
    type: "A",
    name: "Umdrehen – zurück zum Hund",
    description:
      "Im Arbeitsbereich dreht sich der HF zu seinem Hund um, geht zum Hund zurück und stellt sich in die Fußposition aus der vorherigen Übung an die Seite des Hundes."
  },
  {
    nr: "2-214",
    type: "A oder B",
    name: "Umdrehen – Abruf in Vorsitz",
    description:
      "Vor diesem Schild dreht sich der HF um zum Hund. Dann ruft er den Hund ab in Vorsitzposition. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "2-215",
    type: "B",
    name: "Ohne Umdrehen – bei Fuß rufen",
    isSenior: true,
    description:
      "Im Arbeitsbereich bleibt der HF stehen und ruft seinen Hund in die linke Fußposition. Dabei darf der HF seinen Oberkörper bewegen, die Füße müssen aber in Laufrichtung stehen bleiben. Während der Hund die Übung ausführt, darf der HF seine Füße nicht bewegen. Ist der Hund in der Fußposition begibt sich das Team, ohne dass der Hund sich vorher setzt, zur nächsten Station."
  },
  {
    nr: "2-216",
    type: "B",
    name: "Umdrehen – Abrufen bei Fuß",
    description:
      "Vor diesem Schild dreht sich der HF um zum Hund. Er gibt dem Hund ein Signal zum Herankommen in die Fußposition. Ob der Hund links oder rechts rum kommt bleibt dem HF überlassen. Ist der Hund in der linken Fußposition, begibt sich das Team, ohne dass der Hund sich vorher setzt, zur nächsten Station."
  },
  {
    nr: "2-217",
    type: "B",
    name: "Hund über Hürde - Mensch dicht neben her",
    description:
      "Der Sprung erfolgt über eine offene Hürde. Das Übungsschild kann sich beliebig links oder rechts am Laufweg des HF befinden, mind. 5 m vor der Hürde. Die Übung beginnt im Arbeitsbereich in der Fußposition. Das Sicht- bzw. Hörzeichen für den Sprung kann auch nach dem Ende des Arbeitsbereiches gegeben werden. Der HF schickt den Hund zur Hürde und signalisiert ihm, darüber zu springen, während er am Sprung entlanggeht. Wenn der Hund gesprungen ist, ruft der HF ihn in Fußposition und das Team setzt seinen Weg bei Fuß zur nächsten Station fort. Wenn der Hund viel schneller ist als der HF, kann der Hund zum HF zurückgerufen werden. Die nachfolgenden Schilder stehen mind. 5m vom Sprung entfernt."
  },
  {
    nr: "2-218",
    type: "B",
    name: "Aus letzter Position – Weggehen zum Abruf über Hürde",
    description:
      "Dieses Übungsschild wird zwingend in einer Kombination mit einer stationären Übung (Typ A) gestellt und befindet sich mind. 5m vor der Hürde. Der HF signalisiert dem Hund in der zuletzt eingenommenen Position aus dem Kombinationsschild zu bleiben und geht am Sprung vorbei zum nächsten Schild.",
    combination: ["2-215", "2-216", "Z-0a"]
  },
  {
    nr: "2-219",
    type: "B",
    name: "Hund Kreis nach außen – aus Bewegung – vorwärts",
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und der Hund dreht an der Seite des HF einen vollen Kreis nach außen und begibt sich wieder in die Fußposition."
  },
  {
    nr: "2-220",
    type: "B",
    name: "Slalom hin und zurück - mit Ablenkung",
    isSenior: true,
    description:
      "Zwei Pylonen und zwei Futterschüsseln werden in einem Abstand von 1,50 m auf einer gedachten Geraden aufgestellt. Das Übungsschild wird in der Nähe der ersten Pylone aufgestellt. Die zwei mittleren Pylonen werden durch Schalen mit Futter und Spielzeug ersetzt. Das Futter muss gut zu riechen sein, gleichzeitig müssen Futter und Spielzeug jedoch so abgesichert werden, dass Hunde, die bei dieser Übung die Fußposition verlassen, daran gehindert werden, sich selbst zu belohnen. Der Eingang in den Slalom befindet sich zwischen der ersten Pylone und der ersten Verleitung zur Linken des Teams. Hund und HF gehen gemeinsam rechts vom Schild im Slalom um die Pylonen und Verleitungen, umkreisen die letzte Pylone und gehen im Slalom zurück zum Ausgangspunkt. In welche Richtung sich das Team aus dem Slalom heraus bewegt, hängt von der Position des nächsten Schildes ab."
  },
  {
    nr: "2-221",
    type: "A or B",
    name: "Vor - Steh 1,2,3 Schritte rückwärts",
    isSenior: true,
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Vor - Stehen auf. Während der Hund sich bewegt, um sich vor den HF zu stellen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Wenn der Hund in der Vor-Steh-Position ist, macht der HF einen Schritt rückwärts und hält an. Anschließend geht er zwei Schritte zurück und hält an, danach drei Schritte, bevor er anhält. Der Hund macht diese Bewegungen mit, indem er sich vorwärts auf den HF zu bewegt und sich jedes Mal, wenn der HF anhält, vor dem HF stehen bleibt. Während des Vor-Stehens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a - d zugefügt."
  },
  {
    nr: "2-222",
    type: "A or B",
    name: "Vorsitz – Schritt zur Seite links-Schritt zur Seite rechts - Vorsitz",
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und fordert den Hund in der Bewegung zum Vorsitzen auf. Während der Hund sich bewegt, um sich vor den HF zu setzen, darf der HF bis zu vier Schritte rückwärtsgehen. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Sowie der Hund die Vorsitzposition eingenommen hat, macht der HF einen deutlichen Parallelschritt zur Seite nach links. Der Hund macht diese Bewegung unverzüglich mit und setzt sich dann wieder in den Vorsitz. Danach macht der HF einen deutlichen Parallelschritt nach rechts. Wieder macht der Hund diese Bewegung unverzüglich mit und setzt sich dann wieder in den Vorsitz. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "2-223",
    type: "A",
    name: "Steh – 90° Drehung rechts – Steh",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund stellt sich in Fußposition. Der HF setzt mit den Füßen mit dem ersten Schritt einen 90° Winkel nach rechts (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition. Mit dem zweiten Schritt schließt der HF die Füße und der Hund stellt sich in Fußposition."
  },
  {
    nr: "2-224",
    type: "A",
    name: "Steh – 90° Drehung links – Steh",
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund stellt sich in Fußposition. Der HF setzt mit den Füßen mit dem ersten Schritt einen 90° Winkel nach links (aus dem Stand nur eine Fußbewegung, die Füße berühren sich). Der Hund bleibt in der Fußposition. Mit dem zweiten Schritt schließt der HF die Füße und der Hund stellt sich in Fußposition."
  },
  {
    nr: "2-225",
    type: "B",
    name: "Steh – 180° Drehung rechts - vorwärts",
    isSenior: true,
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund stellt sich in die Fußposition. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach rechts (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "2-226",
    type: "B",
    name: "Steh – 180° Drehung links - vorwärts",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund stellt sich in die Fußposition. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach links (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition."
  },
  {
    nr: "2-227",
    type: "A",
    name: "Steh – 1,2,3 Schritte vorwärts",
    isSenior: true,
    description:
      "Der HF hält im Arbeitsbereich an und der Hund bleibt neben dem HF stehen. Dann signalisiert der HF dem Hund, bei Fuß zu gehen (kein Abruf), macht einen Schritt vorwärts und hält an. Als nächstes macht er zwei Schritte und hält an, danach drei Schritte und hält an. Der Hund geht bei Fuß mit und stellt sich bei jedem Anhalten neben den HF."
  },
  {
    nr: "2-228",
    type: "A",
    name: "Grundstellung – 1 Schritt rückwärts – Grundstellung",
    description:
      "Der HF hält im Arbeitsbereich an, Hund sitzt in Grundstellung. HF geht einen Schritt rückwärts, Hund macht die Rückwärtsbewegung in der Fußposition mit und sitzt wieder in Grundstellung, wenn HF anhält"
  },
  {
    nr: "2-229",
    type: "A",
    name: "Halt - Schritt zur Seite – links – Halt",
    inFront: true,
    description:
      "Das Team hält im Arbeitsbereich vor dem Schild an und der Hund setzt sich in die Grundstellung. Der HF macht mit dem linken Fuß einen Schritt zur Seite nach links, zieht den rechten Fuß nach und hält an. Auch ein Kreuzschritt nach links ist möglich. Gleichzeitig signalisiert der HF dem Hund, bei Fuß zu gehen. Idealerweise verlässt der Hund die Fußposition nicht, geht seitwärts bei Fuß und setzt sich nach dem Anhalten sofort wieder in die Grundstellung. Anschließend geht das Team links am Schild vorbei."
  },
  {
    nr: "2-230",
    type: "A",
    name: "Halt - 90° Drehung rechts - 1 Schritt – Halt-Abruf ins Fußposition-Halt",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der Hund bleibt sitzen, während der HF eine 90° Drehung nach rechts ausführt, danach macht der HF mit dem anderen Fuß einen Schritt in vorgegebene Richtung und bleibt stehen. Der Hund wird nun in die Fußposition gerufen und sobald er dort angekommen ist setzt er sich in die Grundstellung."
  },
  {
    nr: "2-231",
    type: "A",
    name: "Halt - 90° Drehung links - 1 Schritt – Halt-Abruf ins Fußposition-Halt",
    isSenior: true,
    inFront: true,
    description:
      "Der HF hält vor dem Schild an und der Hund setzt sich in Grundstellung. Der Hund bleibt sitzen, während der HF eine 90° Drehung nach links ausführt, danach macht der HF mit dem anderen Fuß einen Schritt in vorgegebene Richtung und bleibt stehen. Der Hund wird nun in die Fußposition gerufen und sobald er dort angekommen ist setzt er sich in die Grundstellung."
  },
  {
    nr: "2-232",
    type: "B",
    name: "Wendung - Mensch und Hund drehen aufeinander zu",
    inFront: true,
    description:
      "Das Team macht vor dem Schild eine 180°- Wendung aufeinander zu. Nach der Drehung befindet sich der Hund auf der anderen Seite des HF, erreicht wieder die Fußposition und bewegt sich bei Fuß mit dem HF in die neue Richtung. Der Hund wechselt dabei die Fußposition."
  },
  {
    nr: "3-301",
    type: "A",
    name: "Halt – Bleib - im Winkel weggehen",
    description:
      "Das Übungsschild kann sich beliebig links oder rechts am Laufweg des HF befinden. Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF signalisiert dem Hund zu bleiben und geht zum nächsten Schild. In Kombination mit den Schilder 302 Z a-d, 319 Z a-d, 215 und 216. Die Schilder stehen mind. 3m entfernt und ca. 1,80 m vom Ende seitlich des Arbeitsbereiches nach rechts oder links seitlich verschoben.",
    combination: ["3-302", "3-319", "2-215", "2-216"]
  },
  {
    nr: "3-302",
    type: "A or B",
    name: "Umdrehen - Abrufen aus Winkel in Vorsitz",
    inFront: true,
    description:
      "Der HF dreht sich vor dem Schild um und ruft den Hund in Vorsitz ab. Dieses Schild steht mind. 3 m von der vorherigen Station entfernt und ist ca. 180 cm nach rechts oder links vom Ende seitlich des Arbeitsbereiches des vorherigen Schildes verschoben, so dass der Hund aus einem Winkel in den Vorsitz kommen muss. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Dieser Übung muss ein Zusatzschild aus den Nr. a-d angeschlossen werden. Die Übung wird mit dem Zusatzschild gemeinsam bewertet. Die Distanz des Schildes in Kombination mit dem Sprung 3-314 sollte unbedingt größer bemessen werden, mindestens 5m.",
    combination: ["Z-0a", "Z-0b", "Z-0c", "Z-0d"]
  },
  {
    nr: "3-303",
    type: "A",
    name: "Steh - Um Hund herum",
    isSenior: true,
    description:
      "Der HF hält im Arbeitsbereich an und steht neben seinem Hund. Der Hund darf sich nicht erst setzen. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt. Dann geht der HF vorwärts um den stehenden Hund herum wieder zurück in die Fußposition. Der Hund darf dabei seine Stehposition nicht verändern. Der HF hält in der Fußposition kurz an."
  },
  {
    nr: "3-304",
    type: "A",
    name: "Halt – Steh – Platz",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF gibt das Signal zum Steh. Nach dem der Hund steht, gibt er das Signal zum Platz."
  },
  {
    nr: "3-305",
    type: "A",
    name: "Halt – Platz - Steh",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in Grundstellung. Der HF gibt das Signal zum Platz. Dann gibt er das Signal zum Steh."
  },
  {
    nr: "3-306",
    type: "B",
    name: "Steh-3 Schritte rückwärts - Vorwärts",
    description:
      "Der HF hält im Arbeitsbereich an und steht neben seinem Hund. Der Hund darf sich nicht erst setzen. Der Hund steht dabei an der Seite des HF. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt. Aus der Fußposition geht der HF drei deutliche Schritte rückwärts, wobei der Hund ihn in Fußposition rückwärts folgt. Beim Zurückgehen darf der Hund sich nicht setzen oder seitwärts gehen. Danach signalisiert der HF dem Hund bei Fuß vorwärts zur nächsten Übung zu gehen."
  },
  {
    nr: "3-307",
    type: "A",
    name: "Anhalten - Steh – Weggehen",
    isSenior: true,
    description:
      "Der HF hält im Arbeitsbereich an und steht neben seinem Hund. Der Hund darf sich nicht erst setzen. Der Hund steht dabei an der Seite des HF. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt. Der HF signalisiert dem Hund im Steh zu bleiben.",
    combination: [
      "2-213",
      "2-214",
      "2-215",
      "2-216",
      "3-302",
      "3-308",
      "3-309",
      "3-319",
      "3-320",
      "3-321",
      "3-322"
    ]
  },
  {
    nr: "3-308",
    type: "A oder B",
    name: "Umdrehen – Abruf in Platz – Abruf in Vorsitz",
    description:
      "Im Arbeitsbereich dreht der HF sich vor dem Schild um und ruft den Hund. Nachdem der Hund sich in Bewegung gesetzt hat, gibt der HF ein Signal für Platz. Der Hund muss spätestens nach 2/3 der Abrufstrecke (Markierung) im Platz sein. Wenn der Hund liegt, ruft der HF ihn erneut ab, diesmal zum Vorsitz. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Dieser Übung muss ein Zusatzschild aus den Nr. a-d angeschlossen werden."
  },
  {
    nr: "3-309",
    type: "A oder B",
    name: "Umdrehen – Platz aus Entfernung – Sitz aus Entfernung – Abrufen in Vorsitz",
    description:
      "Im Arbeitsbereich dreht sich der HF vor dem Schild zum Hund um und gibt ihm das Signal zum Platz aus der Entfernung. Wenn der Hund die Position Platz eingenommen hat, bekommt er ein weiteres Signal zum Sitz aus der Entfernung. Der Hund soll die Übungen möglichst auf der Stelle ausführen. Wenn der Hund sitzt, ruft der HF ihn zum Vorsitz ab. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Dieser Übung muss ein Zusatzschild aus den Nr. a-d angeschlossen werden.",
    combination: ["Z-0a", "Z-0b", "Z-0c", "Z-0d"]
  },
  {
    nr: "3-310",
    type: "A",
    name: "Sitz aus Bewegung",
    description:
      "Der HF gibt ohne anzuhalten im Arbeitsbereich dem Hund das Signal zum Sitz und signalisiert dem Hund, dass er dort sitzen bleiben soll. Er darf seinen Körper während des Vorwärtsgehens zum Hund drehen muss aber in der Vorwärtsbewegung bleiben. Der Hund muss innerhalb einer Körperlänge die Position einnehmen. Der HF geht weiter zum nächsten Schild.",
    combination: [
      "2-213",
      "2-215",
      "2-216",
      "3-320",
      "3-321",
      "3-322",
      "2-214",
      "3-302",
      "3-308",
      "3-309",
      "3-319"
    ]
  },
  {
    nr: "3-311",
    type: "A",
    name: "Platz aus Bewegung",
    description:
      "Der HF gibt ohne anzuhalten im Arbeitsbereich dem Hund das Signal zum Platz und signalisiert dem Hund, dass er dort liegen bleiben soll. Er darf seinen Körper während des Vorwärtsgehens zum Hund drehen muss aber in der Vorwärtsbewegung bleiben. Der Hund muss innerhalb einer Körperlänge die Position einnehmen. Der HF geht weiter zum nächsten Schild.",
    combination: [
      "2-213",
      "2-215",
      "2-216",
      "3-320",
      "3-321",
      "2-214",
      "3-302",
      "3-308",
      "3-309",
      "3-319"
    ]
  },
  {
    nr: "3-312",
    type: "A",
    name: "Steh aus Bewegung",
    description:
      "Der HF gibt ohne anzuhalten im Arbeitsbereich dem Hund das Signal zum Steh und signalisiert dem Hund, dass er dort stehen bleiben soll. Er darf seinen Körper während des Vorwärtsgehens zum Hund drehen muss aber in der Vorwärtsbewegung bleiben. Der Hund muss innerhalb einer Körperlänge die Position einnehmen. Der HF geht weiter zum nächsten Schild.",
    combination: [
      "2-213",
      "2-215",
      "2-216",
      "3-320",
      "3-321",
      "3-322",
      "2-214",
      "3-302",
      "3-308",
      "3-309",
      "3-319"
    ]
  },
  {
    nr: "3-313",
    type: "B",
    name: "Hund über Hürde - Mensch neben her",
    description:
      "Der Sprung erfolgt über eine offene Hürde. Das Übungsschild kann sich beliebig links oder rechts am Laufweg des HF befinden, mind. 5 m vor der Hürde. Die Übung beginnt im Arbeitsbereich in der Fußposition. Das Sicht- bzw. Hörzeichen für den Sprung kann auch nach dem Ende des Arbeitsbereiches gegeben werden. Der HF schickt den Hund zur Hürde und signalisiert ihm, darüber zu springen, während er entlang einer gekennzeichneten Linie ca. 1,80 m zur Rechten der Hürde nach vorne geht. Wenn der Hund gesprungen ist, ruft der HF ihn in Fußposition und das Team setzt seinen Weg bei Fuß zur nächsten Station fort. Wenn der Hund viel schneller ist als der HF, kann der Hund zum HF zurückgerufen werden. Die nachfolgenden Schilder stehen mind. 5m vom Sprung entfernt."
  },
  {
    nr: "3-314",
    type: "B",
    name: "Aus letzter Position - Weggehen zum Schrägabruf über Hürde",
    description:
      "Das Übungsschild kann sich beliebig links oder rechts am Laufweg des HF befinden und wird zwingend in einer Kombination mit einer stationären Übung (Typ A) gestellt. Das Schild steht mind. 5 m vor der Hürde. Dabei steht der Sprung ca. 1,8 m rechts oder links versetzt vom Ende seitlich des Arbeitsbereiches. Der HF signalisiert dem Hund in der zuletzt eingenommenen Position aus dem Kombinationsschild zu bleiben und geht am Sprung vorbei zum nächsten Schild. Dieses Schild kann mit folgenden Abrufschildern kombiniert werden: 302, 319 Z a-d und 215, 216. Die Schilder stehen mind. 5m vom Sprung entfernt ca. 1,80 m nach rechts oder links verschoben.",
    combination: ["3-302", "3-319", "2-215", "2-216"]
  },
  {
    nr: "3-315",
    type: "B",
    name: "Aus Bewegung Hund Außenkreis– Mensch Außenkreis - vorwärts",
    description:
      "Im Arbeitsbereich leitet der HF die Übung ein und der Hund macht neben dem HF einen vollen Kreis nach außen, während sich gleichzeitig der HF vom Hund wegdreht und einen vollen Kreis ebenfalls nach außen macht. Nach Beendigung der Drehungen trifft sich das Team wieder in Fußposition und geht in gleicher Richtung wie vorher zur nächsten Station."
  },
  {
    nr: "3-316",
    type: "A",
    name: "Steh - 180° Drehung rechts - Steh",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund stellt sich in die Fußposition. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach rechts (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition. Nach der Drehung hält der HF an und der Hund steht in Fußposition."
  },
  {
    nr: "3-317",
    type: "A",
    name: "Steh – 180° Drehung links - Steh",
    inFront: true,
    description:
      "Das Team hält vor dem Schild an und der Hund stellt sich in die Fußposition. Der HF signalisiert dem Hund, bei Fuß zu gehen und dreht sich auf der Stelle um 180° nach links (max. 4 Fußbewegungen). Der Hund bleibt in der Fußposition. Nach der Drehung hält der HF an und der Hund stellt sich erneut in die Fußposition."
  },
  {
    nr: "3-318",
    type: "A",
    name: "Anhalten Steh – Hund umrundet HF - Steh",
    isSenior: true,
    description:
      "Der HF hält im Arbeitsbereich an und steht neben seinem Hund. Der Hund darf sich nicht erst setzen. Die Füße des HF stehen parallel, ein schulterbreiter Stand ist erlaubt. Der HF signalisiert dem Hund aus dem Steh vorwärts den HF zu umrunden um sich danach wieder in die Fußposition zu stellen. Während der Hund die Übung ausführt darf der HF seine Füße nicht bewegen."
  },
  {
    nr: "3-319",
    type: "A oder B",
    name: "Ohne Umdrehen Abruf ins Vorsitz",
    description:
      "Im Arbeitsbereich bleibt der HF stehen und ruft seinen Hund in den Vorsitz. Dabei darf der HF seinen Oberkörper bewegen, die Füße müssen aber in Laufrichtung stehen bleiben. Der Hund muss über die Fußseite der vorherigen Bleib-Übung in die Vorsitzübung kommen. Ist der Hund in der Fußposition, darf der HF bis zu 4 Schritte rückwärtsgehen um dem Hund die Einnahme des Vorsitzes zu erleichtern. Er muss dabei gerade gehen und darf sich nicht seitwärts bewegen und dadurch die Position korrigieren. Während des Vorsitzens und bei der Ausführung des Zusatzschildes darf der HF seine Füße nicht bewegen. Dieser Übung muss ein Zusatzschild aus den Nr. a-d angeschlossen werden.",
    combination: ["Z-0a", "Z-0b", "Z-0c", "Z-0d"]
  },
  {
    nr: "3-320",
    type: "A",
    name: "Umdrehen – Abruf in Platz – zurück zum Hund",
    description:
      "Im Arbeitsbereich dreht der HF sich um und ruft den Hund. Nachdem der Hund sich in Bewegung gesetzt hat, gibt der HF ein Signal für Platz. Der Hund muss spätestens nach 2/3 der Abrufstrecke (Markierung) im Platz sein. Der HF darf während des Abrufs die Füße nicht bewegen. Wenn der Hund liegt, geht der HF zurück zu seinem Hund und stellt sich an die Fußposition aus der vorherigen Bleibübung."
  },
  {
    nr: "3-321",
    type: "B",
    name: "Umdrehen - Abruf in Platz – Abruf bei Fuß",
    description:
      "Vor diesem Schild dreht der HF sich um und ruft den Hund. Nachdem der Hund sich in Bewegung gesetzt hat, gibt der HF ein Signal für Platz. Der Hund muss spätestens nach 2/3 der Abrufstrecke (Markierung) im Platz sein. Der HF darf während des Abrufs die Füße nicht bewegen. Wenn der Hund liegt, ruft der HF seinen Hund. Ist der Hund in der linken Fußposition, begibt sich das Team, ohne dass der Hund sich vorher setzt, zur nächsten Station."
  },
  {
    nr: "3-322",
    type: "A",
    name: "Umdrehen - Platz aus Entfernung – Sitz aus Entfernung - zurück zum Hund",
    description:
      "Im Arbeitsbereich dreht sich der HF zum Hund um und gibt ihm das Signal zum Platz aus der Entfernung. Wenn der Hund die Position Platz eingenommen hat, bekommt er ein weiteres Signal zum Sitz aus der Entfernung. Der Hund soll die Übungen möglichst auf der Stelle ausführen. Der HF darf während der Ausführung die Füße nicht bewegen. Wenn der Hund sitzt, geht der HF zurück zu seinem Hund und stellt sich an Fußseite aus der letzten Bleibübung."
  },
  {
    nr: "3-323",
    type: "A oder B",
    name: "Halt - Wegrennen - Abrufen in Vorsitz aus Laufschritt",
    description:
      "Das Team hält im Arbeitsbereich an und der Hund setzt sich in die Grundstellung. Der HF signalisiert dem Hund, zu warten und bewegt sich im Laufschritt vorwärts, mit dem Rücken zum Hund. Nach mindestens drei Laufschritten ruft der HF den Hund aus dem Laufen heraus zum Vorsitzen. Der Hund muss sich sofort in Bewegung setzen, um den HF einzuholen. Wenn der Hund die Fußposition erreicht hat, darf der HF noch bis vier Schritte rückwärtsgehen, um dem Hund das Einnehmen der Vorsitzposition zu erleichtern. Beim Vorsitzen und während der Hund den Vorsitz ausführt, darf der HF seine Füße nicht bewegen. Die Geschwindigkeit, in der sich der HF vorwärtsbewegt, ist abhängig von der Fähigkeit des Hundes, ihn einzuholen. Sie muss sich jedoch eindeutig von der Normalgeschwindigkeit unterscheiden. Diesem Schild wird zwingend ein Zusatzschild aus den Schildern a-d zugefügt. Die Übung erfordert einen Mindestabstand zur nächsten Station von 8m.",
    combination: ["Z-0a", "Z-0b", "Z-0c", "Z-0d"]
  },
  {
    nr: "3-324",
    type: "B",
    name: "Senden zur Pylone - Steh",
    description:
      "Im Arbeitsbereich nimmt das Team in Richtung Pylone, die seitlich versetzt 5 m neben dem Arbeitsbereich positioniert wird, eine Grundstellung ein. Der HF schickt den Hund zur Pylone. Im Umkreis von max. 1 m zur Pylone wird der Hund in die Position Steh gestoppt. Der Hund bleibt in dieser Position neben der Pylone stehen während der HF sich zum folgenden Abrufschild begibt. Dieses Schild kann mit folgenden Abrufschildern kombiniert werden: 302, 319 Z a-d und 215, 216.",
    combination: ["3-302", "3-319", "2-215", "2-216"]
  },
  {
    nr: "3-325",
    type: "B",
    name: "Wechsel 180° rechts",
    description:
      "Im Arbeitsbereich nimmt das Team in Richtung Pylone, die seitlich versetzt 5 m neben dem Arbeitsbereich positioniert wird, eine Grundstellung ein. Der HF schickt den Hund zur Pylone. Im Umkreis von max. 1 m zur Pylone wird der Hund in die Position Steh gestoppt. Der Hund bleibt in dieser Position neben der Pylone stehen während der HF sich zum folgenden Abrufschild begibt. Dieses Schild kann mit folgenden Abrufschildern kombiniert werden: 302, 319 Z a-d und 215, 216."
  },
  {
    nr: "3-326",
    type: "B",
    name: "Wechsel 180° links",
    inFront: true,
    description:
      "Im Arbeitsbereich macht der Hund und der HF vor dem Schild jeweils eine 180° Drehung nach links und gehen dann in die entgegengesetzte Richtung weiter. Der Hund wechselt dabei die Fußposition."
  },
  {
    nr: "3-327",
    type: "B",
    name: "In Bewegung - Seitenwechsel vor dem Hundeführer",
    description:
      "Im Arbeitsbereich macht der Hund einen Seitenwechsel vor dem HF und nimmt die Fußposition auf der anderen Seite wieder ein. Der Hund wechselt indem er schräg vor den HF läuft und die neue Fußposition auf der anderen Seite einnimmt. Er darf hierbei keinen Kreis laufen um den Seitenwechsel auszuführen."
  }
] as const

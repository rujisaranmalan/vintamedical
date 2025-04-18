export type DomainKey = "domain1" | "domain2" | "domain3" | "domain4";

// Each evaluation metric has an ID, description, and maximum score.
export interface EvaluationMetric {
  id: string;
  description: string;
  maxScore: number;
}

export const domainLabels: Record<DomainKey, string> = {
  domain1: "Communication Skills",
  domain2: "General History Taking",
  domain3: "Disease-Specific History",
  domain4: "Diagnosis",
};

export const evaluationMetrics: Record<
  string,
  Record<DomainKey, EvaluationMetric[]>
> = {
  "Peptic ulcer disease": {
    domain1: [
      {
        id: "1.1",
        description: "แนะนำตัว แจ้งชื่อ-สกุล ผู้ซักประวัติ",
        maxScore: 4,
      },
      { id: "1.2", description: "ถามชื่อ-สกุลของผู้ป่วย", maxScore: 4 },
      { id: "1.3", description: "ขออนุญาตและแจ้งวัตถุประสงค์", maxScore: 4 },
      {
        id: "1.4",
        description:
          "ใช้คำถามมีความต่อเนื่อง เชื่อมโยง และมีจังหวะการรับฟังเหมาะสม",
        maxScore: 6,
      },
      { id: "1.5", description: "เปิดโอกาสให้ผู้ป่วยซักถาม", maxScore: 2 },
    ],
    domain2: [
      { id: "2.1", description: "ตำแหน่งที่มีอาการปวดท้อง", maxScore: 3 },
      { id: "2.2", description: "ปวดทันทีหรือค่อยๆมากขึ้น", maxScore: 3 },
      {
        id: "2.3",
        description: "ลักษณะการปวดท้อง (ปวดบีบ/จุกแน่น/ปวดตื้อๆ)",
        maxScore: 2,
      },
      { id: "2.4", description: "ปวดร้าวไปที่ใด", maxScore: 2 },
      {
        id: "2.5",
        description: "ปวดตลอดเวลาหรือมีอาการปวดเป็นพักๆ",
        maxScore: 2,
      },
      {
        id: "2.6",
        description: "ปัจจัยที่ทำให้อาการปวดดีขึ้นหรือแย่ลง",
        maxScore: 2,
      },
      {
        id: "2.7",
        description: "ขณะมีอาการปวดท้องกำลังทำอะไรอยู่",
        maxScore: 2,
      },
      {
        id: "2.8",
        description: "อาการปวดท้องในอดีตที่มีลักษณะคล้ายกัน",
        maxScore: 2,
      },
      { id: "2.9", description: "ประวัติเคยผ่าตัดช่องท้อง", maxScore: 2 },
      {
        id: "2.10",
        description: "โรคประจำตัวและยาที่ใช้เป็นประจำ",
        maxScore: 2,
      },
      { id: "2.11", description: "ประวัติการสูบบุหรี่", maxScore: 2 },
      { id: "2.12", description: "ประวัติดื่มสุรา/การใช้ยาประจำ", maxScore: 2 },
      { id: "2.13", description: "ประวัติการรักษาก่อนมาพบแพทย์", maxScore: 2 },
      {
        id: "2.14",
        description: "ประวัติอุบัติเหตุก่อนมีอาการหรือไม่",
        maxScore: 2,
      },
    ],
    domain3: [
      {
        id: "3.1",
        description: "Episodic burning epigastric pain",
        maxScore: 6,
      },
      {
        id: "3.2",
        description:
          "Symptoms worse after eating, on an empty stomach and nighttime awakening",
        maxScore: 6,
      },
      {
        id: "3.3",
        description: "Symptoms relieved with food and antacids",
        maxScore: 6,
      },
      { id: "3.4", description: "Melena or hematemesis", maxScore: 6 },
      {
        id: "3.5",
        description:
          "Less common symptoms: nausea, vomiting, loss of appetite, bloating",
        maxScore: 6,
      },
    ],
    domain4: [
      {
        id: "4.1",
        description: "Diagnosis: Peptic ulcer disease",
        maxScore: 20,
      },
    ],
  },
  "Acute pancreatitis": {
    domain1: [
      {
        id: "1.1",
        description: "แนะนำตัว แจ้งชื่อ-สกุล ผู้ซักประวัติ",
        maxScore: 4,
      },
      { id: "1.2", description: "ถามชื่อ-สกุลของผู้ป่วย", maxScore: 4 },
      { id: "1.3", description: "ขออนุญาตและแจ้งวัตถุประสงค์", maxScore: 4 },
      {
        id: "1.4",
        description:
          "ใช้คำถามมีความต่อเนื่อง เชื่อมโยง และมีจังหวะการรับฟังเหมาะสม",
        maxScore: 6,
      },
      { id: "1.5", description: "เปิดโอกาสให้ผู้ป่วยซักถาม", maxScore: 2 },
    ],
    domain2: [
      { id: "2.1", description: "ตำแหน่งที่มีอาการปวดท้อง", maxScore: 3 },
      { id: "2.2", description: "ปวดทันทีหรือค่อยๆมากขึ้น", maxScore: 3 },
      {
        id: "2.3",
        description: "ลักษณะการปวดท้อง (ปวดบีบ/จุกแน่น/ปวดตื้อๆ)",
        maxScore: 2,
      },
      { id: "2.4", description: "ปวดร้าวไปที่ใด", maxScore: 2 },
      {
        id: "2.5",
        description: "ปวดตลอดเวลาหรือมีอาการปวดเป็นพักๆ",
        maxScore: 2,
      },
      {
        id: "2.6",
        description: "ปัจจัยที่ทำให้อาการปวดดีขึ้นหรือแย่ลง",
        maxScore: 2,
      },
      {
        id: "2.7",
        description: "ขณะมีอาการปวดท้องกำลังทำอะไรอยู่",
        maxScore: 2,
      },
      {
        id: "2.8",
        description: "อาการปวดท้องในอดีตที่มีลักษณะคล้ายกัน",
        maxScore: 2,
      },
      { id: "2.9", description: "ประวัติเคยผ่าตัดช่องท้อง", maxScore: 2 },
      {
        id: "2.10",
        description: "โรคประจำตัวและยาที่ใช้เป็นประจำ",
        maxScore: 2,
      },
      { id: "2.11", description: "ประวัติการสูบบุหรี่", maxScore: 2 },
      { id: "2.12", description: "ประวัติดื่มสุรา/การใช้ยาประจำ", maxScore: 2 },
      { id: "2.13", description: "ประวัติการรักษาก่อนมาพบแพทย์", maxScore: 2 },
      {
        id: "2.14",
        description: "ประวัติอุบัติเหตุก่อนมีอาการหรือไม่",
        maxScore: 2,
      },
    ],
    domain3: [
      { id: "3.1", description: "severe epigastric and RUQ pain", maxScore: 6 },
      {
        id: "3.2",
        description: "Pain from gallstones: sudden onset",
        maxScore: 6,
      },
      {
        id: "3.3",
        description:
          "Pain from anything related to ethanol or alcohol: more gradual onset",
        maxScore: 6,
      },
      {
        id: "3.4",
        description: "Characteristics include acute and constant pain",
        maxScore: 6,
      },
      { id: "3.5", description: "Radiation to the back", maxScore: 6 },
    ],
    domain4: [
      { id: "4.1", description: "Diagnosis: Acute pancreatitis", maxScore: 20 },
    ],
  },
  "Food poisoning": {
    domain1: [
      {
        id: "1.1",
        description: "แนะนำตัว แจ้งชื่อ-สกุล ผู้ซักประวัติ",
        maxScore: 4,
      },
      { id: "1.2", description: "ถามชื่อ-สกุลของผู้ป่วย", maxScore: 4 },
      { id: "1.3", description: "ขออนุญาตและแจ้งวัตถุประสงค์", maxScore: 4 },
      {
        id: "1.4",
        description:
          "ใช้คำถามมีความต่อเนื่อง เชื่อมโยง และมีจังหวะการรับฟังเหมาะสม",
        maxScore: 6,
      },
      { id: "1.5", description: "เปิดโอกาสให้ผู้ป่วยซักถาม", maxScore: 2 },
    ],
    domain2: [
      { id: "2.1", description: "ตำแหน่งที่มีอาการปวดท้อง", maxScore: 3 },
      { id: "2.2", description: "ปวดทันทีหรือค่อยๆมากขึ้น", maxScore: 3 },
      {
        id: "2.3",
        description: "ลักษณะการปวดท้อง (ปวดบีบ/จุกแน่น/ปวดตื้อๆ)",
        maxScore: 2,
      },
      { id: "2.4", description: "ปวดร้าวไปที่ใด", maxScore: 2 },
      {
        id: "2.5",
        description: "ปวดตลอดเวลาหรือมีอาการปวดเป็นพักๆ",
        maxScore: 2,
      },
      {
        id: "2.6",
        description: "ปัจจัยที่ทำให้อาการปวดดีขึ้นหรือแย่ลง",
        maxScore: 2,
      },
      {
        id: "2.7",
        description: "ขณะมีอาการปวดท้องกำลังทำอะไรอยู่",
        maxScore: 2,
      },
      {
        id: "2.8",
        description: "อาการปวดท้องในอดีตที่มีลักษณะคล้ายกัน",
        maxScore: 2,
      },
      { id: "2.9", description: "ประวัติเคยผ่าตัดช่องท้อง", maxScore: 2 },
      {
        id: "2.10",
        description: "โรคประจำตัวและยาที่ใช้เป็นประจำ",
        maxScore: 2,
      },
      { id: "2.11", description: "ประวัติการสูบบุหรี่", maxScore: 2 },
      { id: "2.12", description: "ประวัติดื่มสุรา/การใช้ยาประจำ", maxScore: 2 },
      { id: "2.13", description: "ประวัติการรักษาก่อนมาพบแพทย์", maxScore: 2 },
      {
        id: "2.14",
        description: "ประวัติอุบัติเหตุก่อนมีอาการหรือไม่",
        maxScore: 2,
      },
    ],
    domain3: [
      {
        id: "3.1",
        description:
          "Characteristic of stool (watery, mucous, bloody), frequency of stool and amount of stool",
        maxScore: 6,
      },
      {
        id: "3.2",
        description: "Characteristic of vomitus, Frequency of vomit",
        maxScore: 6,
      },
      {
        id: "3.3",
        description: "nausea, vomiting, loss of appetite, bloating",
        maxScore: 6,
      },
      {
        id: "3.4",
        description: "History of food exposure (raw, cooked, spoiled food)",
        maxScore: 6,
      },
      {
        id: "3.5",
        description: "People in the house who have the same symptoms",
        maxScore: 6,
      },
    ],
    domain4: [
      { id: "4.1", description: "Diagnosis: Food poisoning", maxScore: 20 },
    ],
  },
  "Kidney stones": {
    domain1: [
      {
        id: "1.1",
        description: "แนะนำตัว แจ้งชื่อ-สกุล ผู้ซักประวัติ",
        maxScore: 4,
      },
      { id: "1.2", description: "ถามชื่อ-สกุลของผู้ป่วย", maxScore: 4 },
      { id: "1.3", description: "ขออนุญาตและแจ้งวัตถุประสงค์", maxScore: 4 },
      {
        id: "1.4",
        description:
          "ใช้คำถามมีความต่อเนื่อง เชื่อมโยง และมีจังหวะการรับฟังเหมาะสม",
        maxScore: 6,
      },
      { id: "1.5", description: "เปิดโอกาสให้ผู้ป่วยซักถาม", maxScore: 2 },
    ],
    domain2: [
      { id: "2.1", description: "ตำแหน่งที่มีอาการปวดท้อง", maxScore: 3 },
      { id: "2.2", description: "ปวดทันทีหรือค่อยๆมากขึ้น", maxScore: 3 },
      {
        id: "2.3",
        description: "ลักษณะการปวดท้อง (ปวดบีบ/จุกแน่น/ปวดตื้อๆ)",
        maxScore: 2,
      },
    ],
    domain3: [
      {
        id: "3.1",
        description: "Pain starts rapidly and waxes and wanes",
        maxScore: 6,
      },
      {
        id: "3.2",
        description:
          "Flank pain (commonly radiating into lower abdomen and genitals as the stone passes down the ureter)",
        maxScore: 6,
      },
      {
        id: "3.3",
        description: "Hematuria (gross or microscopic)",
        maxScore: 6,
      },
      { id: "3.4", description: "Recurrent UTIs", maxScore: 6 },
      {
        id: "3.5",
        description:
          "Bladder dysfunction (if the stone is lodged at the junction between the ureter and bladder)",
        maxScore: 3,
      },
      {
        id: "3.6",
        description: "Personal history of: DM, Obesity",
        maxScore: 3,
      },
      {
        id: "3.7",
        description:
          "Medication use, including Calcium containing supplements, Vitamin D",
        maxScore: 3,
      },
    ],
    domain4: [
      { id: "4.1", description: "Diagnosis: Kidney stones", maxScore: 20 },
    ],
  },
  "Unknown Case": {
    domain1: [],
    domain2: [],
    domain3: [],
    domain4: [],
  },
};

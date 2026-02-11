export type PartnerMetric = {
  label: string;
  val: string;
};

export type Partner = {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string;
  logo: string;
  logoImage: string;
  before: string;
  solution: string;
  metrics: PartnerMetric[];
  gradient: string;
};

export const partners: Partner[] = [
  {
    id: 'p-01',
    name: 'Kumo Ramen',
    industry: 'Restaurant',
    description: 'Chuan hoa quy trinh van hanh va tang 24% ty le quay lai trong 3 thang.',
    image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=1600&auto=format&fit=crop',
    logo: 'KR',
    logoImage: 'https://logo.clearbit.com/kumoramen.com',
    before: 'Quan ly dat ban thu cong khien ty le huy cao va thieu du lieu hanh vi.',
    solution: 'Tich hop dat ban da kenh, CRM va bao cao realtime.',
    metrics: [
      { label: 'Retention', val: '+24%' },
      { label: 'NPS', val: '72' },
      { label: 'Ops Time', val: '-18%' },
    ],
    gradient: 'from-amber-50 via-rose-50 to-orange-100',
  },
  {
    id: 'p-02',
    name: 'Lavie Cafe',
    industry: 'Cafe',
    description: 'Tai thiet trai nghiem loyalty voi he thong the thanh vien so hoa.',
    image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=80&w=1600&auto=format&fit=crop',
    logo: 'LC',
    logoImage: 'https://logo.clearbit.com/nescafe.com',
    before: 'Thieu cong cu phan nhom khach hang, uu dai chua ca nhan hoa.',
    solution: 'Thiet ke hanh trinh khach hang va chuong trinh diem thuong tu dong.',
    metrics: [
      { label: 'Members', val: '+38%' },
      { label: 'LTV', val: '+27%' },
      { label: 'Visits', val: '+19%' },
    ],
    gradient: 'from-orange-50 via-amber-50 to-yellow-100',
  },
  {
    id: 'p-03',
    name: 'Saigon Bento',
    industry: 'Cloud Kitchen',
    description: 'Chuan hoa quy trinh fulfillment cho mo hinh da bep.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop',
    logo: 'SB',
    logoImage: 'https://logo.clearbit.com/bentobox.com',
    before: 'Thoi gian chuan bi khong dong deu va thieu tracking don hang.',
    solution: 'Trien khai dashboard theo doi SLA va canh bao thong minh.',
    metrics: [
      { label: 'SLA', val: '95%' },
      { label: 'Refund', val: '-21%' },
      { label: 'Orders', val: '+32%' },
    ],
    gradient: 'from-red-50 via-rose-50 to-orange-100',
  },
  {
    id: 'p-04',
    name: 'Nova Drinks',
    industry: 'Beverage',
    description: 'Chuoi phan phoi hien dai giup tang do phu thi truong.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop',
    logo: 'ND',
    logoImage: 'https://logo.clearbit.com/pepsi.com',
    before: 'Khong co he thong theo doi ton kho va doanh so theo khu vuc.',
    solution: 'Xay dung he thong BI va quan ly ton kho theo diem ban.',
    metrics: [
      { label: 'Coverage', val: '+41%' },
      { label: 'Stockout', val: '-29%' },
      { label: 'GM', val: '+12%' },
    ],
    gradient: 'from-sky-50 via-indigo-50 to-blue-100',
  },
  {
    id: 'p-05',
    name: 'Mizu Delivery',
    industry: 'Delivery',
    description: 'Toi uu routing va giam thoi gian giao hang dinh diem.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop',
    logo: 'MD',
    logoImage: 'https://logo.clearbit.com/ubereats.com',
    before: 'Chi phi giao hang tang do routing khong toi uu.',
    solution: 'Tu dong hoa tuyen giao hang theo du lieu realtime.',
    metrics: [
      { label: 'ETA', val: '-17%' },
      { label: 'Cost', val: '-13%' },
      { label: 'CSAT', val: '4.8' },
    ],
    gradient: 'from-emerald-50 via-teal-50 to-green-100',
  },
  {
    id: 'p-06',
    name: 'Harvest Market',
    industry: 'Retail',
    description: 'Nang cap omnichannel cho chuoi ban le thuc pham.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop',
    logo: 'HM',
    logoImage: 'https://logo.clearbit.com/wholefoodsmarket.com',
    before: 'Du lieu ban hang phan manh, kho do luong hieu qua chien dich.',
    solution: 'Hop nhat du lieu POS va kenh online, dashboard unified.',
    metrics: [
      { label: 'Conversion', val: '+16%' },
      { label: 'ROAS', val: '+22%' },
      { label: 'Repeat', val: '+14%' },
    ],
    gradient: 'from-emerald-50 via-green-50 to-lime-100',
  },
];

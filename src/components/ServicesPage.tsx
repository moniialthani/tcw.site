import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesPageProps {
  onCollaborateClick: () => void;
}

export default function ServicesPage({ onCollaborateClick }: ServicesPageProps) {
  const { isArabic } = useLanguage();

  return (
    <article
      id="services-page"
      aria-label={isArabic ? 'الخدمات' : 'Services'}
      className="w-full pt-32 sm:pt-40 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Title: Same massive editorial serif typography as the hero/sections */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-[#0A0A0A] pb-12 sm:pb-16"
        >
          <span className="font-mono text-xs sm:text-[13px] tracking-widest uppercase text-[#0A0A0A]/60 block mb-6">
            {isArabic ? '[ 02 • خدمات الاستوديو ]' : '[ 02 — Studio Capabilities ]'}
          </span>

          <h1
            id="services-title"
            className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#0A0A0A] font-normal tracking-[-0.03em] leading-[1.05]"
          >
            {isArabic ? 'الخدمات' : 'Services'}
          </h1>

          <p
            id="services-intro"
            className="mt-8 font-serif text-2xl sm:text-3xl md:text-[2rem] leading-[1.35] tracking-[-0.015em] text-[#0A0A0A]"
          >
            {isArabic
              ? 'نبني كل مشروع حول ما تحتاجه هويتك. تبدأ باختيار المجالات الأهم بالنسبة لك، ثم نتفق معًا على عمق العمل في كلٍّ منها. ومهما كان حجم المشروع، تحصل في النهاية على خطوات واضحة تناسبك أنت.'
              : 'Every project is built around what your brand needs. You choose the areas of work you want us to focus on, and we agree together on how far to take each one. However big or small the project, it ends with clear next steps written specifically for your brand.'}
          </p>
        </motion.div>

        {/* --- GROUP 1: Before anything else / نقطة البداية (Research on its own first) --- */}
        <section
          id="group-before-anything-else"
          aria-labelledby="label-before-anything-else"
          className="border-b border-[#0A0A0A] py-16 sm:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Group Label: Small and quiet above the service name */}
            <h2
              id="label-before-anything-else"
              className="font-mono text-xs sm:text-[11px] tracking-widest uppercase text-[#0A0A0A]/50 block mb-6 font-normal"
            >
              {isArabic ? 'نقطة البداية' : 'Before anything else'}
            </h2>

            {/* Service: Research / البحث */}
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                {isArabic ? 'البحث' : 'Research'}
              </h3>
              <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                {isArabic
                  ? 'كل مشروع تقريبًا يبدأ بفهم هويتك كما هي اليوم، وكيف يراها الآخرون. قد يؤكد هذا ما كنت تشعر به من قبل، وقد يلفت نظرك إلى شيء جديد. وفي الحالتين، يكون باقي المشروع مبنيًا على بحث دقيق.'
                  : "Whatever areas you pick, this is usually where we begin. Before we suggest anything, we spend time getting to know your brand as it is now and how it's seen from the outside. This step is important because it either confirms what you already know or introduces something new to consider, so the rest of the project is backed by solid research."}
              </p>
            </div>
          </motion.div>
        </section>

        {/* --- GROUP 2: Finding the direction / تحديد الاتجاه --- */}
        <section
          id="group-finding-the-direction"
          aria-labelledby="label-finding-the-direction"
          className="border-b border-[#0A0A0A] py-16 sm:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Group Label: Small and quiet above the service name */}
            <h2
              id="label-finding-the-direction"
              className="font-mono text-xs sm:text-[11px] tracking-widest uppercase text-[#0A0A0A]/50 block mb-10 font-normal"
            >
              {isArabic ? 'تحديد الاتجاه' : 'Finding the direction'}
            </h2>

            <div className="space-y-16 sm:space-y-20 max-w-3xl">
              {/* Positioning / موقعك في السوق */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'موقعك في السوق' : 'Positioning'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'لا يمكنك أن تتحدث بثقة قبل أن تعرف جمهورك، وسبب اهتمامه بك. تحديد موقعك في السوق يوضح ذلك، فيعرف من تستهدفهم من النظرة الأولى أنك الخيار المناسب لهم. وبعدها تصبح قرارات كثيرة أسهل بكثير، ولهذا هو بداية مناسبة إن شعرت أن الصورة غير واضحة.'
                    : "Before a brand can say the right things, it needs to know who it's talking to and why they should care. Positioning answers both. It's the part of the work that gives your brand a clear place in its market, so the people you want can tell straight away that you're for them. It also makes a lot of later decisions easier to make, and it's a good place to begin if your brand feels a little unfocused."}
                </p>
              </div>

              {/* Messaging / الصوت والرسالة */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'الصوت والرسالة' : 'Messaging'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'تعرف غالبًا ماذا تريد أن تقول، لكن قوله بالطريقة نفسها كل مرة أمر آخر. العمل على الصوت والرسالة يمنحك الكلمات والنبرة لتفعل ذلك، من تعليق صغير على إنستغرام إلى الطريقة التي يرحّب بها فريقك بالناس عند الباب. وهكذا يسهل التعرف عليك ويصعب نسيانك. ونكتب بالعربية والإنجليزية، لتبقى أنت نفسك في اللغتين.'
                    : "Most brands know what they want to say but struggle to say it the same way twice. Messaging gives you the words and the tone to do that, whether it's a caption, a website or how your staff greet people at the door. It makes your brand easier to recognise and much easier to remember. It's also where your positioning starts to feel real to the people outside the business. We work in Arabic and English, so your brand sounds like itself in both."}
                </p>
              </div>

              {/* Naming / اختيار الأسماء */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'اختيار الأسماء' : 'Naming'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'قد يكون الاسم كلمة واحدة، لكنه يحمل الكثير. يعطي الناس فكرة عنك قبل أن يعرفوك، ويبقى في ذاكرتهم بعد أن يغادروا. سواء كنت تبحث عن اسمك في البداية، أو عن اسم لمنتج أو تجربة جديدة، نختار اسمًا ينسجم مع ما تقدمه ومع جمهورك. ونصوغه ليعمل بالعربية والإنجليزية معًا.'
                    : "A good name does a lot of quiet work, whether it's on a shopfront or a single product. It sets expectations, sticks in people's heads and gives them something to tell their friends. We create names for brands just starting out and for the products, collections and experiences within brands that are already established. Names can be built for Arabic and English audiences together."}
                </p>
              </div>

              {/* Identity direction / توجيه الهوية البصرية */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'توجيه الهوية البصرية' : 'Identity direction'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'قد لا تعرف كيف تصف مشروعك بالكلمات، لكنك تعرف روحه جيدًا. توجيه الهوية البصرية يمنح هذه الروح شكلًا يُرى، يظهر في كل ما يخصك، فيعرف الناس أنه لك من أول نظرة. نحدد نحن الاتجاه، وينفّذه مصممك أو مصمم من شبكتنا الموثوقة.'
                    : "You might not be able to describe your brand's personality exactly, but you probably know its vibe when you see it. Identity takes that vibe and gives it a look people will recognise. When it's clear, it carries across everything you touch, from an entire room to the smallest object, and people know it's yours without needing to see the name. Identity direction defines how your brand should present itself visually, so the way you look matches who you are. We set the direction, and the design is carried out by your designer or one we bring in."}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- GROUP 3: Bringing it to life / من الفكرة إلى الواقع --- */}
        <section
          id="group-bringing-it-to-life"
          aria-labelledby="label-bringing-it-to-life"
          className="border-b border-[#0A0A0A] py-16 sm:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Group Label: Small and quiet above the service name */}
            <h2
              id="label-bringing-it-to-life"
              className="font-mono text-xs sm:text-[11px] tracking-widest uppercase text-[#0A0A0A]/50 block mb-10 font-normal"
            >
              {isArabic ? 'من الفكرة إلى الواقع' : 'Bringing it to life'}
            </h2>

            <div className="space-y-16 sm:space-y-20 max-w-3xl">
              {/* Social content / المحتوى */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'المحتوى' : 'Social content'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'قبل أن يزورك أحد أو يشتري منك، غالبًا ما يمرّ على حسابك في إنستغرام. لكن الحساب الذي لا يعرض سوى المنتجات يتحول إلى كتالوج، يُتصفح ولا يُتابع. المحتوى يعطي الناس سببًا للمتابعة، بمنشورات تعرّفهم عليك كما تعرّفهم على منتجاتك. نخطط له على شكل باقات مع جدول نشر مقترح، ونسلمك الخطة أو ننفذ المنشورات والريلز بأنفسنا.'
                    : "A lot of people will look at your Instagram before they ever visit or buy. Posting only your products can make your feed feel like a catalogue, and will only be used as such. Social content gives people a reason to follow, with posts that show who you are as well as what you sell. They're planned in packs with a suggested calendar, and we can either hand over the plan or create the posts and reels ourselves."}
                </p>
              </div>

              {/* Launch strategy / تخطيط الإطلاق */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'تخطيط الإطلاق' : 'Launch strategy'}
                </h3>
                <div className="space-y-4 font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  <p>
                    {isArabic
                      ? 'قد يكون كل شيء جاهزًا، المنتج والموعد وتصور مبدئي للإطلاق. دورنا أن نحول هذا التصور إلى خطة تصنع الترقّب، وتضاعف أثر يوم الإطلاق. والأهم أن يتحدث الناس عنك، وليس عن المنتج فقط، حتى يستمر الاهتمام بك بعد أن تهدأ الضجة.'
                      : "You might already have the product, the date and a rough idea of how you want it to go. Launch strategy turns that into a plan that builds anticipation, makes the most of the moment itself and reaches the people it's meant for. It also gives people something to talk about beyond the product, so the attention stays with your brand once the launch is over."}
                  </p>
                  <p>
                    {isArabic
                      ? 'ونطبّق التفكير نفسه على الحملات والفعاليات، سواء كانت تُقام للمرة الأولى أو للمرة العاشرة، فيبدأ الحديث عنها قبل موعدها بوقت طويل ويستمر بعده.'
                      : "We use the same approach for campaigns and events, whether you're building excitement for a first event or making a familiar one feel new again, so the buzz starts well before the day and keeps going long after it."}
                  </p>
                </div>
              </div>

              {/* Customer experience / انطباع العميل */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'انطباع العميل' : 'Customer experience'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'فكّر في مكان تعود إليه دائمًا، لا لشيء إلا لأنك ترتاح فيه. هذا الشعور لا يأتي صدفة، بل من تفاصيل صغيرة كأجواء المكان وطريقة استقبالك. وهذه التفاصيل تحديدًا هي ما نعمل عليه معك، لأنها ما يجعل الناس يعودون إليك ويتحدثون عنك.'
                    : "Think about the last place you went back to just because of how it felt to be there. That feeling usually comes from small things, like the mood of the room and the way the staff talk to you. Customer experience is about getting those small things right for your brand. That's what brings people back, and what gets them talking."}
                </p>
              </div>

              {/* Execution oversight / متابعة التنفيذ */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]">
                  {isArabic ? 'متابعة التنفيذ' : 'Execution oversight'}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
                  {isArabic
                    ? 'بعد أن تكتمل الاستراتيجية، يبقى من ينفذها، وغالبًا ما يكون فريقك أو شركة تتعاون معها. ونتابع عملهم خطوة بخطوة، ونصحح الاتجاه أولًا بأول إذا ابتعد عما اتفقنا عليه، حتى تكون النتيجة مطابقة للخطة.'
                    : "Once the strategy is set, someone still has to carry it out, usually your own team or an agency. Execution oversight means we stay involved while they do. We look over the work as it comes in and point out anything that's moved away from what we agreed, so nothing gets lost between the plan and the finished work."}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- SECTION: Working with specialists / التعاون مع المختصين --- */}
        <section
          id="section-working-with-specialists"
          aria-labelledby="heading-working-with-specialists"
          className="border-b border-[#0A0A0A] py-16 sm:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4"
          >
            <h2
              id="heading-working-with-specialists"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] font-normal tracking-[-0.02em]"
            >
              {isArabic ? 'التعاون مع المختصين' : 'Working with specialists'}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#0A0A0A]/85 leading-relaxed font-light">
              {isArabic
                ? 'قد يحتاج المشروع أحيانًا إلى مختصين (مثل المصممين والمصورين ومختصي الفيديو). وفي هذه الحالة، نختار الشخص المناسب من شبكتنا الموثوقة ونتابع عمله نيابةً عنك، فلا تتعامل إلا معنا. وتدفع رسومهم كما هي، دون أي إضافة.'
                : "Sometimes a project needs specialists (such as designers, photographers, videographers or editors). In that case, we'll find the right person from our trusted network and manage them for you, so you only ever deal with us. Their fees are passed on at cost."}
            </p>
          </motion.div>
        </section>

        {/* --- CLOSING: Above intake form button --- */}
        <section
          id="services-closing"
          aria-label={isArabic ? 'تواصل معنا' : 'Get in touch'}
          className="py-16 sm:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-8"
          >
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] font-normal leading-[1.3] tracking-[-0.015em]">
              {isArabic
                ? 'لست متأكدًا بعد مما تحتاجه؟ لا بأس. أخبرنا بما تعرفه، ونكمل معك من هناك.'
                : "Not sure which areas you need yet? That's fine. Fill in the intake form with what you know, and we'll help you figure out the rest."}
            </p>

            <div>
              <button
                type="button"
                id="services-intake-btn"
                onClick={onCollaborateClick}
                className="inline-flex items-center justify-center bg-[#0A0A0A] text-[#F9F9F9] font-mono text-xs sm:text-sm tracking-widest uppercase px-10 py-5 rounded-none border border-[#0A0A0A] cursor-pointer hover:bg-black/90 active:scale-[0.98] transition-all duration-150"
              >
                {isArabic ? 'ابدأ الحديث معنا ←' : 'Start a conversation →'}
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </article>
  );
}

"use client"

import Link from "next/link"
import { useLanguageStore } from "@/lib/store" // Updated import
import { toast } from "@/hooks/use-toast"

export default function MainFooter() {
  const { t, currentLanguage } = useLanguageStore()

  function showAboutToast() {
    const aboutContent = {
      title: t("aboutEtsyTitle"),
      content: t("aboutEtsyContent"),
    }
    toast({
      title: aboutContent.title,
      description: (
        <div
          style={{
            maxHeight: 520,
            overflowY: "auto",
            fontSize: 16,
            lineHeight: 2,
            color: "#1e293b",
            padding: 32,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 32px 0 #0002",
            maxWidth: 700,
            margin: "0 auto",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* 一级主题标题 */}
          <div
            style={{
              fontWeight: 800,
              fontSize: 26,
              textAlign: "center",
              margin: "0 0 18px 0",
              color: "#1e293b",
              letterSpacing: 1,
              lineHeight: 1.3,
            }}
          >
            {aboutContent.title}
          </div>
          <hr style={{ border: 0, borderTop: "2px solid #6366f1", margin: "0 0 28px 0" }} />
          {aboutContent.content.split("\n").map((line: string, idx: number) => {
            // 一级分组标题（罗马数字开头）
            if (/^[IVXLCDM]+\.\s/.test(line)) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    margin: "28px 0 10px",
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 12,
                    letterSpacing: 1,
                    color: "#1e293b",
                  }}
                >
                  {line}
                </div>
              )
            }
            // 二级分组标题（数字开头）
            if (/^\d+\.\s/.test(line)) {
              return (
                <div key={idx} style={{ fontWeight: 600, fontSize: 16, margin: "18px 0 6px", color: "#334155" }}>
                  {line}
                </div>
              )
            }
            // 分组标题（兼容之前的英文分组标题）
            if (/^([A-Za-z\s]+)$/.test(line) && line.length < 28 && idx !== 0) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    margin: "32px 0 12px",
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 14,
                    letterSpacing: 1,
                  }}
                >
                  {line}
                </div>
              )
            }
            // Mission highlight
            if (line.includes("Mission")) {
              return (
                <div key={idx} style={{ color: "#e11d48", fontWeight: 700, fontSize: 18, margin: "22px 0 8px" }}>
                  {line}
                </div>
              )
            }
            // Emoji list
            if (/^[✔️🔍🌐🔒🛍️👨‍💻🛒💰🚀🥉🥈🥇📍📧☎️]+/.test(line)) {
              return (
                <div key={idx} style={{ margin: "8px 0 8px 24px", fontSize: 17 }}>
                  {line}
                </div>
              )
            }
            // Contact/Certification
            if (
              line.includes("Global Operations") ||
              line.includes("Business:") ||
              line.includes("alliance@etsy.com") ||
              line.includes("Reviewer Support") ||
              line.includes("©2025")
            ) {
              return (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 10,
                    padding: 12,
                    margin: "18px 0 0",
                    fontSize: 15,
                    color: "#334155",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {line}
                </div>
              )
            }
            // Divider
            if (line.trim() === "" && idx !== 0) {
              return <hr key={idx} style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "20px 0" }} />
            }
            // Default
            return (
              <div key={idx} style={{ margin: "4px 0" }}>
                {line}
              </div>
            )
          })}
        </div>
      ),
      duration: 100000,
      className: "max-w-2xl min-w-[340px]",
    })
  }

  function showPrivacyToast() {
    const privacyContent = {
      title: "Etsy Alliance Platform Privacy Policy (International)",
      content: `Last Updated: January 18, 2025\n\n1. Scope\nThis policy applies to:\nMerchants providing goods or services globally via the Etsy Alliance Platform (including website, mobile app, and API)\nRegistered reviewers participating in product reviews\nEnd consumers using alliance services\n\n2. Types of Data Collected\nMerchant Data\nType\tExample\tPurpose\nBusiness Info\tBusiness license, legal ID\tQualification verification\nOperational Data\tSales records, inventory info\tBusiness analysis\nTechnical Data\tAPI logs, IP address\tSecurity monitoring\nReviewer Data\nType\tSpecial Requirements\nBiometric Data\tSeparate written consent required (EU GDPR Art.9)\nReview Records\tIncludes 3D model data generated by virtual reviews\nConsumer Data\nTransaction data from purchases via the alliance\nCross-platform behavioral data (must comply with Global Data Privacy Framework)\n\n3. Legal Basis for Data Processing\nRegion\tLegal Basis\tSpecial Requirements\nEU/UK\tGDPR Art.6(1)(b) (contract performance)\tEU representative required\nCalifornia\tCCPA business purpose disclosure\t"Do Not Sell" option provided\nJapan\tAPPI amendment\tCross-border transfer filing with PIPC\n\n4. Cross-Border Data Transfer Mechanisms\nStandard Contractual Clauses (SCCs): for EU→third country transfers\nEncryption: TLS 1.3+ in transit, AES-256 at rest\nRegional storage:\nAmericas data stored in Virginia AWS region\nAPAC data stored in Tokyo Azure region\n\n5. User Rights\nGeneral Rights\nAccess: Download via [Data Dashboard]\nDeletion: Transaction data retained for tax (7 years)\nRegion-Specific Rights\nRegion\tSpecial Right\tResponse Time\nBrazil LGPD\tData portability\t15 business days\nChina PIPL\tSeparate consent option\t30 days\n\n6. Data Sharing Policy\nRequired Sharing\nPayment processors (Stripe/PayPal)\nLogistics partners (DPA required)\nProhibited Sharing\nNo health data to ad networks without explicit consent\nNo data transfer to sanctioned entities (UNSC 2321)\n\n7. Security Measures\nTechnical\nAnnual penetration test (ISO 27001)\nReal-time anomaly detection (SIEM)\nManagerial\nLeast privilege principle for staff\nAnnual vendor security audit\n\n8. Children's Data\nNo data collection for under 13 (COPPA)\n16-18 requires parental reconfirmation (EU GDPR)\n\n9. Policy Updates\nMajor changes: 30-day email notice\nHistory archived in [Policy Library]\n\nCompliance Contacts\nEU Rep: DPO-EU@etsy-compliance.com\nGlobal Privacy Office: privacy@etsy-global.com\n\n©2025 Etsy Group, Inc. All rights reserved\n\nNote:\nIf this policy conflicts with the Etsy General Terms, the stricter applies\nMedical device merchants must also comply with HIPAA/HGPH\nDisputes: Singapore International Arbitration Centre rules\n(Certified: ISO 27701, TRUSTe Privacy)`,
    }
    toast({
      title: privacyContent.title,
      description: (
        <div
          style={{
            maxHeight: 520,
            overflowY: "auto",
            fontSize: 16,
            lineHeight: 2,
            color: "#1e293b",
            padding: 32,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 32px 0 #0002",
            maxWidth: 700,
            margin: "0 auto",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* 一级主题标题 */}
          <div
            style={{
              fontWeight: 800,
              fontSize: 26,
              textAlign: "center",
              margin: "0 0 18px 0",
              color: "#1e293b",
              letterSpacing: 1,
              lineHeight: 1.3,
            }}
          >
            {privacyContent.title}
          </div>
          <hr style={{ border: 0, borderTop: "2px solid #6366f1", margin: "0 0 28px 0" }} />
          {privacyContent.content.split("\n").map((line: string, idx: number) => {
            // 一级分组标题（罗马数字开头）
            if (/^[IVXLCDM]+\.\s/.test(line)) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    margin: "28px 0 10px",
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 12,
                    letterSpacing: 1,
                    color: "#1e293b",
                  }}
                >
                  {line}
                </div>
              )
            }
            // 二级分组标题（数字开头）
            if (/^\d+\.\s/.test(line)) {
              return (
                <div key={idx} style={{ fontWeight: 600, fontSize: 16, margin: "18px 0 6px", color: "#334155" }}>
                  {line}
                </div>
              )
            }
            // 分组标题（兼容之前的英文分组标题）
            if (/^([A-Za-z\s]+)$/.test(line) && line.length < 28 && idx !== 0) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    margin: "32px 0 12px",
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 14,
                    letterSpacing: 1,
                  }}
                >
                  {line}
                </div>
              )
            }
            // Highlight
            if (line.includes("Privacy")) {
              return (
                <div key={idx} style={{ color: "#e11d48", fontWeight: 700, fontSize: 18, margin: "22px 0 8px" }}>
                  {line}
                </div>
              )
            }
            // Table rows
            if (line.includes("\t")) {
              const cells = line.split("\t")
              return (
                <div
                  key={idx}
                  style={{
                    display: "table",
                    width: "100%",
                    background: "#f9fafb",
                    borderRadius: 8,
                    margin: "6px 0",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    tableLayout: "fixed",
                  }}
                >
                  <div style={{ display: "table-row" }}>
                    {cells.map((cell: string, cellIdx: number) => (
                      <div
                        key={cellIdx}
                        style={{
                          display: "table-cell",
                          padding: "8px 14px",
                          color: "#334155",
                          fontFamily: "monospace",
                          fontSize: 15,
                          borderRight: cellIdx < cells.length - 1 ? "1px solid #e5e7eb" : "none",
                          borderBottom: "none",
                          whiteSpace: "pre-line",
                          wordBreak: "break-word",
                          verticalAlign: "middle",
                          width: "1%",
                          minWidth: 0,
                          background: cellIdx === 0 ? "#f1f5f9" : "inherit",
                          fontWeight: cellIdx === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            // Default
            return (
              <div key={idx} style={{ margin: "4px 0" }}>
                {line}
              </div>
            )
          })}
        </div>
      ),
      duration: 100000,
      className: "max-w-2xl min-w-[340px]",
    })
  }

  function showTermsToast() {
    const termsContent = {
      title: "Etsy Global Merchant Alliance Platform Terms of Service (Global)",
      content: `Last Updated: January 18, 2025\n\nI. General Provisions\n1. Global Scope\nThese terms apply to all registered merchants, product reviewers (hereinafter "reviewers"), and users worldwide who use the Etsy Merchant Alliance Platform (hereinafter "the Platform").\n\nUsers must comply with the laws and regulations of their country/region. The Platform will automatically adapt to local compliance requirements based on the user's registration location.\n\n2. Multilingual Support\nThe Platform provides major language versions including English, Chinese, Japanese, Spanish, French, and German. The language selected during user registration prevails.\n\nTranslations are for reference only. In case of ambiguity, the English version shall prevail.\n\n3. Definition Updates\nGlobal Compliance Standards: Refers to data protection, consumer rights, and other relevant laws and regulations in the user's country/region (e.g., EU GDPR, US CCPA, etc.).\n\nCross-border Payment System: Supports multi-currency settlement tools. Exchange rates are based on the Platform's published rates on the settlement day.\n\nII. Global Technical Support & Review Process\n4. Global Virtual Review Technology\nThe Platform's virtual review tools adapt to different regional network environments, including:\na) Low Bandwidth Optimization: Simplified 3D display for regions with poor network conditions\nb) Localization Parameter Simulation: Automatic conversion of measurement units (e.g., inches/cm) based on regional standards\nc) Multilingual AI Assistance: Real-time review suggestions in 12 languages\n\n5. International Review Process\nTime Zone Adaptation: Task deadlines are automatically calculated based on the reviewer's time zone\n\nCultural Sensitivity Detection: The AI system will prompt for content that may violate local cultural customs\n\nGlobal Quality Sample Library: 20% of reviews from major markets are manually rechecked\n\nIII. Global User Rights & Obligations\n6. Global Merchant Obligations\nMerchants must provide multilingual product information that meets target market labeling requirements (at least English and the local language)\n\nAdditional requirements for specific regions:\na) EU: CE certification documents\nb) North America: FCC/UL certification\nc) Japan: PSE mark\n\n7. Global Reviewer Rights\nRegional Pricing: Compensation is automatically adjusted based on the cost of living index in the reviewer's country\n\nLocal Protection: Reviewers have the right to refuse tasks that violate their country's laws (e.g., alcohol products in Islamic countries)\n\n8. Global Disclaimer\nThe Platform may extend deadlines for reviews delayed due to cross-border network latency\n\nUsers in internationally sanctioned countries may not have access to all virtual review features\n\nIV. Cross-border Data & Intellectual Property\n9. GDPR Compliance\nEU user data is stored by default in the Frankfurt data center\n\nUsers have the right to:\na) Download their personal data package at any time\nb) Request deletion of non-essential data (transaction records retained for tax purposes)\n\n10. Global Intellectual Property Protection\nReview content is automatically registered in national copyright systems\n\nImportant technology patents are protected via the WIPO Madrid System\n\nV. Global Violation Handling\n11. Tiered Penalty System\nViolation Type\tEmerging Markets\tMature Markets\nMinor Violation\tWarning\t$50 Fine\nSerious Violation\t30-day Suspension\tPermanent Ban + Legal Action\n12. Cross-border Dispute Resolution\nPriority is given to the Singapore International Arbitration Center (SCIA)\n\nSmall claims are subject to the Online Dispute Resolution (ODR) mechanism\n\nVI. Global Payments & Taxation\n13. Multi-currency Settlement\nSupports automatic exchange of 15 currencies including USD/EUR/GBP/JPY\n\nDeveloping countries may apply for local currency settlement (1.5% exchange fee applies)\n\n14. Tax Compliance\nAutomatic withholding and payment:\na) USA: 1099 form\nb) EU: VAT\nc) Japan: Withholding tax\n\nUsers must provide a valid tax identification number (e.g., US SSN/EIN)\n\nVII. Other International Terms\n15. Global Service Window\n24/7 multilingual customer service (covering UTC-8 to UTC+9)\n\n16. Force Majeure\nIncluding but not limited to:\na) International network interruptions\nb) Import/export controls\nc) Regional armed conflicts\n\n©2025 Etsy International. All Rights Reserved.\nGlobal Compliance Office Contact: compliance@etsy-global.com\n\nNote:\nIn case of conflict with mandatory local laws, local laws shall prevail\nThe list of sanctioned countries refers to the latest version of UN Security Council Resolution 1267\nCross-border data transfer complies with the Global Privacy Framework\n(This version has been jointly reviewed for compliance by Baker McKenzie (USA), Linklaters (UK), and TMI Associates (Japan))`,
    }
    toast({
      title: termsContent.title,
      description: (
        <div
          style={{
            maxHeight: 520,
            overflowY: "auto",
            fontSize: 16,
            lineHeight: 2,
            color: "#1e293b",
            padding: 32,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 32px 0 #0002",
            maxWidth: 700,
            margin: "0 auto",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* 一级主题标题 */}
          <div
            style={{
              fontWeight: 800,
              fontSize: 26,
              textAlign: "center",
              margin: "0 0 18px 0",
              color: "#1e293b",
              letterSpacing: 1,
              lineHeight: 1.3,
            }}
          >
            {termsContent.title}
          </div>
          <hr style={{ border: 0, borderTop: "2px solid #6366f1", margin: "0 0 28px 0" }} />
          {termsContent.content.split("\n").map((line: string, idx: number) => {
            // 一级分组标题（罗马数字开头）
            if (/^[IVXLCDM]+\.\s/.test(line)) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    margin: "28px 0 10px",
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 12,
                    letterSpacing: 1,
                    color: "#1e293b",
                  }}
                >
                  {line}
                </div>
              )
            }
            // 二级分组标题（数字开头）
            if (/^\d+\.\s/.test(line)) {
              return (
                <div key={idx} style={{ fontWeight: 600, fontSize: 16, margin: "18px 0 6px", color: "#334155" }}>
                  {line}
                </div>
              )
            }
            // 分组标题（兼容之前的英文分组标题）
            if (/^([A-Za-z\s]+)$/.test(line) && line.length < 28 && idx !== 0) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    margin: "32px 0 12px",
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 14,
                    letterSpacing: 1,
                  }}
                >
                  {line}
                </div>
              )
            }
            // Highlight
            if (line.includes("Terms of Service")) {
              return (
                <div key={idx} style={{ color: "#e11d48", fontWeight: 700, fontSize: 18, margin: "22px 0 8px" }}>
                  {line}
                </div>
              )
            }
            // Table rows
            if (line.includes("\t")) {
              const cells = line.split("\t")
              return (
                <div
                  key={idx}
                  style={{
                    display: "table",
                    width: "100%",
                    background: "#f9fafb",
                    borderRadius: 8,
                    margin: "6px 0",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                    tableLayout: "fixed",
                  }}
                >
                  <div style={{ display: "table-row" }}>
                    {cells.map((cell: string, cellIdx: number) => (
                      <div
                        key={cellIdx}
                        style={{
                          display: "table-cell",
                          padding: "8px 14px",
                          color: "#334155",
                          fontFamily: "monospace",
                          fontSize: 15,
                          borderRight: cellIdx < cells.length - 1 ? "1px solid #e5e7eb" : "none",
                          borderBottom: "none",
                          whiteSpace: "pre-line",
                          wordBreak: "break-word",
                          verticalAlign: "middle",
                          width: "1%",
                          minWidth: 0,
                          background: cellIdx === 0 ? "#f1f5f9" : "inherit",
                          fontWeight: cellIdx === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            // Default
            return (
              <div key={idx} style={{ margin: "4px 0" }}>
                {line}
              </div>
            )
          })}
        </div>
      ),
      duration: 100000,
      className: "max-w-2xl min-w-[340px]",
    })
  }

  return (
    <footer className="bg-soft-sage-800 text-white mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-etsy-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold">Etsy</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
              Discover unique, handcrafted items from creative entrepreneurs around the world. Your marketplace for all
              things creative and authentic.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("shop")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-butter-yellow-300 transition-colors">
                  {t("allProducts")}
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-300 hover:text-butter-yellow-300 transition-colors">
                  {t("activities")}
                </Link>
              </li>
              <li>
                <Link
                  href="/recharge-withdraw"
                  className="text-gray-300 hover:text-butter-yellow-300 transition-colors"
                >
                  {t("wallet")}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-butter-yellow-300 transition-colors">
                  {t("myAccount")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-butter-yellow-300 transition-colors text-left"
                  onClick={showAboutToast}
                >
                  {t("aboutUs")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-butter-yellow-300 transition-colors text-left"
                  onClick={showTermsToast}
                >
                  {t("termsOfService")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-gray-300 hover:text-butter-yellow-300 transition-colors text-left"
                  onClick={showPrivacyToast}
                >
                  {t("privacyPolicy")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Etsy Inc. {t("allRightsReserved")}
          </p>

          {/* Payment Methods */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">We accept:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">💳</span>
              </div>
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-600">💰</span>
              </div>
              <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">💸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

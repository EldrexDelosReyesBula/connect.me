import React, { useState } from 'react';
import { ArrowLeft, Send, GraduationCap, User, X, FileText } from 'lucide-react';
import { ComposeModalProps } from '../types';

const TEMPLATES = [
  // PROFESSIONAL TEMPLATES
  {
    label: 'Meeting Request',
    subject: 'Request for Meeting: [Your Name]',
    body: 'Dear Eldrex,\n\nI would like to request a meeting with you to discuss [Topic]. Please let me know your availability for this week.\n\nBest regards,\n[Your Name]'
  },
  {
    label: 'Project Inquiry',
    subject: 'Inquiry regarding [Project Name]',
    body: 'Hi Eldrex,\n\nI am reaching out to inquire about [Project Name]. I would like to know more about [Specific Question].\n\nThank you,\n[Your Name]'
  },
  {
    label: 'Collaboration',
    subject: 'Collaboration Opportunity: [Project/Idea]',
    body: 'Hi Eldrex,\n\nI have an idea for a collaboration on [Project/Idea] and would love to hear your thoughts. Let me know if you are open to discussing this further.\n\nBest,\n[Your Name]'
  },
  {
    label: 'Job Opportunity',
    subject: 'Job Opportunity: [Role] at [Company]',
    body: 'Dear Eldrex,\n\nI am reaching out from [Company] regarding a potential opportunity for a [Role] position. We were impressed by your background and would love to discuss this further.\n\nPlease let me know if you are open to a brief chat.\n\nBest regards,\n[Your Name]'
  },
  {
    label: 'Recommendation Request',
    subject: 'Request for Recommendation: [Your Name]',
    body: 'Dear Eldrex,\n\nI hope you are doing well.\n\nI am currently applying for [Job/Program] and was hoping you might be willing to write a letter of recommendation on my behalf, given our experience working together on [Project/Class].\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]'
  },

  // EDUCATIONAL TEMPLATES
  {
    label: 'Class Question (English)',
    subject: 'Question about [Subject/Topic]',
    body: 'Hi [Classmate Name],\n\nI just wanted to ask if we have any updates or assignments for [Subject/Topic]. Also, do you know if we have a Google Classroom or group chat for this subject?\n\nThanks!\n[Your Name]'
  },
  {
    label: 'Class Question (Tagalog)',
    subject: 'Tanong tungkol sa [Subject/Topic]',
    body: 'Hi [Classmate Name],\n\nGusto ko lang itanong kung may updates o assignments tayo sa [Subject/Topic]. Alam mo ba kung may Google Classroom o group chat tayo para dito?\n\nSalamat!\n[Your Name]'
  },
  {
    label: 'Homework Help / Clarification',
    subject: 'Help with [Assignment/Topic]',
    body: 'Hello [Classmate Name],\n\nCan you help me understand [Assignment/Topic]? I am having some difficulty and would really appreciate your guidance.\n\nThanks in advance!\n[Your Name]'
  },
  {
    label: 'Group Project Invite',
    subject: 'Invitation to join [Project Name] Group',
    body: 'Hi [Classmate Name],\n\nI am forming a group for [Project Name] and would like to know if you are interested in joining. We can discuss the tasks and deadlines together.\n\nLet me know!\n[Your Name]'
  },
  {
    label: 'Teacher/Instructor Inquiry',
    subject: 'Question regarding [Class/Topic]',
    body: 'Dear [Teacher Name],\n\nI hope you are doing well. I have a question regarding [Class/Topic] and would like to clarify [Specific Question].\n\nThank you for your time.\n[Your Name]'
  },

  // PERSONAL TEMPLATES
  {
    label: 'Friendly Message (English)',
    subject: 'Hey [Friend Name]!',
    body: 'Hi [Friend Name],\n\nJust wanted to check in and see how you are doing. Also, wanted to ask if you are free to hang out or chat sometime soon!\n\nCheers,\n[Your Name]'
  },
  {
    label: 'Friendly Message (Tagalog)',
    subject: 'Kumusta [Friend Name]!',
    body: 'Hi [Friend Name],\n\nKumusta ka na? Gusto ko lang mag-check in at malaman kung free ka para mag-chat o magkita soon!\n\nIngat,\n[Your Name]'
  },
  {
    label: 'Casual Question to Stranger / Classmate',
    subject: 'Quick Question: [Topic]',
    body: 'Hi [Name],\n\nSorry to bother you, but I just wanted to ask [Your Question]. Hope you can help!\n\nThanks,\n[Your Name]'
  },
  {
    label: 'Thank You',
    subject: 'Thank You!',
    body: 'Hi [Name],\n\nI just wanted to send a quick note to say thank you for [Reason]. I really appreciate your help and time.\n\nBest,\n[Your Name]'
  },
  {
    label: 'Follow-Up',
    subject: 'Follow-Up: [Previous Topic]',
    body: 'Hi [Name],\n\nI hope this message finds you well. I just wanted to follow up on [Previous Topic] and see if there are any updates.\n\nThanks!\n[Your Name]'
  }
];

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showRecipientSheet, setShowRecipientSheet] = useState(false);

  if (!isOpen) return null;

  const handleSendClick = () => {
    setShowRecipientSheet(true);
  };

  const handleFinalSend = (type: 'academic' | 'personal') => {
    const email = type === 'academic' 
      ? 'ebula251056@navotaspolytechniccollege.edu.ph' 
      : 'eldrexdelosreyesbula@gmail.com';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setShowRecipientSheet(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#fdfdf6] flex flex-col animate-slide-up">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpSheet {
           from { transform: translateY(100%); }
           to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.2, 0.0, 0.0, 1.0) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.2, 0.0, 0.0, 1.0) forwards;
        }
        .animate-sheet-up {
          animation: slideUpSheet 0.5s cubic-bezier(0.2, 0.0, 0.0, 1.0) forwards;
        }
      `}</style>

      {/* Top App Bar - Fixed/Sticky feel */}
      <div className="px-4 py-4 flex items-center relative z-10 shrink-0">
        <button 
          onClick={onClose}
          className="p-3 -ml-2 hover:bg-[#e2e3dd] rounded-full transition-colors duration-200 active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6 text-[#1b1c17]" />
        </button>
        <h1 className="ml-4 text-[22px] font-normal text-[#1b1c17] tracking-tight">
          Write Message
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:max-w-2xl sm:mx-auto w-full flex flex-col gap-6">
        
        {/* Templates Section */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#44473f] px-1">Quick Templates</label>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {TEMPLATES.map((template, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSubject(template.subject);
                  setBody(template.body);
                }}
                className="flex items-center gap-2 shrink-0 px-4 py-2 bg-[#e2e3dd] hover:bg-[#d5d6d0] active:scale-95 rounded-full text-sm text-[#1b1c17] transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-[#44473f]" />
                {template.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filled Text Field: Subject */}
        <div className="relative group bg-[#e2e3dd] rounded-t-[16px] rounded-b-[4px] border-b border-[#74796d] px-4 py-3 transition-colors hover:bg-[#d5d6d0] focus-within:bg-[#d5d6d0] focus-within:border-primary">
            <label className="block text-xs font-medium text-[#44473f] mb-1 transition-colors group-focus-within:text-primary">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              className="w-full bg-transparent border-none outline-none text-base text-[#1b1c17] placeholder:text-[#44473f]/60 p-0"
            />
        </div>

        {/* Filled Text Field: Body */}
        <div className="flex-1 flex flex-col relative bg-[#e2e3dd] rounded-t-[16px] rounded-b-[4px] border-b border-[#74796d] px-4 py-3 transition-colors hover:bg-[#d5d6d0] focus-within:bg-[#d5d6d0] focus-within:border-primary">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-medium text-[#44473f] transition-colors group-focus-within:text-primary">Message</label>
            </div>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start typing..."
                className="w-full flex-1 bg-transparent border-none outline-none resize-none text-base text-[#1b1c17] placeholder:text-[#44473f]/60 leading-relaxed p-0"
            />
            <div className="text-right mt-2 transition-opacity duration-300 opacity-80">
                <span className="text-xs text-[#44473f] font-medium">
                    {body.length} characters
                </span>
            </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-2 pb-6 flex items-center justify-between gap-4 mt-auto">
             <button 
                onClick={onClose}
                className="h-14 px-8 text-[#44473f] font-medium hover:bg-[#e2e3dd] active:scale-95 rounded-[16px] transition-all duration-200"
            >
                Cancel
            </button>
             <button 
                onClick={handleSendClick}
                className="h-14 pl-6 pr-8 bg-[#bbf7d0] hover:bg-[#a6e6bc] active:bg-[#91cfac] text-[#002204] rounded-[16px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-md-standard flex items-center gap-3"
            >
                <Send className="w-5 h-5" />
                <span className="text-base font-medium">Send Message</span>
            </button>
        </div>
      </div>

      {/* Recipient Selection Bottom Sheet */}
      {showRecipientSheet && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#1b1c17]/40 backdrop-blur-sm animate-fade-in"
                onClick={() => setShowRecipientSheet(false)}
            />
            
            {/* Sheet */}
            <div className="relative w-full max-w-[420px] bg-[#f4f4eb] rounded-t-[28px] sm:rounded-[28px] p-6 shadow-2xl animate-sheet-up flex flex-col">
                <div className="w-full flex justify-between items-center mb-6">
                    <h2 className="text-[22px] font-normal text-[#1b1c17]">Select Recipient</h2>
                    <button 
                        onClick={() => setShowRecipientSheet(false)}
                        className="p-2 bg-[#e2e3dd] rounded-full hover:bg-[#c6c8c0] transition-colors active:scale-95 duration-200"
                    >
                        <X className="w-6 h-6 text-[#44473f]" />
                    </button>
                </div>
                
                <p className="text-sm text-[#44473f] mb-4 leading-relaxed">
                    Which email address would you like to send this to?
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => handleFinalSend('academic')}
                        className="group w-full p-4 rounded-[20px] bg-[#dce8d6] hover:bg-[#cedcc8] active:scale-[0.98] transition-all duration-300 flex items-center gap-4 text-left"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#c3eed0] text-[#0e1f11] flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ease-md-standard">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[#121f0e]">Academic</h3>
                            <p className="text-xs text-[#0e1f11]/70">ebula251056@...</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleFinalSend('personal')}
                        className="group w-full p-4 rounded-[20px] bg-[#ffe0cc] hover:bg-[#ffdcc5] active:scale-[0.98] transition-all duration-300 flex items-center gap-4 text-left"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#ffdbc0] text-[#2e1500] flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ease-md-standard">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[#2e1500]">Personal</h3>
                            <p className="text-xs text-[#2e1500]/70">eldrexdelosreyesbula@...</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default ComposeModal;

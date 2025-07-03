"""
Professional Multilingual Testing Framework for CounselFlow
Advanced translation quality assurance and linguistic validation system
"""
import asyncio
import json
import logging
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime
from dataclasses import dataclass
from enum import Enum
import re

logger = logging.getLogger(__name__)

class LanguageCode(str, Enum):
    """Supported language codes"""
    ENGLISH = "en"
    SPANISH = "es"
    FRENCH = "fr"
    PORTUGUESE = "pt"
    ARABIC = "ar"
    SWAHILI = "sw"

class ValidationLevel(str, Enum):
    """Translation validation levels"""
    BASIC = "basic"
    PROFESSIONAL = "professional"
    LEGAL_EXPERT = "legal_expert"
    NATIVE_SPEAKER = "native_speaker"

@dataclass
class TranslationIssue:
    """Translation quality issue"""
    key: str
    language: str
    issue_type: str
    severity: str
    description: str
    suggested_fix: Optional[str] = None
    line_number: Optional[int] = None

@dataclass
class ValidationResult:
    """Translation validation result"""
    language: str
    total_keys: int
    validated_keys: int
    issues: List[TranslationIssue]
    quality_score: float
    validation_level: ValidationLevel
    timestamp: datetime

class LegalTerminologyValidator:
    """Validates legal terminology accuracy"""
    
    def __init__(self):
        self.legal_terms = self._load_legal_terminology()
    
    def _load_legal_terminology(self) -> Dict[str, Dict[str, str]]:
        """Load legal terminology mappings"""
        return {
            "en": {
                "contract": "contract",
                "litigation": "litigation",
                "compliance": "compliance",
                "intellectual_property": "intellectual property",
                "data_protection": "data protection"
            },
            "es": {
                "contract": "contrato",
                "litigation": "litigio",
                "compliance": "cumplimiento",
                "intellectual_property": "propiedad intelectual",
                "data_protection": "protección de datos"
            },
            "fr": {
                "contract": "contrat",
                "litigation": "contentieux",
                "compliance": "conformité",
                "intellectual_property": "propriété intellectuelle",
                "data_protection": "protection des données"
            },
            "pt": {
                "contract": "contrato",
                "litigation": "litígio",
                "compliance": "conformidade",
                "intellectual_property": "propriedade intelectual",
                "data_protection": "proteção de dados"
            },
            "ar": {
                "contract": "عقد",
                "litigation": "تقاضي",
                "compliance": "امتثال",
                "intellectual_property": "الملكية الفكرية",
                "data_protection": "حماية البيانات"
            },
            "sw": {
                "contract": "mkataba",
                "litigation": "mashtaka",
                "compliance": "kufuata sheria",
                "intellectual_property": "mali ya akili",
                "data_protection": "ulinzi wa data"
            }
        }
    
    def validate_legal_terms(self, text: str, language: str) -> List[TranslationIssue]:
        """Validate legal terminology in text"""
        issues = []
        
        if language not in self.legal_terms:
            return issues
        
        # Check for proper legal term usage
        for en_term, correct_translation in self.legal_terms[language].items():
            if en_term in text.lower() and correct_translation not in text:
                issues.append(TranslationIssue(
                    key="legal_terminology",
                    language=language,
                    issue_type="terminology",
                    severity="high",
                    description=f"Legal term '{en_term}' should be translated as '{correct_translation}'",
                    suggested_fix=f"Replace with '{correct_translation}'"
                ))
        
        return issues

class CulturalContextValidator:
    """Validates cultural and regional context appropriateness"""
    
    def validate_cultural_context(self, key: str, text: str, language: str) -> List[TranslationIssue]:
        """Validate cultural context and appropriateness"""
        issues = []
        
        # Date format validation
        if "date" in key.lower():
            if language in ["en"] and re.search(r'\d{2}/\d{2}/\d{4}', text):
                # US date format detected
                pass
            elif language in ["fr", "es", "pt"] and not re.search(r'\d{2}/\d{2}/\d{4}', text):
                issues.append(TranslationIssue(
                    key=key,
                    language=language,
                    issue_type="cultural",
                    severity="medium",
                    description="Date format should follow local conventions",
                    suggested_fix="Use DD/MM/YYYY format"
                ))
        
        # Currency format validation
        if "currency" in key.lower() or "$" in text:
            if language == "es" and "$" in text:
                issues.append(TranslationIssue(
                    key=key,
                    language=language,
                    issue_type="cultural",
                    severity="medium",
                    description="Consider using local currency symbols",
                    suggested_fix="Use € or local currency"
                ))
        
        return issues

class GrammarValidator:
    """Validates grammar and linguistic correctness"""
    
    def validate_grammar(self, key: str, text: str, language: str) -> List[TranslationIssue]:
        """Validate grammar and linguistic patterns"""
        issues = []
        
        # Check for placeholder consistency
        en_placeholders = re.findall(r'\{[^}]+\}', text)
        if en_placeholders:
            # Validate placeholder translations exist
            for placeholder in en_placeholders:
                if placeholder not in text:
                    issues.append(TranslationIssue(
                        key=key,
                        language=language,
                        issue_type="grammar",
                        severity="high",
                        description=f"Missing placeholder: {placeholder}",
                        suggested_fix=f"Include {placeholder} in translation"
                    ))
        
        # RTL text validation for Arabic
        if language == "ar":
            if not self._contains_arabic_text(text):
                issues.append(TranslationIssue(
                    key=key,
                    language=language,
                    issue_type="grammar",
                    severity="high",
                    description="Arabic translation should contain Arabic script",
                    suggested_fix="Provide proper Arabic translation"
                ))
        
        return issues
    
    def _contains_arabic_text(self, text: str) -> bool:
        """Check if text contains Arabic characters"""
        arabic_pattern = re.compile(r'[\u0600-\u06FF]')
        return bool(arabic_pattern.search(text))

class ProfessionalTranslationQA:
    """Professional translation quality assurance system"""
    
    def __init__(self):
        self.legal_validator = LegalTerminologyValidator()
        self.cultural_validator = CulturalContextValidator()
        self.grammar_validator = GrammarValidator()
        self.translation_cache = {}
    
    async def validate_translation_files(
        self, 
        base_path: str = "counselflow-app/public/locales"
    ) -> Dict[str, ValidationResult]:
        """Validate all translation files"""
        results = {}
        
        languages = [lang.value for lang in LanguageCode if lang != LanguageCode.ENGLISH]
        
        for lang in languages:
            try:
                validation_result = await self._validate_language_file(base_path, lang)
                results[lang] = validation_result
                logger.info(f"Validated {lang}: {validation_result.quality_score:.2f}% quality")
            except Exception as e:
                logger.error(f"Failed to validate {lang}: {e}")
        
        return results
    
    async def _validate_language_file(self, base_path: str, language: str) -> ValidationResult:
        """Validate a specific language file"""
        import os
        
        file_path = os.path.join(base_path, f"{language}/common.json")
        
        if not os.path.exists(file_path):
            # Return empty validation for missing files
            return ValidationResult(
                language=language,
                total_keys=0,
                validated_keys=0,
                issues=[],
                quality_score=0.0,
                validation_level=ValidationLevel.BASIC,
                timestamp=datetime.utcnow()
            )
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                translations = json.load(f)
        except Exception as e:
            logger.error(f"Failed to load {file_path}: {e}")
            return ValidationResult(
                language=language,
                total_keys=0,
                validated_keys=0,
                issues=[TranslationIssue(
                    key="file_error",
                    language=language,
                    issue_type="system",
                    severity="critical",
                    description=f"Failed to load translation file: {str(e)}"
                )],
                quality_score=0.0,
                validation_level=ValidationLevel.BASIC,
                timestamp=datetime.utcnow()
            )
        
        issues = []
        total_keys = 0
        validated_keys = 0
        
        # Validate each translation key
        for key, text in self._flatten_translations(translations).items():
            total_keys += 1
            
            if text and isinstance(text, str):
                validated_keys += 1
                
                # Run all validators
                issues.extend(self.legal_validator.validate_legal_terms(text, language))
                issues.extend(self.cultural_validator.validate_cultural_context(key, text, language))
                issues.extend(self.grammar_validator.validate_grammar(key, text, language))
        
        # Calculate quality score
        quality_score = self._calculate_quality_score(total_keys, validated_keys, issues)
        
        return ValidationResult(
            language=language,
            total_keys=total_keys,
            validated_keys=validated_keys,
            issues=issues,
            quality_score=quality_score,
            validation_level=ValidationLevel.PROFESSIONAL,
            timestamp=datetime.utcnow()
        )
    
    def _flatten_translations(self, obj: Any, prefix: str = "") -> Dict[str, str]:
        """Flatten nested translation object"""
        result = {}
        
        if isinstance(obj, dict):
            for key, value in obj.items():
                new_key = f"{prefix}.{key}" if prefix else key
                if isinstance(value, dict):
                    result.update(self._flatten_translations(value, new_key))
                else:
                    result[new_key] = str(value) if value is not None else ""
        else:
            result[prefix] = str(obj) if obj is not None else ""
        
        return result
    
    def _calculate_quality_score(
        self, 
        total_keys: int, 
        validated_keys: int, 
        issues: List[TranslationIssue]
    ) -> float:
        """Calculate translation quality score"""
        if total_keys == 0:
            return 0.0
        
        # Base score from coverage
        coverage_score = (validated_keys / total_keys) * 100
        
        # Deduct points for issues
        deductions = 0
        for issue in issues:
            if issue.severity == "critical":
                deductions += 20
            elif issue.severity == "high":
                deductions += 10
            elif issue.severity == "medium":
                deductions += 5
            elif issue.severity == "low":
                deductions += 2
        
        quality_score = max(0, coverage_score - deductions)
        return round(quality_score, 2)
    
    async def generate_qa_report(self, results: Dict[str, ValidationResult]) -> Dict[str, Any]:
        """Generate comprehensive QA report"""
        total_issues = sum(len(result.issues) for result in results.values())
        avg_quality = sum(result.quality_score for result in results.values()) / len(results) if results else 0
        
        critical_issues = []
        for lang, result in results.items():
            critical_issues.extend([
                issue for issue in result.issues 
                if issue.severity in ["critical", "high"]
            ])
        
        return {
            "summary": {
                "total_languages": len(results),
                "average_quality_score": round(avg_quality, 2),
                "total_issues": total_issues,
                "critical_issues": len(critical_issues),
                "generated_at": datetime.utcnow().isoformat()
            },
            "language_results": {
                lang: {
                    "quality_score": result.quality_score,
                    "total_keys": result.total_keys,
                    "validated_keys": result.validated_keys,
                    "issues_count": len(result.issues),
                    "validation_level": result.validation_level.value
                }
                for lang, result in results.items()
            },
            "critical_issues": [
                {
                    "language": issue.language,
                    "key": issue.key,
                    "type": issue.issue_type,
                    "severity": issue.severity,
                    "description": issue.description,
                    "suggested_fix": issue.suggested_fix
                }
                for issue in critical_issues[:10]  # Top 10 critical issues
            ],
            "recommendations": self._generate_recommendations(results)
        }
    
    def _generate_recommendations(self, results: Dict[str, ValidationResult]) -> List[str]:
        """Generate improvement recommendations"""
        recommendations = []
        
        for lang, result in results.items():
            if result.quality_score < 80:
                recommendations.append(f"Improve {lang} translation quality (current: {result.quality_score}%)")
            
            if result.validated_keys < result.total_keys * 0.8:
                recommendations.append(f"Complete missing translations in {lang}")
            
            critical_issues = [i for i in result.issues if i.severity == "critical"]
            if critical_issues:
                recommendations.append(f"Address {len(critical_issues)} critical issues in {lang}")
        
        return recommendations
